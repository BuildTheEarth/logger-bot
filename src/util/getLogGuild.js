import { noop } from "@buildtheearth/bot-utils"
import Discord from "discord.js"

//@ts-check
/**
 * @param {Discord.Client} client
 * @returns {number}
 */
export default function getLogGuild(client) {
    /**
     * @type {Discord.AnyChannel}
     */
    try {
        const logChannel = client.channels.cache.get(client.config.channels.mainLog)
        return logChannel.guild
    } catch {
        err => client.logger.error(err.stack)
    }
}
