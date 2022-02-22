export default {
    name: "messageDelete",
    once: false,
    execute(message, client) {
        client.logger.info("lol")
        //log the deleted message, who sent it, and the channel it was sent in.
    }
}
