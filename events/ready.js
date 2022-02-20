module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        client.logger.info("Bot is online.")
    }
}
