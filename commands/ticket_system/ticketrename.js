const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(!args[0]) return message.channel.send("Veuillez spécifier un nom de channel. Utilisez un \`-\` au début pour ajouter au nom existant.");
    let channelRename = args.join('-')

    if (message.channel.name.startsWith(`ticket-`)) {
        if(channelRename.startsWith(`-`)) {
            message.channel.setName(`${message.channel.name}${channelRename}`)
            message.channel.send(`<@${message.author.id}> Channel renommé en: *${message.channel.name}${channelRename}*`)
        } else {
            message.channel.setName(`ticket-${channelRename}`)
            message.channel.send(`<@${message.author.id}> Channel renommé en: *ticket-${channelRename}*`)
        }
    } else {
        return message.channel.send(`Vous n'êtes pas dans le channel d'un ticket`).then(msg => msg.delete(5000));
    }
}

module.exports.help = {
    name: "rename"
}