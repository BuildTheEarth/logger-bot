import createLogger from "@buildtheearth/bot-logger"
import config from "./config/config.json"
import { Client, Intents } from "discord.js"
const logger = createLogger({ filePath: "./logs/" })
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })
client.config = config
client.logger = logger
client.logger.info("Starting bot... Please stand by.")

//super simple event handler
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))
for (const file of eventFiles) {
    const event = import(`./events/${file}`)
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client))
    } else {
        client.on(event.name, (...args) => event.execute(...args, client))
    }
}

client.login(config.token)
