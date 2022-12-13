//@ts-check

import { noop } from "@buildtheearth/bot-utils"
import Discord, { Collection } from "discord.js"
import discordTranscripts from "discord-html-transcripts"

export default {
    name: "messageDeleteBulk",
    once: false,
    /**
     * @param {Discord.Collection<string, Discord.Message>} messages
     * @param {Discord.Client} client
     */
    async execute(messages, client) {
        client.logger.info(`messageDelete Bulk: ${messages.size} messages deleted`)

        const newMessages = new Collection()
        let channel
        for (const message of messages.values()) {
            try {
                if (!channel) {
                    channel = await client.channels.fetch(message.channelId)
                }
                const messageLDB = JSON.parse(await client.db.get(message.id).catch(noop))
                if (messageLDB) {
                    message.content = messageLDB.content
                    // @ts-ignore
                    message.author = await client.users.fetch(messageLDB.user).catch(noop)
                    if (!message.author) {
                        // @ts-ignore
                        message.author = {
                            id: messageLDB.user,
                            tag: "Deleted User#0000",
                            avatarURL: () =>
                                "https://cdn.discordapp.com/embed/avatars/0.png"
                        }
                    }
                }
            } catch (err) {
                client.logger.error(err)
            }
            newMessages.set(message.id, message)
        }
        let transcript
        try {
            // @ts-ignore
            transcript = discordTranscripts.generateFromMessages(messages, channel)
        } catch (err) {
            client.logger.error(err)
        }
        if (transcript) {
            const content = {
                files: [transcript],
                embeds: [
                    {
                        color: client.hexToRGB(client.config.colors.messages.delete),
                        title: "New Purged Messages",
                        description: `Purged ${messages.size} messages in <#${channel.id}>, transcript attached above, download it and open it in any browser, click on any users avatar to get the message information.`
                    }
                ]
            }
            await client.log(content, "messageLog", client)
        }
    }
}
