module.exports = {
    commands: ['members'],
    expectedArgs: '',
    permissionError: 'Member only command',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        const { client } = message
        client.guilds.cache.forEach((guild) => {
            message.channel.send(`${guild.name} has a toatal of ${guild.memberCount} members`)
        })
    },


}