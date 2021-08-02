module.exports = {
    commands: ['Hello', 'Hi'],
    expectedArgs: null,
    permissionError: 'Member only command',
    minArgs: 0,
    maxArgs: null,
    callback: (message, arguments, text) => {
        message.reply('Hello\n\n Please stop talking to me 😎')
        message.react('🖕')
    },


}