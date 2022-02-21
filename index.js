import createLogger from "@buildtheearth/bot-logger"
import { Client, Intents } from "discord.js"
import fs from "fs"
import config from "./config/config.json"
import eventEnabled from "./util/eventEnabled.js"
const logger = createLogger({ filePath: "./logs/" })
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
})
client.config = config
client.logger = logger
client.logger.info("Starting bot... Please stand by.")

async function main() {
    const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

    for (const file of eventFiles) {
        const event = await import(`./events/${file}`)
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
main()

client.login(config.token)
