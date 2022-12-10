const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let keyembed = new Discord.RichEmbed()
        .setDescription("AuthenticRP liste complète des touches en jeu | Prefix !")
        .setColor("#00fff2")
        .addField("_**Touches**_", "**F1** - Changer la portée de la voix \n**F2** - Animations \n**F3** - Limiteur de vitesse \n\n**F5** - Menu Interaction \n**F6** - Menu Métier \n**F7** - Téléphone \n\n**F9** - Menu Second Métier \n\n**U** - Vérouiller/Déverouiller le véhicule \n**L** - Ouvrir le coffre du véhicule")
        .addField("_**Flèches directionnels**_", "**Droite** - Clignotant Droite \n**Gauche** - Clignotant Gauche \n**Bas** - Scoreboard")
        .setFooter("© 2019 Mat_, Tous les droits sont réservés");                

        return message.channel.send(keyembed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "key"
}
