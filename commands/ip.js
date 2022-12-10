const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();

    let sicon = message.guild.iconURL;
    let ipembed = new Discord.RichEmbed()
    .setDescription("Nous rejoindre !")
    .setColor("#fef836")
    .setThumbnail(sicon)
    .addField("Nom du Serveur", "AuthenticRP")
    .addField("\nIP du Serveur", "51.89.173.104:30136")
    .addField("\nMot de passe du Serveur", "Sanchez2")
    .addField("\nRejoignez le serveur", "<fivem://connect/51.89.173.104:30136> \nCliquez dessus une seule fois.")

    message.channel.send(ipembed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "ip"
}
//Rejoignez le serveur", "<fivem://connect/51.89.173.104:30136> \n Cliquez dessus une seule fois.
