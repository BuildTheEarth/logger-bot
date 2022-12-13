export default {
    name: "ready",
    once: true,
    execute(unusedClient, client) {
        client.logger.info(
            `Logger is online. Logging ${client.channels.cache.size} channels`
        )
        console.log(client.config.channels)
        console.log(client.config.events)
    }
}
