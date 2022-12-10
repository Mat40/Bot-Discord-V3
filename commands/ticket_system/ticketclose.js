const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Vous n'êtes pas dans le channel d'un ticket.`).then(msg => msg.delete(5000));
        // Confirm delete - with timeout
        message.channel.send(`Voulez-vous vraiment fermer ce ticket? Ecrivez ***oui*** pour confirmer.`)
            .then((m) => {
                message.channel.awaitMessages(response => response.content === 'oui', {
                        max: 1,
                        time: 10000,
                        errors: ['time'],
                    })
                    .then((collected) => {
                        message.channel.delete();
                    })
                    .catch(() => {
                        channel.send(`***La fermeture du ticket a expiré, le ticket n'a pas été fermé.***`)
                    });
            });
}

module.exports.help = {
    name: "close"
}