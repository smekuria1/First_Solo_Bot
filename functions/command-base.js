const { PREFIX } = require(`../config.json`)
const { permissions, maxArgs } = require("./love")
const validatePerm = (permissions) => {
    const validPerm = ['ADMINISTRATOR', 'CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'VIEW_CHANNEL', 'READ_MESSAGES', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'EXTERNAL_EMOJIS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_ROLES_OR_PERMISSIONS', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS']

    for (const permission of permissions) {
        if (!validPerm.includes(permission)) {
            throw new Error(`Unknown permission node"${permission}"`)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = 'You do not have permission to run this command',
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions
    ///convert command and aliase into array
    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}"`)

    //convert permission into array and validate
    if (permissionError.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        validatePerm(permissions)
    }

    //Listen for commands
    client.on('message', message => {
        const { member, content, guild } = message



        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${PREFIX}${alias.toLowerCase()}`)) {

                //Ensure permissions
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        return
                    }

                }

                ////Ensure roles
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => role.name === requiredRole)

                    if (!role || member.roles.cache.has(role.id)) {
                        message.reply(`You must have the "${requiredRole}" to use this command`)
                        return
                    }
                }

                ///Splitter with regex for spaces
                const arguments = content.split(/[ ]+/)

                //remove first index !commmand

                arguments.shift()

                //Ensure number of arguments minArgs/maxArgs

                if (arguments.length < minArgs || (
                        maxArgs !== null && arguments.length > maxArgs
                    )) {
                    message.reply(`Incorrect command! Use ${PREFIX}${alias} ${expectedArgs}`)
                    return
                }



                ///run custom comand
                callback(message, arguments, arguments.join(' '))
                return
            }
        }
    })
}