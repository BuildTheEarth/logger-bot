export default {
    name: "guildMemberUpdate",
    once: false,
    execute(oldMember, newMember, client) {
        client.logger.info("lol")
        //check to see what has changed from previous to current member object. Things like nickname, roles, etc. and send just that change to the log channel.
    }
}
