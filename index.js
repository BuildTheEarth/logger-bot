import createLogger from "@buildtheearth/bot-logger"
import { Client, Intents } from "discord.js"
import fs from "fs"
import config from "./config/config.json"
import log from "./util/log.js"
import hexToRGB from "./util/hexToRGB.js"
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})
client.log = log
client.config = config
client.hexToRGB = hexToRGB
client.logger = createLogger({ filePath: "./logs/" })
client.logger.info("Starting bot... Please stand by.")

async function main() {
    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

    for (const file of eventFiles) {
        const event = await import(`./events/${file}`)
        if (client.config.events[event.default.name]) {
            if (event.default.once) {
                client.once(event.default.name, (...args) =>
                    event.default.execute(...args, client)
                )
            } else {
                client.on(event.default.name, (...args) =>
                    event.default.execute(...args, client)
                )
            }
        }
    }
}
main()

client.login(config.token)
