import fetch from "node-fetch"
import mime from "mime-types"

export default {
    name: "messageDelete",
    once: false,
    async execute(message, client) {
        let files = []
        if (message.attachments.size > 0) {
            let urls = []
            message.attachments.forEach(attachment =>
                urls.push({
                    url: attachment.proxyURL,
                    contentType: attachment.contentType
                })
            )
            for (let i = 0; i < urls.length; i++) {
                let img = await fetch(urls[i].url)
                let imgBuffer = Buffer.from(await img.arrayBuffer())
                files.push({ file: imgBuffer, name: mime.extension(urls[i].contentType) })
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

        const messageLog = await client.log({ embeds: [embed] }, "messageLog", client)

        if (files.length > 0) {
            for await (const file of files) {
                const contentEmbed = {
                    files: [
                        { attachment: file.file, name: "deleted_message." + file.name }
                    ],
                    embeds: [
                        {
                            color: client.hexToRGB(client.config.colors.messages.delete),
                            title: "New Deleted Attachment",
                            url: `https://discordapp.com/channels/${messageLog.guild.id}/${messageLog.channelId}/${messageLog.id}`,
                            image: {
                                url: `attachment://deleted_message.${file.name}`
                            },
                            footer: {
                                text: `Message ID: ${message.id}`
                            }
                        }
                    ]
                }
                await client.log(contentEmbed, "messageLog", client)
            }
        }
    }
}
