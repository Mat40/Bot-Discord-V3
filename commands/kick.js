const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Haha, quel nom, peut-être essayer un vrai?");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Ouais, très bien essayez.");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("Haha, bien essayé!");

        let kickEmbed = new Discord.RichEmbed()
        .setDescription("Kick")
        .setColor("#fc4b4b")
        .addField("Utilisateur expulsé", `${kUser} with ID ${kUser.id}`)
        .addField("Expulsé par", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Expulsé dans", message.channel)
        .addField("Temps", message.createdAt)
        .addField("Raison", `${kReason}.`);

        let kickChannel = message.guild.channels.find(`name`, "commande-bot-staff");
        if(!kickChannel) return message.channel.send("Impossible de trouver le channel.");

        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
        message.channel.send(`:white_check_mark: ${kUser} **a été expulsé du Discord.**`).then(msg => msg.delete(6000));
}

module.exports.help = {
    name: "kick"
}