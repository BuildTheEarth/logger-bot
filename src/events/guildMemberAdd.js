import memberEmbed from "../util/memberEmbed.js"

export default {
    name: "guildMemberAdd",
    once: false,
    async execute(member, client) {
        console.log(member.partial)
        const embed = await memberEmbed(member, "Add", client)
        client.log({ embeds: [embed] }, "mainLog", client)
    }
}
