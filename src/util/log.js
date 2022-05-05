import Discord from "discord.js"

//@ts-check
/**
 * @param {Discord.Client} client
 */
export default async function log(content, logType, client) {
/**
     * @type {Discord.AnyChannel}
     */
    const logChannel = client.channels.cache.get(client.config.channels[logType])

    return await logChannel.send(content).catch(err => {
        client.logger.error(err.stack)
        return "error"
    })
}
