import { humanizeConstant } from "@buildtheearth/bot-utils"

export default function embed(role, oldRole, type, client) {
    try {
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
                }
            ],
            footer: {
                text: `Role ID: ${role.id}`
            },
            timestamp: role.createdAt
        }
        if (type === "Update" && oldRole) {
            embed.fields.push({
                name: "**Changes**",
                value: "** **",
                inline: false
            })
            const push = function (name, inline, diff) {
                if (diff) {
                    embed.fields.push({
                        name,
                        value: diff,
                        inline
                    })
                }
            }
            push("Name", true, diffString(oldRole.name, role.name))
            push(
                "Position",
                true,
                diffString(oldRole.position.toString(), role.position.toString())
            )
            push("Color", true, diffString(oldRole.hexColor, role.hexColor))
            push(
                "Mentionable",
                true,
                diffString(oldRole.mentionable.toString(), role.mentionable.toString())
            )
            push(
                "Hoisted",
                true,
                diffString(oldRole.hoist.toString(), role.hoist.toString())
            )
            push(
                "Permissions",
                false,
                diff(oldRole.permissions.toArray(), role.permissions.toArray())
            )
            return embed
        }

        embed.fields.push(
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
        )

        return embed
    } catch {
        err => {
            client.logger.error(err.stack)
            return {
                title: "Error",
                description: "An unkown error occured, please contact a bot developer"
            }
        }
    }
}

const diff = function (oldA, newA) {
    let removed = oldA.filter(e => !newA.includes(e))
    let added = newA.filter(e => !oldA.includes(e))
    if (!removed.length && !added.length) {
        return null
    }

    let diffS = "```diff"
    removed.forEach(e => (diffS += `\n--${e}`))
    added.forEach(e => (diffS += `\n++${e}`))
    diffS += "\n```"
    return diffS
}
let diffString = function (oldString, newString) {
    if (oldString === newString) return null
    return `\`\`\`diff\n--${oldString}\n++${newString}\n\`\`\``
}
