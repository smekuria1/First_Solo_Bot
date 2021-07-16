 require('dotenv').config()

 const Discord = require('discord.js')
 const client = new Discord.Client({
     partials: ['MESSAGE']
 })

 const fs = require('fs')
 const { PREFIX } = require('./config.json')
 const commands = require('./commands')
 const sendFirst = require('./sendFirst')

 client.on('ready', () => {
     console.log('Sbot is ready to roll!!!!!')







     /////////////////////////////////////////
     client.on('message', msg => {
         if (msg.content === '!HelloBot') {
             msg.react('🌭')
             msg.reply('Hello')
         }
     })

     client.on('message', msg => { //role assigner
         if (msg.content === "!noob-role")
             msg.member.roles.add('863806919386464286')
         if (msg.content === '!new') {
             msg.member.roles.add('828080939778179072')
         }

     })

     client.on('messageDelete', msg => { //message deletion

         msg.channel.send('Stop deleting messages!!!')

     })

     ///////////////////////////  Refactored command handler

     //  client.on('message', message => {
     //      client.functions = new Discord.Collection()

     //      const functionFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('js'))

     //      for (const file of functionFiles) {
     //          const command = require(`./functions/${file}`)
     //          client.functions.set(command.name, command)
     //      }
     //      //Checking for commands
     //      //Basic reqs prefix and not bot
     //      //might add mod only commands with .member
     //      if (!message.content.startsWith(PREFIX) || message.author.bot) return

     //      var arg = message.content.slice(PREFIX.length).trim().split(' ')
     //      var command = arg.shift().toLowerCase()
     //      var finalarg = arg.toString()

     //      ///////////////////////////////////////////////
     //      //////////////////////////////////////////////


     /////Command Handler Commands 
     commands(client, 'nice', message => {
         message.channel.send('COCK')
         message.react('🐓')

     })


     commands(client, 'servers', message => {
         client.guilds.cache.forEach((guild) => {
             message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
         })
     })

     commands(client, ['cc', 'clearChannel'], message => {
         if (message.member.hasPermission('ADMINSTRATOR')) {
             message.channel.messages.fetch().then(messages => {
                 message.channel.bulkDelete(messages).catch(err => Promise.reject(err))
             })
         }
     })



     commands(client, 'setStatus', message => {
         const content = message.content.replace('!setStatus ', '')

         client.user.setPresence({
             activity: {
                 name: content,
                 type: 'STREAMING',
                 url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
             }
         })
     })

     commands(client, 'createtextchannel', (message) => {
         const name = message.content.replace('!createtextchannel ', '')

         message.guild.channels.create(name, {
             type: 'text'
         }).then((channel) => {
             const catId = '757709695157928037'
             channel.setParent(catId)

         })

     })

     commands(client, 'createvoicechannel', (message) => {
         const name = message.content.replace('!createvoicechannel ', '')

         message.guild.channels.create(name, {
             type: 'voice'
         }).then((channel) => {
             const catId = '757709695157928038'
             channel.setParent(catId)
             channel.setUserLimit(69)

         })

     })


     commands(client, 'github', (message) => {
         const embed = new Discord.MessageEmbed()
             .setTitle("GitHub")
             .setURL('https://github.com/smekuria1/First_Solo_Bot')
             .setAuthor(message.author.username)
         message.channel.send(embed)

     })


     commands(client, ['description', 'desc'], (message) => {
         message.reply("This bot is a personal project designed by Solomon.\nType !help to get a list of commands")

     })

     //  client.on('message', msg => { //role assigner
     //     if (msg.content === "!noob-role")
     //         msg.member.roles.add('863806919386464286')
     //     if (msg.content === '!new') {
     //         msg.member.roles.add('828080939778179072')
     //     }

     // })


     sendFirst(client, '865307016561295420', 'React Role', ['😀', '😂'])


 })






 ////////////////////////////////////
 client.login(process.env.BOT_TOKEN)