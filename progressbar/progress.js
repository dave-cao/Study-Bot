const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const progressbar = require('string-progressbar');
const config = require('../config.json');

const total = 365;
const current = 200;
const displayBar = progressbar.filledBar(total, current, [365]);

const testEmbed = new Discord.MessageEmbed()
  .setColor('#aa6c39')
  .setTitle("1 year means you're crazy!")
  .setDescription(displayBar[0]);

client.login(config.token);
client.once('ready', () => {
  const channel = client.channels.cache.get('793302938453803008');
  channel.send(testEmbed);
});

// Use ranks for this
// For now the ranks are going to be secret
// Think of new rank names?
