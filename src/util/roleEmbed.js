import humanizeConstant from "./humanizeConstant.js"

export default function embed(role, type, client) {
    let embed = {
        color: client.hexToRGB(client.config.colors[`role${type}`]),
        title: `Role ${type}d (${role.name})`,
        thumbnail: {
            url: role.iconURL()
        },
        fields: [
            {
                name: "Members",
                value: role.members.size.toString(),
                inline: true
            },
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
            text: `Role ID: ${role.id}`
        },
        timestamp: role.createdAt
    }
    return embed
}
