 require('dotenv').config()
 require('events').EventEmitter.prototype._maxListeners = 100;

 const Discord = require('discord.js')
 const client = new Discord.Client({
         partials: ['MESSAGE']
     })
     ////////////Imports
 const path = require('path')
 const fs = require('fs')
 const { PREFIX } = require('./config.json')
     //const commands = require('./commands')
     //const sendFirst = require('./sendFirst')
     //const getRole = require('./get-role')
     //const SC_CIENT_ID = process.env.SC_CIENT_ID
     //const scdl = require('soundcloud-downloader').default
 require('events').EventEmitter.prototype._maxListeners = 100;


 process.on('unhandledRejection', (reason, promise) => {
     console.error(`Unhandled Rejection at: ${promise} reason: ${reason}`);
 });

 ///////////Start Bot
 client.once('ready', () => {
         console.log('Sbot is ready to roll!!!!!')
     })
     ///////////////////////////////////////

 /////////////////////////  Refactored command handler

 client.on('message', message => {
     const baseFile = 'command-base.js'
     const commandBase = require(`./functions/${baseFile}`)

     //recusive loop to read all commands 
     const readCommands = dir => {
         const files = fs.readdirSync(path.join(__dirname, dir))
         for (const file of files) {
             const stat = fs.lstatSync(path.join(__dirname, dir))
             if (stat.isDirectory()) {
                 readCommands(path.join(dir, file))
             } else if (file !== baseFile) {
                 const option = require(path.join(__dirname, dir, file))
                 console.log(file, option)

                 commandBase(client, option)

             }
         }
     }


     readCommands('functions')














     //  client.functions = new Discord.Collection()

     //  const functionFiles = fs.readdirSync('./functions/').filter(file => file.endsWith('js'))

     //  for (const file of functionFiles) {
     //      const command = require(`./functions/${file}`)
     //      client.functions.set(command.name, command)
     //  }
     //  //Checking for commands
     //  //Basic reqs prefix and not bot
     //  //might add mod only commands with .member
     //  if (!message.content.startsWith(PREFIX) || message.author.bot) return

     //  var arg = message.content.slice(PREFIX.length).trim().split(' ')
     //  var command = arg.shift().toLowerCase()
     //  var finalarg = arg.toString()


     //  for (const file of functionFiles) {
     //      const splitter
     //  }





 })

 ///////////////////////////////////////////////
 //////////////////////////////////////////////


 /////Event Handlers
 //  client.on('messageDelete', msg => { //message deletion

 //      if (msg.author.bot) return
 //      msg.channel.send('Stop deleting messages!!!')

 //  })


 //  /////Command Handler Commands 

 //  ///////Reply+React
 //  commands(client, ['Hello', 'HelloBot', 'HiBot'], message => {
 //          message.reply('Hello\n\n Please stop talking to me 😎')
 //          message.react('🖕')
 //      })
 //      //LOLOLOLOLOLOLOLOLOLOL
 //  commands(client, 'nice', message => {
 //      message.channel.send('COCK')
 //      message.react('🐓')

 //  })

 //  ///////Returns the nummber of members in the server
 //  commands(client, 'members', message => {
 //      client.guilds.cache.forEach((guild) => {
 //          message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`)
 //      })
 //  })



 //  ///////Clear channel text in the past 14days
 //  commands(client, ['cc', 'clearchannel'], message => {

 //      ///////Admin permission required
 //      const { member } = message
 //      if (!member.hasPermission(`ADMINISTRATOR`)) {
 //          return
 //      }

 //      /// async function to catch Discord API promise rejection error message older than 14days
 //      /// To DO: Improve Error message 
 //      async function purge() {
 //          //message.delete()

 //          message.channel.messages.fetch().then(messages => {
 //              message.channel.bulkDelete(messages).catch(err => message.channel.send(`Error: ${err}`))
 //          })

 //      }

 //      purge()

 //  })


 //  ///////Sets bot status
 //  //////TO DO: Owner only command??
 //  //////Research status if guild specific 
 //  commands(client, 'setStatus', message => {
 //      const content = message.content.replace('!setStatus ', '')

 //      client.user.setPresence({
 //          activity: {
 //              name: content,
 //              type: 'STREAMING',
 //              url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
 //          }
 //      })
 //  })


 //  //////// Creates text channel 
 //  /////// Bot ONLY????
 //  ////// Category ID from config to make bot scaleable
 //  commands(client, 'createtextchannel', (message) => {
 //          const name = message.content.replace('!createtextchannel ', '')

 //          message.guild.channels.create(name, {
 //              type: 'text'
 //          }).then((channel) => {
 //              const catId = '757709695157928037'
 //              channel.setParent(catId)

 //          })

 //      })
 //      //////// Creates voice channel 
 //      /////// Bot ONLY????
 //      ////// Category ID from config to make bot scaleable
 //  commands(client, 'createvoicechannel', (message) => {
 //      const name = message.content.replace('!createvoicechannel ', '')

 //      message.guild.channels.create(name, {
 //          type: 'voice'
 //      }).then((channel) => {
 //          const catId = '757709695157928038'
 //          channel.setParent(catId)
 //          channel.setUserLimit(69)

 //      })

 //  })

 //  ///////Reply embeded link to Source code
 //  commands(client, 'github', (message) => {
 //      const embed = new Discord.MessageEmbed()
 //          .setTitle("GitHub")
 //          .setURL('https://github.com/smekuria1/First_Solo_Bot')
 //          .setAuthor(message.author.username)
 //      message.channel.send(embed)

 //  })

 //  ///////Replies with a breif description
 //  //////TO DO: Add more description
 //  commands(client, ['description', 'desc'], (message) => {
 //      message.reply("This bot is a personal project designed by Solomon.\nType !help to get a list of commands")

 //  })


 //  /////Role reaction
 //  getRole(client)


 //  //////Replies(dm) with a set of available commands 
 //  commands(client, ['Help', 'help'], (message) => {
 //      message.reply('Dming you the commands').then(message => {
 //          setTimeout(() => message.delete(), 10000)
 //      })
 //      message.author.send("This bot is in trial phase some commands might produce some errors,  Type !github to report error\n\n" +
 //          "> !Hello,HelloBot,HiBot: Reply with a nice message and reacts with cute emoji\n\n" +
 //          "> !members: Reply with server name and number of members\n\n" +
 //          "> !cc,clearchannel: Deletes message for the channel(only for messages sent in the past 2weeks\n\n" +
 //          "> !createtextchannel (name): Creates text channel in the text channel catergory with (name)\n\n" +
 //          "> !createvoicechannel (name): Creates voice channel in the voice channel catergory with (name)\n\n" +
 //          "> !setStatus (status): Set the bots status to (name)\n\n" +
 //          " > !github: Send and message embeded with link to source code/github repo\n\n" +
 //          " > !desc,description: Replies with a breif description about the bot and the developer and resources")

 //  })


 //  /////////////SoundCloud Integration Starts

 //  commands(client, 'play', (message) => {
 //      const url = message.content.replace('!play ', '')
 //      const regex = new RegExp('^(?:(https?):\/\/)?(?:(?:www|m)\.)?(soundcloud\.com)\/(.*)$')
 //      const chanelId = '869264453055676426'
 //      const channel = client.channels.cache.get(chanelId)
 //          //  if (!message.member.voiceChannel) return message.channel.send("Please join voice channel")

 //      //  if (message.guild.bot.voiceChannel) message.channel.send('Join voice channel')

 //      async function play() {
 //          if (regex.test(url)) {
 //              channel.join().then(connection => {
 //                  scdl.download(url).catch(err =>
 //                      console.log(`${err}`)).then(stream => {
 //                      connection.play(stream).catch(err =>
 //                          console.log(`${err}`))
 //                  })
 //              })
 //          } else {
 //              //message.delete()
 //              return message.channel.send('Please enter a valid link to the song')
 //          }
 //      }

 //      play()

 //  })














 ////////////////////////////////////
 client.login(process.env.BOT_TOKEN)