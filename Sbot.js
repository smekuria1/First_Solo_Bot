require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE']
})

const fs = require('fs')
const PREFIX = '!'

client.on('ready', () => {
        console.log('Sbot is ready to roll!!!!!')
    })
    /////////////////////////////////////////
client.on('message', msg => {
    if (msg.content === '!HelloBot') {
        msg.react('🌭')
        msg.reply('Hello')
    }
})

client.on('message', msg => {
    if (msg.content === "!noob-role")
        msg.member.roles.add('863806919386464286')
    if (msg.content === '!new') {
        msg.member.roles.add('828080939778179072')
    }

})

client.on('messageDelete', msg => {
    msg.channel.send('Stop ITTTTT')
})

client.on('message', message => {
    client.functions = new Discord.Collection()

    const functionFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('js'))

    for (const file of functionFiles) {
        const command = require(`./functions/${file}`)
        client.functions.set(command.name, command)
    }
    //Checking for commands
    //Basic reqs prefix and not bot
    //might add mod only commands with .member
    if (!message.content.startsWith(PREFIX) || message.author.bot) return

    var arg = message.content.slice(1).trim().split(' ')
    var command = arg.shift().toLowerCase()
    var finalarg = arg.toString()

    if (command == 'description') {
        client.commands.get('descrption').execute(message)
    }


})

////////////////////////////////////
client.login(process.env.BOT_TOKEN)