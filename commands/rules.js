const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let rulesembed = new Discord.RichEmbed()
        .setDescription("AuthenticRP liste complète du réglement | Prefix !")
        .setColor("#00fff2")
        .addField("_**Règles de vie sur le discord**_", "**1** - Toutes insultes ou remarque désobligeante, envers l’équipe du staff sera sévèrement puni. \n**2** - Toutes PUB ainsi que d’autres liens externes au serveur AuthenticRP sera punie. \n**3** - Utiliser les bons channels, toute en évitant de spam les mêmes questions toutes les 10 minutes. \n**4** - Si vous êtes en conflit avec un joueur à propos d’une scène qui ne vous plaît pas, veuillez en parler en privé ou bien aller dans un channel avec un Staff pour vous expliquer. \n**5** - Attention de ne pas mentionnez le développeur du serveur sous peine de provoquer sa fureur et le goulag sera votre deuxième maison. \n**6** - Tous les citoyens sont priés de mettre leurs noms et prénoms RP sur discord. \n**7** - Ce Règlement peut être soumis à des modifications, veillez à toujours être à jour.")
        .addField("_**Réglement en Jeu**_", "[Cliquez Ici](https://docs.google.com/document/d/1PhpOxULLnOBQrAV5gfmqgkdRJ3S_iOOvdafz2a6pKkI/edit?usp=sharing)")
        .setFooter("© 2019 Mat_, Tous les droits sont réservés");                

        return message.channel.send(rulesembed).then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "rules"
}