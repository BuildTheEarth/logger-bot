export default {
    name: "ready",
    once: true,
    execute(unusedClient, client) {
        client.logger.info("Bot is online.")
    }
}
