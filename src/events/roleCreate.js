import roleEmbed from "../util/roleEmbed.js"

export default {
    name: "roleCreate",
    once: false,
    async execute(role, client) {
        client.logger.info(`roleCreate: ${role.name} (${role.id})`)

        const embed = await roleEmbed(role, null, "Create", client)
        await client.log({ embeds: [embed] }, "mainLog", client)
    }
}
