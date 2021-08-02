module.exports = {
    commands: ['clearChannel', 'cc'],
    expectedArgs: null,
    //permissionError: `You must have the to use this command`,
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        /// async function to catch Discord API promise rejection error message older than 14days
        /// To DO: Improve Error message 
        async function purge() {
            //message.delete()

            message.channel.messages.fetch().then(messages => {
                message.channel.bulkDelete(messages).catch(err => message.channel.send(`Error: ${err}`))
            })

        }

        purge()
    },
    permissions: 'ADMINISTRATOR',


}