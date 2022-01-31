/*
Displays the daily instructions at 5am every day to the Grind Time server.
*/
const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../config.json');

client.login(config.token);
client.once('ready', () => {
  console.log('Daily Instructions Scheduler is ready');
  const guild = client.guilds.cache.get('787354978166898708');
  const channel = client.channels.cache.get('937227182185529405');
  const streaksChannel;
  const musicChannel;
  const pomoChannel;
  const leaderboardChannel;
  const todoChannel;
 });
