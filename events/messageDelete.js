import fetch from "node-fetch"

export default {
    name: "messageDelete",
    once: false,
    async execute(message, client) {
        let files = []
        if (message.attachments.size > 0) {
            let urls = []
            message.attachments.forEach(attachment => urls.push(attachment.proxyURL))
            for (let i = 0; i < urls.length; i++) {
                let img = await fetch(urls[i])
                let imgBuffer = Buffer.from(await img.arrayBuffer())
                files.push(imgBuffer)
            }
        }

        await client.users.fetch(message.author.id)
        const messageAuthor = await client.users.cache.get(message.author.id)

        const embed = {
            color: client.hexToRGB(client.config.colors.messages.delete),
            title: "New Deleted Message",
            author: {
                name: messageAuthor.tag,
                icon_url: messageAuthor.avatarURL()
            },
            description: message.content ? message.content : "*No message content*",
            fields: [
                {
                    name: "User",
                    value: `<@${messageAuthor.id}> (${messageAuthor.id})`,
                    inline: true
                },
                {
                    name: "Channel",
                    value: `<#${message.channelId}>`,
                    inline: true
                }
            ],
            timestamp: new Date(message.createdTimestamp),
            footer: {
                text: `Message ID: ${message.id}`
            }
        }
        let content = { embeds: [embed] }
        if (files.length > 0) {
            console.log("this ran")
            content = {
                content: "Deleted Attachments",
                files: files,
                embeds: [embed]
            }
        }
        await client.log(content, "messageLog", client)
    }
}
