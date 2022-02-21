export default (event, client) => {
    const eventObj = client.config.events.find(obj => obj.name === event)
    if (eventObj?.enabled) {
        return true
    }
    return false
}
