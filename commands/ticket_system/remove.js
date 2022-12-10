const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Vous n'êtes pas dans le channel d'un ticket.`).then(msg => msg.delete(5000));
    let aUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if(aUser.roles.find(r => r.id === botconfig["ticket_system"].support_role)) return message.channel.send(`Permissions Invalide.`).then(msg => msg.delete(5000));
    message.channel.overwritePermissions(aUser, {
        SEND_MESSAGES: false,
        READ_MESSAGES: false,
        READ_MESSAGE_HISTORY: false
    });

    const embed = new Discord.RichEmbed()
    .setColor(botconfig["bot_setup"].main_embed_color)
    .setDescription(`**${aUser} (${aUser.user.tag})** a été retiré du ticket.`)

    message.channel.send(embed)
}

module.exports.help = {
    name: "remove"
}