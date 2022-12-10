const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();



// Bot startup
console.log("Configuration d'AuthenticBot, cela peut prendre quelques secondes!")
fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("Impossible de charger les commandes.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        if(botconfig["bot_setup"].debug_mode) {
            console.log(`${f} chargés!`);
        }
        bot.commands.set(props.help.name, props);
        bot.commands.set(props.help.name2, props);
        bot.commands.set(props.help.name3, props);
    });
});

if(botconfig["module_toggles"].ticket_system) {
    fs.readdir("./commands/ticket_system/", (err, files) => {
        if(err) console.log(err);
        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log('\x1b[31m%s\x1b[0m', "Impossible de charger ticket_system."); // Red Color
            return;
        }

        jsfile.forEach((f, i) =>{
            let props = require(`./commands/ticket_system/${f}`);
            if(botconfig["bot_setup"].debug_mode) {
                console.log(`${f} chargés!`);
            }
            bot.commands.set(props.help.name, props);
        });
        console.log('\x1b[36m%s\x1b[0m', "- Module de ticket chargé!") // Cyan Color
    });
}

bot.on('error', console.error);
bot.on("ready", async () => {
    console.log('\x1b[32m%s\x1b[0m', `AuthenticBot est en ligne et configuré!`); // Green Color
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botconfig["bot_setup"].prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

    // Bot Command Logs
    if(botconfig["module_toggles"].mod_logs) {
        const cmdChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].command_logs_channel);
        if(!cmdChannel) return console.log("Channel introuvable (Config: 'commands_logs_channel')");
        const logEmbed = new Discord.RichEmbed()
        .setAuthor("Logs des Commandes")
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setDescription(`**${message.author} (${message.author.tag})** a utilisé la commande: \n\`\`\`css\n${cmd} ${args}\`\`\``.split(',').join(' '))
        .setTimestamp()
        cmdChannel.send(logEmbed)
    }
});


// Welcome message
bot.on('guildMemberAdd', member => {
    if(botconfig["module_toggles"].join_role) {
        var role = member.guild.roles.find(role => role.id === botconfig["join_roles"].role);
        if (!role) return console.log("Role introuvable (Config: 'role')");
        member.addRole(role);
        //member.send(`Bienvenue sur AuthenticRP ! Je t'invite à mettre un Nom et Prénom RP.`
    }
    if(botconfig["module_toggles"].welcome_leave_channel) {
        const channel = member.guild.channels.find(channel => channel.id === botconfig["channel_setup"].welcome_channel);
        if (!channel) return console.log("Channel de bienvenue introuvable (Config: 'welcome_channel')");
        channel.send(`${member} (${member.user.tag}) **Bienvenue sur AuthenticRP, le staff ainsi que les joueurs te souhaite un agréable moment en notre compagnie !**`);
    }
    // Member count channel update
    if(botconfig["module_toggles"].member_count_channel) {
        member.guild.channels.find(channel => channel.id === botconfig["member_count_module"].member_count_channel).setName(`Nombre de Membre: ${member.guild.memberCount}`);
    }
    member.send("**Bienvenue sur AuthenticRP !** \nMerci de bien vouloir mettre un Nom et Prénom RP.");
});

// Message Delete Logger
bot.on("messageDelete", message => {
    if(botconfig["module_toggles"].logs) {
        if (message.channel.type === 'dm') return;
        if (message.content.startsWith("!")) return undefined;
        if (message.content.startsWith(".")) return undefined;
        if (message.content.startsWith("?")) return undefined;
        if (message.content.startsWith("-")) return undefined;
        if (message.author.bot) return undefined;
        if (message.content.length > 1020) return undefined;

        let logEmbed = new Discord.RichEmbed()
        .setAuthor("Logs des Actions", bot.user.avatar_url)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setTimestamp()
        .setFooter(`${botconfig["bot_setup"].copyright} | Crée par Mat_#8695`)

        .setDescription("**Action:** Message Supprimé")
        .addField("Auteur du Message:", `${message.author.toString()} - Hash: ${message.author.tag} - ID: ${message.author.id}`)
        .addField("Channel:", message.channel)
        .addField("Contenus du Message:", `${message.content}.`)

        let logChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
        if (!logChannel) return console.log("leave channel introuvable (Config: 'general_logs_channel')");
        logChannel.send(logEmbed);
    }
});

// Message Edit Logger
bot.on("messageUpdate", (oldMessage, newMessage) => {
    if(botconfig["module_toggles"].logs) {
        if (oldMessage.author.bot) return undefined;
        if (oldMessage.content.length > 1020) return undefined;
        if (newMessage.content.length > 1020) return undefined;
        if (!oldMessage.guild) return undefined;

        let logEmbed = new Discord.RichEmbed()
        .setAuthor("Logs des Actions", bot.user.avatar_url)
        .setColor(botconfig["bot_setup"].main_embed_color)
        .setTimestamp()
        .setFooter(`${botconfig["bot_setup"].copyright} | Crée par Mat_#8695`)

        .setDescription("**Action:** Message Edité")
        .addField("Ancien Message", `${oldMessage.content}.`)
        .addField("Nouveau Message", `${newMessage.content}.`)
        .addField("Contenus du Message:", `${newMessage.author.toString()} - Hash: ${newMessage.author.tag} - ID: ${newMessage.author.id}`)
        .addField("Channel", oldMessage.channel)

        let logChannel = newMessage.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
        if (!logChannel) return console.log("leave channel introuvable (Config: 'general_logs_channel')");
        logChannel.send(logEmbed);
    }
});

