var Discord = require('discord.js');
var bot = new Discord.Client();
var config = require('./config.json');
const http = require('http');
const express = require('express');
const app = express();

if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 or higher is required. Update Node on your system.");

app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = config.bot.prefix;
bot.on('message', msg => {
var suffix = msg.content.split(' ').slice(1);
  

//CMDS
if (msg.content.startsWith(prefix + "help")) {
    var help = suffix[0];
    if (!help) {
    msg.channel.send([
        '```js' + 
        '\nCOMMANDS:' + 
        `\n${prefix}spam` +
        `\n${prefix}dspam` + 
        `\n${prefix}pmspam` + 
        `\n${prefix}dpmspam` + 
        `\n${prefix}cspam` +
        '```'
    ])
    } else {
     if (help === "spam") {
         msg.channel.send([
             '```js\nSpams something you said.' + 
             `\n${prefix}spam | NUMBER | TO SPAM\`\`\``
         ])
     } else
        //PMSPAM
     if (help === "pmspam") {
         msg.channel.send([
             '```js\nPM Spams someone.' + 
             `\n${prefix}pmspam | @USERNAME | NUMBER | TO SPAM\`\`\``
         ])
     } else
         //DSPAM
      if (help === "dspam") {
          msg.channel.send([
             '```js\nSpams something you said, but then deletes.' + 
             `\n${prefix}dspam | NUMBER | TO SPAM\`\`\``
          ]) 
      } else 
        //DPMSPAM
    if (help === "dpmspam") {
        msg.channel.send([
            '```js\nSpams someone, then deletes messages.' + 
            `\n${prefix}dpmspam | @USERNAME | NUMBER | TOSPAM\`\`\``
        ])
    } else
        //CHANNEL SPAM
    if (help === "cspam") {
        msg.channel.send([
            '```js\nSpams in a specific channel.' + 
            `\n${prefix}cspam | #CHANNEL | NUMBER | TOSPAM\`\`\``
        ])
    }
    }
} else
//SPAM
    if (msg.content.startsWith(prefix + "spam")) {
    try {
        var timesRun = 0;
        var numberspam = suffix[0];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(2).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           msg.channel.send(tospam)
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       msg.channel.send(interval.length);
        } catch (err) {
        console.log(err)
        }
        } else
//DELETESPAM
    if (msg.content.startsWith(prefix + "dspam")) {
    try {
        var timesRun = 0;
        var numberspam = suffix[0];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(2).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           msg.channel.send(tospam).then(m => {
               m.delete()
           });
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       msg.channel.send(interval.length);
        } catch (err) {
        console.log(err)
        }
        } if (msg.content.startsWith(prefix + "stop")) {
          const embed = new Discord.RichEmbed()
        .setTitle("Reboot")
        .setDescription("The bot is rebooting.")
        .setColor(0xFF4500);

  let owners = "411496838550781972";

  if (!owners.includes(msg.author.id))  {
    embed
      .setTitle("Permission Denied")
      .setDescription("You do not have permission to use this command. It is meant for other users.");

    return msg.channel.send(embed);
  }

  

  process.exit(1);
        }else
//PM
    if (msg.content.startsWith(prefix + "pmspam")) {
        try {
        var usertospam = msg.mentions.users.first();
        var timesRun = 0;
        var numberspam = suffix[1];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(3).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           usertospam.send(tospam)
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       usertospam.send(interval.length);
        } catch (err) {
msg.channel.send("Error, user not found.")
        }
    } else
   //PMDELETE
      if (msg.content.startsWith(prefix + "dpmspam")) {
        try {
        var usertospam = msg.mentions.users.first();
        var timesRun = 0;
        var numberspam = suffix[1];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(3).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
           usertospam.send(tospam).then(m => {
               m.delete()
           });
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
       usertospam.send(interval.length);
        } catch (err) {
msg.channel.send("Error, user not found.")
        }
    } else
    //CHANNEL SPAM
    if (msg.content.startsWith(prefix + "cspam")) {
        try {
        var channel = msg.mentions.channels.first();
        var timesRun = 0;
        var numberspam = suffix[1];
        console.log(numberspam)
        var tospam = msg.content.split(' ').slice(2).join(' ');
        console.log(tospam)
        let messagecount = parseInt(numberspam) ? parseInt(numberspam) : 1;
       var interval = setInterval(function() {
          bot.channels.get(channel.id).send(tospam);
           timesRun += 1
           if (timesRun === messagecount) {
               clearInterval(interval)
           }
       }, 1)
      bot.channels.get(channel.id).send(interval.length);
        } catch(err) {
            console.log(err)
        }
    }
});
bot.login(config.bot.token);

//UNHANDLED REJECTION
process.on("unhandledRejection", err => {
  console.error("Uncaught Promise Error: \n" + err.stack);
});
