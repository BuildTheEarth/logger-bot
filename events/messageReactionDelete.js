export default {
    name: "messageReactionDelete",
    once: false,
    execute(reaction, user, client) {
        client.logger.info("lol")
    }
}