// Member Update Logger
bot.on("guildMemberUpdate", async (oldMember, newMember) => {
    setTimeout(async () => {
        var Change = {
            rolesGiven: {
                update: false,
                updateArray: ""
            },
            rolesRemoved: {
                update: false,
                updateArray: ""
            },
            nickname: {
                update: false,
                updateArray: []
            }
        };

        const entry = await newMember.guild.fetchAuditLogs({ type: 'MEMBER_UPDATE' }).then(audit => audit.entries.first())

        oldMember.roles.forEach(function(rInfo) {
            if (newMember.roles.find(roles => roles.id == rInfo.id) == null)
            {
                Change.rolesRemoved.updateArray = rInfo.id;
                Change.rolesRemoved.update = true;
            }
        });

        newMember.roles.forEach(function(rInfo) {
            if (oldMember.roles.find(roles => roles.id == rInfo.id) == null)
            {
                Change.rolesGiven.updateArray = rInfo.id;
                Change.rolesGiven.update = true;
            }
        });

        // Check If Member Has Been Given A New Nickname
        if (oldMember.nickname !== newMember.nickname) {
            Change.nickname.updateArray.push({newNickname: newMember.nickname != null ? newMember.nickname : newMember.guild.members.get(newMember.id).user.username, oldNickname: oldMember.nickname != null ? oldMember.nickname : oldMember.guild.members.get(oldMember.id).user.username});
            Change.nickname.update = true;
        }

        if (Change.nickname.update) {
            let cName = Change.nickname.updateArray[0];
            let oldName = cName.oldNickname;
            let newName = cName.newNickname;
            let member = newMember.guild.members.get(entry.target.id);

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Logs des Action", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Crée par Mat_#8695`)

            logEmbed.setDescription("**Action:** Pseudo Modifié")
            if (entry.executor.id == newMember.id) {
                logEmbed.addField(`Modifié par`, `${entry.executor} ( lui-même / elle-même )`, true);
            } else {
                logEmbed.addField(`Modifié par`, `${entry.executor}`, true);
            }
            logEmbed.addField("Utilisateur", `${member} - ${member.user.tag}`, true)
            logEmbed.addField("Ancien Pseudo", oldName)
            logEmbed.addField("Nouveau Pseudo", newName)

            let logChannel = message.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Channel introuvable (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }

        if (Change.rolesGiven.update) {
            let addedRole = Change.rolesGiven.updateArray;

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Logs des Actions", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Crée par Mat_#8695`)

            logEmbed.setDescription("**Action:** Roles Ajouté")
            logEmbed.addField("Utilisateur", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Role Ajouté", `<@&${addedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Channel introuvable (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }

        if (Change.rolesRemoved.update) {
            let removedRole = Change.rolesRemoved.updateArray

            let logEmbed = new Discord.RichEmbed()
            .setAuthor("Logs des Actions", bot.user.avatarURL)
            .setColor(botconfig["bot_setup"].main_embed_color)
            .setTimestamp()
            .setFooter(`${botconfig["bot_setup"].copyright} | Crée par Mat_#8695`)

            logEmbed.setDescription("**Action:** Role Retiré")
            logEmbed.addField("Utilisateur", `${newMember} - ${newMember.user.tag}`, true)
            logEmbed.addField("Role Retiré", `<@&${removedRole}>`)

            let logChannel = oldMember.guild.channels.find(channel => channel.id === botconfig["channel_setup"].general_logs_channel);
            if(!logChannel) return console.log("Channel introuvable (Config: 'general_logs_channel')");
            logChannel.send(logEmbed);
        }
    }, 200);
});

// Bad Word Filters
if(botconfig["module_toggles"].filter_lang_links) {
    bot.on("message", message => {
        if(message.channel.type === 'dm') return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if(message.member.hasPermission("ADMINISTRATOR")) return; // Broken.. Possibilité de crash idk why, a fix
        let allowedRole = message.guild.roles.find(role => role.name === botconfig["filter_module"].language_bypass_role);
        switch (true) {
            case message.member.roles.has(allowedRole.id):
                return;
            case new RegExp(botconfig["filter_module"].filter_words.join("|")).test(message.content.toLowerCase()):
                message.delete();
                return message.channel.send(`Vous n'êtes pas autorisé à utiliser ce language ici!`).then(msg => msg.delete(10000));
        };
    });

    bot.on("message", message => {
        if(message.channel.type === 'dm') return;
        if (message.author.bot) return;
        if (!message.guild) return;
        if(message.member.hasPermission("ADMINISTRATOR")) return; // Broken.. Possibilité de crash idk why, a fix
        let allowedRole = message.guild.roles.find(role => role.name === botconfig["filter_module"].link_bypass_role);
        switch (true) {
            case message.member.roles.has(allowedRole.id): // Debug Error Code: ERRID08
                return;
            case new RegExp(botconfig["filter_module"].filter_links.join("|")).test(message.content.toLowerCase()):
                message.delete();
                return message.channel.send(`Vous n'êtes pas autorisé à utiliser ce language ici!`).then(msg => msg.delete(10000)); 

        };
    });
}

bot.login(botconfig["bot_setup"].token);
