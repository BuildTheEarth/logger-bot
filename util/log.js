export default function log(embed, logType, client) {
    const logChannel = client.channels.cache.get(client.config.channels[logType])
    logChannel.send({ embeds: [embed] }).catch(err => client.logger.error(err))
}
