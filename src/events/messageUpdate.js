//@ts-check

import { noop } from "@buildtheearth/bot-utils"
import diffParser from "../util/diffParser.js"

export default {
    name: "messageUpdate",
    once: false,
    async execute(oldMessage, newMessage, client) {
        if (newMessage.partial) await newMessage.fetch().catch(noop)

        let messageLDB = undefined
        try {
            messageLDB = JSON.parse(await client.db.get(oldMessage.id).catch(noop))
        } catch (e) {
            console.log(e)
        }
        if ( oldMessage.partial && !messageLDB) return
        if (messageLDB) {
            oldMessage.content = messageLDB.content
            oldMessage.author = {id: messageLDB.user}
        }
        

        await client.users.fetch(newMessage.author.id).catch(err => null)
        const messageAuthor = await client.users.cache.get(newMessage.author.id)

        try {
            client.db.del(newMessage.id).catch(noop).then(async () => {
                await client.db.put(newMessage.id, JSON.stringify({content: newMessage.content, channel: newMessage.channel.id, user: newMessage.author.id})).catch(noop)
            })
            
        } catch (e) {
            noop()
        }

        const embeds = [
            {
                color: client.hexToRGB(client.config.colors.messages.edit),
                title: "New Edited Message (Before)",
                
                description: diffParser(oldMessage.content),
                author: {
                    name: messageAuthor.tag,
                    icon_url: messageAuthor.avatarURL()
                },
            },
            {
                color: client.hexToRGB(client.config.colors.messages.edit),
                title: "New Edited Message (After)",
                
                description: diffParser(newMessage.content),
                timestamp: new Date(newMessage.createdTimestamp),
                footer: {
                    text: `Message ID: ${newMessage.id}`
                },
                fields: [
                    {
                        name: "User",
                        value: `<@${messageAuthor.id}> (${messageAuthor.id})`,
                        inline: true
                    },
                    {
                        name: "Channel",
                        value: `<#${newMessage.channelId}>`,
                        inline: true
                    }
                ],
            }
        ]

        client.log({ embeds: embeds }, "messageLog", client)
    }
}
