import Discord from "discord.js"
import { humanizeConstant }  from "@buildtheearth/bot-utils"
import { formatTimestamp }  from "@buildtheearth/bot-utils"
import userFlags from "../../config/extensions/userFlags.json" assert { type: "json" }

export default function embed(member, type, client) {
    let color
    let title
    if (type === "Remove") {
        color = client.config.colors.leave
        title = "User Left The Server"
    }
    if (type === "Add") {
        color = client.config.colors.join
        title = "User Joined The Server"
    }

    let embed = {
        color,
        title,
        thumbnail: {
            url: member.user.avatarURL({ size: 64, format: "png", dynamic: true })
        },
        fields: [
            {
                name: "Tag",
                value: Discord.Util.escapeMarkdown(member.user.tag),
                inline: true
            },
            {
                name: "ID",
                value: member.id,
                inline: true
            }
        ]
    }

    if (member.nickname)
        embed.fields.push({
            name: "Nick",
            value: Discord.Util.escapeMarkdown(member.nickname),
            inline: true
        })

    if (type === "Remove") {
        const max = 1024 / 24
        // filter out @everyone
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .filter(role => role.id !== member.guild.id)
        let formattedRoles = roles
            .map(role => `<@&${role.id}>`)
            .slice(0, max)
            .join(", ")
        if (member.roles.cache.size > max) formattedRoles += "..."
        if (formattedRoles) embed.fields.push({ name: "Roles", value: formattedRoles })
    }

    embed.fields.push({
        name: "Creation date",
        value: formatTimestamp(member.user.createdAt, "f"),
        inline: true
    })

    embed.fields.push({
        name: member ? "Join date" : "\u200B",
        value: member ? formatTimestamp(member.joinedAt, "f") : "\u200B",
        inline: true
    })

    if (member.user.flags) {
        let feildName = "Acknowledgements"
        const flagArr = member.user.flags
            .toArray()
        const flags = flagArr
            .map(flag => userFlags[flag] || humanizeConstant(flag))
            .join(", ")
        if (flagArr.includes("DISCORD_EMPLOYEE"||"PARTNERED_SERVER_OWNER"||"HYPESQUAD_EVENTS"||"DISCORD_CERTIFIED_MODERATOR") {
            feildName += "\n(User Has a Notable Flag)"
            }
        if (flags) embed.fields.push({ name: feildName, value: flags })
    }
    return embed
}
