export default {
    name: "messageUpdate",
    once: false,
    execute(oldMessage, newMessage, client) {
        client.logger.info("lol")
        //log old message and new message
        //maybe highlight the differences somehow?
    }
}
