module.exports = {
    commands: ['setStatus'],
    expectedArgs: 'Status',
    //permissionError: `You must have the to use this command`,
    minArgs: 1,
    maxArgs: 1,
    callback: (message, arguments, text) => {
        const { client } = message
        const content = arguments.toString()
        client.user.setPresence({
            activity: {
                name: content,
                type: 'STREAMING',
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            }
        })

        setTimeout(() => message.delete(), 10000)

    },
    permissions: 'ADMINISTRATOR',


}