const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Haha, quel nom, peut-être essayer un vrai?");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Ouais, très bien essayez.");
        if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send("Haha, trop mignon, merci d'avoir essayé de me toucher cependant.");

        let banEmbed = new Discord.RichEmbed()
        .setDescription("Ban")
        .setColor("#870000")
        .addField("Utilisateur banni", `${bUser} avec l'ID ${bUser.id}`)
        .addField("Banni par", `<@${message.author.id}> avec l'ID ${message.author.id}`)
        .addField("Bannis dans", message.channel)
        .addField("Temps", message.createdAt)
        .addField("Raison", `${bReason}.`);

        let banChannel = message.guild.channels.find(`name`, "commande-bot-staff");
        if(!banChannel) return message.channel.send("Impossible de trouver le channel.");

        message.channel.send(`:white_check_mark: ${bUser} **a été banni du Discord.**`).then(msg => msg.delete(6000));
        message.guild.member(bUser).ban(bReason);
        banChannel.send(banEmbed)
}

module.exports.help = {
    name: "ban"
}