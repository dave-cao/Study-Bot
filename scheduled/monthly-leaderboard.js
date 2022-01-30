const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../config.json');

client.login(config.token);
client.once('ready', () => {
  console.log('Monthly Scheduler is ready');
  const guild = client.guilds.cache.get('ID OF GUILD');
  const channel = client.channels.cache.get('IF OF CHANNEL');

  // If guild and channel exist then execute logic
  if (guild && channel) {
  }
});
