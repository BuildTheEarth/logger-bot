import roleEmbed from "../util/roleEmbed.js"

export default {
    name: "roleUpdate",
    once: false,
    async execute(oldRole, newRole, client) {
        client.logger.info(`roleUpdate: ${newRole.name} (${newRole.id})`)

        const embed = await roleEmbed(newRole, oldRole, "Update", client)
        await client.log({ embeds: [embed] }, "mainLog", client)
    }
}
