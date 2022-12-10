const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");

module.exports.run = async (bot, message, args) => {
    message.delete();
         
    if (!message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role)) return message.channel.send(`Aucun rôle pour créer un ticket. Veuillez contacter le propriétaire du serveur.`).then(msg => msg.delete(15000));
    
    message.guild.createChannel(`ticket-${message.author.username}`, "text").then(c => {
        moveTicket(c)
        let roleSupportRole = message.guild.roles.find(role => role.id === botconfig["ticket_system"].support_role);
        let roleEveryone = message.guild.roles.find(role => role.name === "@everyone");
        c.overwritePermissions(roleSupportRole, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(roleEveryone, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.setTopic(`ID du Ticket: ${message.author.id} | Créateur: ${message.author.username}`)
        message.channel.send(`:white_check_mark: ***<@${message.author.id}> Votre ticket a été crée, <#${c.id}>.***`).then(msg => msg.delete(15000));
        const embed = new Discord.RichEmbed()
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setDescription(`**Cher <@${message.author.id}>!**\n\nMerci d'avoir contacté notre équipe d'assistance! \n\n Nous vous répondrons dans les plus brefs délais. Veuillez tout d'abord à renommer ce ticket avec la commande \`!rename\`. \nPour fermer ce ticket, utilisez \`!close\`.`)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Crée par Mat_#8695`)
        c.send(embed)

        if(botconfig["ticket_system"].auto_reply) {
            if(!message.guild.channels.find(channel => channel.name === c.id)) return
            const filter = m => m.author.id === message.author.id;
            c.awaitMessages(filter, { max: 1, time: ms('1d') }).then(idfk => {
                c.send(botconfig["ticket_system"].auto_reply_message)
            })
        }
    }).catch(console.error);
    async function moveTicket(c) {
        await c.setParent(botconfig["channel_setup"].ticket_category);
    };
}

module.exports.help = {
    name: "new"
}
