import { noop } from "@buildtheearth/bot-utils"
import fetch from "node-fetch"

export default {
    name: "messageDelete",
    once: false,
    async execute(message, client) {
        //if the message has an attachment write the file to a buffer
        let messageLDB = undefined
        try {
            messageLDB = JSON.parse(await client.db.get(message.id).catch(noop))
        } catch (e) {
            console.log(e)
        }
        if ( message.partial && !messageLDB) return
        if (messageLDB) {
            message.content = messageLDB.content
            message.author = {id: messageLDB.user}
        }
        let files = []
        let content = { files: [], embeds: [] }
        if (message.attachments.size > 0) {
            let urls = []
            message.attachments.forEach(attachment =>
                urls.push({
                    url: attachment.proxyURL,
                    name: attachment.name
                })
            )
            for (let i = 0; i < urls.length; i++) {
                let img = await fetch(urls[i].url)
                let imgBuffer = Buffer.from(await img.arrayBuffer())
                files.push({
                    file: imgBuffer,
                    name: urls[i].name,
                    extension: urls[i].name.match(/\.[0-9a-z]+$/i)[0]
                })
                console.log(files)
            }
        }

        await client.users.fetch(message.author.id).catch(err => null)
        const messageAuthor = await client.users.cache.get(message.author.id)

        content.embeds.push({
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
        })

        if (files.length > 0) {
            for await (const file of files) {
                content.files.push({
                    attachment: file.file,
                    name: file.name
                })
                if (
                    file.extension === ".png" ||
                    file.extension === ".jpg" ||
                    file.extension === ".jpeg"
                ) {
                    content.embeds.push({
                        color: client.hexToRGB(client.config.colors.messages.delete),
                        title: "Deleted Attachment",
                        image: {
                            url: `attachment://deleted_message.${file.name}`
                        },
                        footer: {
                            text: `Message ID: ${message.id}`
                        }
                    })
                } else
                    content.content = "__Deleted Attachments__\n(May not be valid files)"
            }
        }
        await client.log(content, "messageLog", client)
    }
}
