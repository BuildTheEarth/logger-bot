export default {
    name: "messageReactionAdd",
    once: false,
    execute(reaction, user, client) {
        client.logger.info("lol")
        //log a what reaction was added to what message and by who
    }
}
