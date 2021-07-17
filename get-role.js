const sendFirst = require('./sendFirst')
module.exports = client => {
    const channelId = '865307016561295420'

    const getEmoji = emojiName => client.emojis.cache.find(emoji => emoji.name === emojiName)

    const emojis = {
        newRole: 'newRole',
        BotRole: 'BotRole',
        Noob: 'Noob'

    }

    const reactions = []

    let emojiText = ''

    for (const key in emojis) {
        const emoji = getEmoji(key)
        reactions.push(emoji)

        const role = emojis[key]
        emojiText += `${emoji} = ${role}\n`
    }


    sendFirst(client, channelId, emojiText, reactions)

    const handleReactionRole = (reaction, user, add) => {
        if (user.id === '863537706608754702') {
            return
        }

        const emoji = reaction.emoji.name

        const { guild } = reaction.message

        const roleName = emojis[emoji]

        if (!roleName) {
            return
        }

        const role = guild.roles.cache.find(role => role.name === roleName)

        const member = guild.members.cache.find(member => member.id === user.id)

        if (add) {
            member.roles.add(role)
        } else {
            member.roles.remove(role)
        }

    }

    client.on('messageReactionAdd', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReactionRole(reaction, user, true)
        }
    })

    client.on('messageReactionRemove', (reaction, user) => {
        if (reaction.message.channel.id === channelId) {
            handleReactionRole(reaction, user, false)
        }
    })
}