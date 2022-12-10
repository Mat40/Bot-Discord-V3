const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();

    let sicon = message.guild.iconURL;
    let nitroembed = new Discord.RichEmbed()
    .setDescription("Soutenez nous !")
    .setColor("#fef836")
    .setThumbnail(sicon)
    .addField("**Vous avez un Nitro sur votre compte et vous ne savez pas quoi en faire ?**", "*Alors aidez-nous à booster le serveur et recevez un rôle séparé des autres propre et unique à vous-mêmes !*")
  

    message.channel.send(nitroembed)//.then(msg => msg.delete(10000));
}

module.exports.help = {
    name: "nitro"
}
