export default {
    name: "messageReactionDelete",
    once: false,
    execute(reaction, user, client) {
        client.logger.info("lol")
        //log a what reaction was delted to what message and by who
    }
}
