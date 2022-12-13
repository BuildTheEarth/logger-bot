import roleEmbed from "../util/roleEmbed.js"

export default {
    name: "roleDelete",
    once: false,
    async execute(role, client) {
        client.logger.info(`roleDelete: ${role.name} (${role.id})`)

        const embed = await roleEmbed(role, null, "Delete", client)
        await client.log({ embeds: [embed] }, "mainLog", client)
    }
}
