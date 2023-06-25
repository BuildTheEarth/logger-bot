export default {
    name: "guildMemberUpdate",
    once: false,
    execute(oldMember, newMember, client) {
        if (oldMember.partial || newMember.partial)
            client.logger.warn("Partial GuildMember Object")
        client.logger.info(`guildMemberUpdate: ${newMember.user.tag} (${newMember.id})`)

        let embed = {}
        try {
            embed = {
                color: client.hexToRGB(client.config.colors.memberUpdate),
                title: `Member Updated (${newMember.user.tag})`,
                thumbnail: {
                    url: newMember.user.avatarURL({
                        size: 64,
                        format: "png",
                        dynamic: true
                    })
                },
                fields: [],
                footer: {
                    text: `Member ID: ${newMember.id}`
                },
                timestamp: newMember.user.createdAt
            }
            const push = function (name, inline, diff) {
                if (diff) {
                    embed.fields.push({
                        name,
                        value: diff,
                        inline
                    })
                }
            }
            push("Nickname", true, diffString(oldMember.nickname, newMember.nickname))
            push(
                "Roles",
                false,
                diff(
                    oldMember.roles.cache.map(e => `${e.name} (${e.id})`),
                    newMember.roles.cache.map(e => `${e.name} (${e.id})`)
                )
            )
        } catch {
            err => {
                client.logger.error(err.stack)
                embed = {
                    title: "Error",
                    description:
                        "An unknown error occurred, please contact a bot developer"
                }
            }
        }

        client.log({ embeds: [embed] }, "mainLog", client)
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
    if (oldString == null) oldString = "none"
    if (newString == null) newString = "none"
    return `\`\`\`diff\n--${oldString}\n++${newString}\n\`\`\``
}
