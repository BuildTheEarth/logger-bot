import roleEmbed from "../util/roleEmbed.js"

export default {
    name: "roleCreate",
    once: false,
    async execute(role, client) {
        const embed = await roleEmbed(role, "Create", client)
        await client.log({ embeds: [embed] }, "mainLog", client)
    }
}
