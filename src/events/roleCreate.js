import humanizeConstant from "../util/humanizeConstant"

export default {
    name: "roleCreate",
    once: false,
    async execute(role, client) {
        embed = {
            color: client.hexToRGB(client.config.colors.roleCreate),
            title: `Role Created (${role.id})`,
            thumbnail: {
                url: role.iconURL()
            },
            fields: [
                {
                    name: "Position",
                    value: role.position.toString(),
                    inline: true
                },
                {
                    name: "Color",
                    value: role.hexColor,
                    inline: true
                },
                {
                    name: "Mentionable",
                    value: role.mentionable.toString(),
                    inline: true
                },
                {
                    name: "Hoisted",
                    value: role.hoist.toString(),
                    inline: true
                },
                {
                    name: "Managed",
                    value: role.managed.toString(),
                    inline: true
                },
                {
                    name: "Permissions",
                    value:
                        role.permissions.toArray().length === 0
                            ? "None"
                            : role.permissions
                                  .toArray()
                                  .map(perm => `\`${humanizeConstant(perm)}\``)
                                  .join(", ")
                }
            ],
            footer: {
                text: `Role ID: ${role.id} • Created on`
            },
            timestamp: role.createdAt
        }
        await client.log({ embeds: [embed] }, "mainLog", client)
    }
}
