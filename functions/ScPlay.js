const scdl = require('soundcloud-downloader').default
const SC_CIENT_ID = process.env.SC_CIENT_ID
module.exports = {
    commands: ['play'],
    expectedArgs: 'Link to music',
    permissionError: 'Member only command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { guild } = message
        const single_regex = new RegExp('^(?:(https?):\/\/)?(?:(?:www|m)\.)?(soundcloud\.com)\/(.*)$')

        const chanelId = '869264453055676426'
            //const channel = message.author.voice.channel
        if (!message.member.voice.channel) return message.channel.send("Please join voice channel")

        //if (message.guild.bot.voice.channel) message.channel.send('Join voice channel')
        var url = arguments.toString()
        async function play() {

            message.member.voice.channel.join().then(connection => {
                scdl.download(url, SC_CIENT_ID).catch((err) =>
                    console.log(err)
                ).then(stream => {
                    connection.play(stream)

                }).catch((err1) => {
                    console.log(err1)
                })
            })
            if (err1) {
                message.guild.me.voice.channel.leave()
                return
            }

        }
        if (single_regex.test(url)) {
            play().catch(err =>
                console.error(`${err}`))
        } else {
            return message.channel.send('Please enter a valid link to the song')
        }

    },


}