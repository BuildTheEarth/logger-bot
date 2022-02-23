export default {
    name: "messageReactionDelete",
    once: false,
    execute(reaction, user, client) {
        client.logger.info("lol")
        //log a what reaction was deleted to what message and by who
    }
}
