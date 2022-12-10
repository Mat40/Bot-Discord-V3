const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Permission invalide.").then(msg => msg.delete(10000));
    if(!args[0]) return message.channel.send("Utiliser un nombre. Ex `clear 5`.").then(msg => msg.delete(5000));
    message.channel.bulkDelete(args[0]).then(() => {
        message.channel.send(`${args[0]} messages ont été effacés.`).then(msg => msg.delete(10000));
    });
}
module.exports.help = {
    name: "clear"
}
