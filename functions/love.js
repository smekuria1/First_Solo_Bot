module.exports = {
    commands: ['love', '<3'],
    expectedArgs: 'person1',
    permissionError: 'Member only command',
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        message.reply(`I love ${arguments}`)
    },
    requiredRoles: [''],
    permissions: ['']


}