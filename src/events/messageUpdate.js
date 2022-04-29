//@ts-check

import { noop } from "@buildtheearth/bot-utils"

import Diff from 'text-diff'
import diffParser from "../util/diffParser.js"

export default {
    name: "messageUpdate",
    once: false,
    async execute(oldMessage, newMessage, client) {
        if (newMessage.partial) await newMessage.fetch().catch(noop)
        try {
            client.db.del(newMessage.id).catch(noop).then(async () => {
                await client.db.put(newMessage.id, JSON.stringify({content: newMessage.content, channel: newMessage.channel.id, user: newMessage.author.id})).catch(noop)
            })
            
        } catch (e) {
            noop()
        }
        await client.users.fetch(oldMessage.author.id).catch(err => null)
        const messageAuthor = await client.users.cache.get(oldMessage.author.id)

        const diff = new Diff()
        //@ts-ignore typings broke on method types
        const diffValue = diff.main(oldMessage.content, newMessage.content)
        diff.cleanupSemantic(diffValue)

        const embeds = [
            {
                color: client.hexToRGB(client.config.colors.messages.edit),
                title: "New Edited Message",
                
                description: diffParser(diffValue),
                author: {
                    name: messageAuthor.tag,
                    icon_url: messageAuthor.avatarURL()
                },
                timestamp: new Date(oldMessage.createdTimestamp),
                footer: {
                    text: `Message ID: ${oldMessage.id}`
                },
                fields: [
                    {
                        name: "User",
                        value: `<@${messageAuthor.id}> (${messageAuthor.id})`,
                        inline: true
                    },
                    {
                        name: "Channel",
                        value: `<#${oldMessage.channelId}>`,
                        inline: true
                    }
                ],
            }
        ]

        client.log({ embeds: embeds }, "messageLog", client)
    }
}
