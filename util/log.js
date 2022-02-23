export default async function log(content, logType, client) {
    const logChannel = await client.channels.cache.get(client.config.channels[logType])
    await logChannel.send(content).catch(err => {
        client.logger.error(err)
        return "error"
    })
    return "success"
}
