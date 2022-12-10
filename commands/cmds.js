const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let botembed = new Discord.RichEmbed()
        .setDescription("AuthenticBot liste complète des commandes | Prefix !")
        .setColor("#00fff2")
        .addField("_**Ticket**_", "**new** - créer un ticket \n**rename** - renommer un ticket \n**add** - ajouter un utilisateur au ticket \n**remove** - enlever un utilisateur du ticket \n**close** - fermer un ticket \n")
        .addField("_**Divers**_", "**ip** - afficher l'ip du serveur \n**key** - afficher les touches utiles en jeu \n**lien** - afficher les liens utiles")
        .addField("_**Moderation**_", "**clear** - effacer la quantité de messages spécifiés \n**ban** - bannir un utilisateur \n**kick** - expulser un utilisateur \n**userinfo** - afficher les informations d'un utilisateur")
        .addField("_**Remarque**_", "Ce bot (AuthenticBot) est toujours en cours de développement par <@324939738140114945>. Si vous avez des suggestions, placez-les dans le channel <#655406188388810763>.")
        .setFooter("© 2019 Mat_, Tous les droits sont réservés");                

        return message.channel.send(botembed).then(msg => msg.delete(45000));
}

module.exports.help = {
    name: "cmds"
}
