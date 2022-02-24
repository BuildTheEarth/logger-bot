import memberEmbed from "../util/memberEmbed.js"

export default {
    name: "guildMemberRemove",
    once: false,
    async execute(member, client) {
        console.log(member.partial)
        const embed = await memberEmbed(member, "Remove", client)
        client.log({ embeds: [embed] }, "mainLog", client)
    }
}
