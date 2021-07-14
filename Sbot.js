 require('dotenv').config()

 const Discord = require('discord.js')
 const client = new Discord.Client({
     partials: ['MESSAGE']
 })

 const fs = require('fs')
 const { PREFIX } = require('./config.json')
 const commands = require('./commands')

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

 client.on('message', msg => { //role assigner
     if (msg.content === "!noob-role")
         msg.member.roles.add('863806919386464286')
     if (msg.content === '!new') {
         msg.member.roles.add('828080939778179072')
     }

 })

 client.on('messageDelete', msg => { //message deletion
     msg.channel.send('Stop ITTTTT')
 })


 //  client.on('message', msg => { //Set status
 //      if (msg.content === '!setStatus') {

 //          client.user.setPresence({
 //              activity: {
 //                  name: 'Getting set up',
 //                  type: 'PLAYING'
 //              }
 //          })
 //      }
 //  })


 ///////////////////////////

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


 //      //Description 
 //      if (command == 'description') {
 //          client.functions.get('descrption').execute(message);
 //      }
 //      //Status
 //      if (command == 'status')

 //      {
 //          client.functions.get('status').execute(message);
 //      }




 //  })

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
             message.channel.bulkDelete(messages)
         })
     }
 })

 commands(client, 'setStatus', message => {
     const content = message.content.replace('!setStatus ', '')

     client.user.setPresence({
         activity: {
             name: content,
             type: 'STREAMING',
         }
     })
 })







 ////////////////////////////////////
 client.login(process.env.BOT_TOKEN)