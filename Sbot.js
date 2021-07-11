require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()
const PREFIX = '!'

client.on('ready', () => {
    console.log('Sbot is ready to go!!!')
})

client.on('message', msg => {
    if (msg.content === '!HelloBot') {
        msg.react('😄')
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


client.login(process.env.BOT_TOKEN)