export default {
    name: "messageUpdate",
    once: false,
    execute(oldMessage, newMessage, client) {
        client.logger.info("lol")
    }
}
