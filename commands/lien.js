const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let lienembed = new Discord.RichEmbed()
        .setDescription("AuthenticRP liste complète des liens utiles | Prefix !")
        .setColor("#00fff2")
        .addField("_**Liens utiles**_", "**Site du Serveur** - [Cliquez Ici](https://5df431b75aed7.site123.me/) \n**TopServeur** - [Cliquez Ici](https://top-serveurs.net/gta/authenticrp)\n**Utip** - [Cliquez Ici](https://utip.io/authenticrp)")
        .addField("_**Liens discord**_", "**Notre Discord** - [Cliquez Ici](https://discord.gg/4GRN5fT) \n**Discord Taxis** - [Cliquez Ici](https://discord.gg/ZFsUqUM)\n**Discord Vignerons** - [Cliquez Ici](https://discord.gg/yWcDxdV)")
        .setFooter("© 2019 Mat_, Tous les droits sont réservés");                

        return message.channel.send(lienembed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "lien"
}