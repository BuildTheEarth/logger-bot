import memberEmbed from "../util/memberEmbed.js"
import getLogGuild from "../util/getLogGuild.js"
//@ts-check

export default {
    name: "guildMemberAdd",
    once: false,
    async execute(member, client) {
        if (member.partial) client.logger.warn("Partial guildMember Object")
        client.logger.info(`guildMemberAdd: ${member.user.tag} (${member.id})`)

        const embed = await memberEmbed(member, "Add", client)
        client.log({ embeds: [embed] }, "joinLog", client)
    }
}
