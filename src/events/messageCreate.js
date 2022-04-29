//@ts-check
import { noop } from "@buildtheearth/bot-utils"
import prettyMs from "pretty-ms"

export default {
    name: "messageCreate",
    once: false,
    async execute(message, client) {
        await client.db.put(message.id, JSON.stringify({content: message.content, channel: message.channel.id, user: message.author.id})).catch(noop)
        //not creating a proper command handler for this because it only for super basic commands
        if (message.author.bot) return
        const msg = message.content.toLowerCase()
        if (!message.content.startsWith(client.config.prefix)) return
        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/)
        const command = args.shift().toLowerCase()

        if (/[a-z]?ing/.test(command)) {
            const embed = {
                color: client.config.colors.join,
                title: `${command.charAt(0).toUpperCase()}ong`,
                description: `🏓Latency is ${Math.round(
                    client.ws.ping
                )} ms.\nUptime: ${prettyMs(client.uptime)}`,
                timestamp: new Date()
            }
            message.channel.send({ embeds: [embed] })
        }
    }
}
