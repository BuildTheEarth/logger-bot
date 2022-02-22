export default {
    name: "roleUpdate",
    once: false,
    execute(oldRole, newRole, client) {
        client.logger.info("lol")
        //log what has changed about the role. (same as guildMemberUpdate)
    }
}
