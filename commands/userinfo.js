const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    message.delete();
    if(message.member.roles.some(r=>["-"].includes(r.name)) ) {

        let user;
        // If the user mentions someone, display their stats. If they just run userinfo without mentions, it will show their own stats.
        if (message.mentions.users.first()) {
          user = message.mentions.users.first();
        } else {
            user = message.author;
        }
        // Define the member of a guild.
        const member = message.guild.member(user);
        
        //Discord rich embed
        const UserInfoEmbed = new Discord.RichEmbed()
            .setColor('#fef836')
            .setThumbnail(user.avatarURL)
            .setTitle(`${user.username}#${user.discriminator}`)
            .addField("ID:", `${user.id}`, true)
            .addField("Pseudo:", `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
            .addField("Compte créé à:", `${user.createdAt}`, true)
            .addField("Serveur joint à:", `${member.joinedAt}`, true)
            .addField("Bot:", `${user.bot}`, true)
            .addField("Status:", `${user.presence.status}`, true)
            .addField("Jeux:", `${user.presence.game ? user.presence.game.name : 'None'}`, true)
            .addField("Roles:", member.roles.map(roles => `${roles.name}`).join(', '), true)
            .setFooter(`Répondre à ${message.author.username}#${message.author.discriminator}`)

        message.channel.send(UserInfoEmbed).then(msg => msg.delete(25000));
    } else {
        message.channel.send("Vous n'êtes pas autorisé à utiliser cette commande.").then(msg => msg.delete(5000));
    }    
}

module.exports.help = {
    name: "userinfo"
}