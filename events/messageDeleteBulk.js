export default {
    name: "messageDeleteBulk",
    once: false,
    execute(messages, client) {
        client.logger.info("lol")
        //this one might be a bit more complicated.
        //The thing is we could create a log for each mesage that was deleted but thats a lot of logs and we dont want to do that. so we need to create a log for all messages that were deleted in bulk but to do that we probably need to do it kinda like helpbot does where it creates a file of the messages.
        //no need to tackle this rn
    }
}
