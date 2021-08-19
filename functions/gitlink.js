const Discord = require('discord.js')
module.exports = {
    commands: ['github', 'sourcecode'],
    expectedArgs: null,
    permissionError: 'Member only command',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
            .setTitle("GitHub")
            .setURL('https://github.com/smekuria1/First_Solo_Bot')
            .setAuthor(message.author.username)
        message.reply(embed)
    },


}