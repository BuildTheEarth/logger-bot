import memberEmbed from "../util/memberEmbed.js"

export default {
    name: "guildMemberRemove",
    once: false,
    async execute(member, client) {
        if (member.partial) client.logger.warn("Patrial GuildMember Object")
        client.logger.info(`guildMemberRemove: ${member.user.tag} (${member.id})`)

        const embed = await memberEmbed(member, "Remove", client)
        client.log({ embeds: [embed] }, "joinLog", client)
    }
}
