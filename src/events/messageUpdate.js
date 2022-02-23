export default {
    name: "messageUpdate",
    once: false,
    async execute(oldMessage, newMessage, client) {
        await client.users.fetch(oldMessage.author.id)
        const messageAuthor = await client.users.cache.get(oldMessage.author.id)

        const embeds = [
            {
                color: client.hexToRGB(client.config.colors.messages.edit),
                title: "New Edited Message",
                author: {
                    name: messageAuthor.tag,
                    icon_url: messageAuthor.avatarURL()
                },
                description: newMessage.content
            },
            {
                color: client.hexToRGB(client.config.colors.messages.edit),
                title: "Original Message",
                description: oldMessage.content,
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
                timestamp: new Date(oldMessage.createdTimestamp),
                footer: {
                    text: `Message ID: ${oldMessage.id}`
                }
            }
        ]

        client.log({ embeds: embeds }, "messageLog", client)
    }
}
