module.exports = {
    name: 'description',
    description: 'Describes what the bot is and does',
    execute(message) {
        message.channel.send("This bot was made by Solomon. \n\nPurpose:\n" + "I am planning on making this bot to stream twitch streams in VC")
    }
}