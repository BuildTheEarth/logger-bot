export default {
    name: "messageReactionAdd",
    once: false,
    execute(reaction, user, client) {
        client.logger.info("lol")
    }
}
