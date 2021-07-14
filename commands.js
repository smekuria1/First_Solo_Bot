const { PREFIX } = require('./config.json')


module.exports = (client, aliases, functions) => {
    if (typeof aliases === 'string') {
        aliases = [aliases]
    }


    client.on('message', message => {
        const { content } = message

        aliases.forEach(alias => {
            const command = `${PREFIX}${alias}`


            if (content.startsWith(`${command} `) || content === command) {
                console.log('Running command ' + `${command}`)
                functions(message)
            }
        })
    })
}