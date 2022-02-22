export default {
    name: "guildMemberAdd",
    once: false,
    execute(member, client) {
        client.logger.info("lol")
        //when member joins the server send an embed using config.color.join and include user details like name, id, discriminator, avatar, time/date, account creation date, member count, etc.
    }
}
