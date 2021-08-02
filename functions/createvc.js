const { VC_cat_Id } = require('../config.json')
module.exports = {
    commands: ['createvc'],
    expectedArgs: 'name',
    //permissionError: `You must have the to use this command`,
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { client, guild } = message
        const content = arguments.toString()

        message.guild.channels.create(content, {
            type: 'voice'
        }).then((channel) => {
            channel.setParent(VC_cat_Id)
        })



    },
    permissions: ['ADMINISTRATOR', 'MANAGE_CHANNELS'],


}