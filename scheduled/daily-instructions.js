/*
Displays the daily instructions at 12am every day to the Grind Time server.
*/
const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../config.json');

// Leaderboard Embed
const leaderboardEmbed = new Discord.MessageEmbed()
  .setColor('#00ADFF')
  .setTitle('Wassup! This is the Leaderboards!')
  .setDescription(
    'This is where you can check your own Grinder Stats as well as the overall Leaderboard.',
  )
  .addFields(
    {
      name: 'Self Stats',
      value: '```grind profile```',
      inline: true,
    },
    {
      name: 'Display Leaderboard Options',
      value: '```leaderboard```',
      inline: true,
    },
  )
  .setThumbnail(
    'https://cdn.discordapp.com/attachments/789331759572713522/793200241011589130/Untitled_design_24.png',
  );
// Pomodoro Embed
const pomodoroEmbed = new Discord.MessageEmbed()
  .setColor('#AD00FF')
  .setTitle('Hey! You found your way to the group timer!')
  .setDescription('Join a timer, and maybe someone will join you as well!')
  .addFields(
    {
      name: 'Join Timer',
      value: '```,pjoin```',
      inline: true,
    },
    {
      name: 'Start Timer',
      value: '```,pstart```',
      inline: true,
    },
  )
  .setThumbnail(
    'https://cdn.discordapp.com/attachments/789331759572713522/793174812196732949/Untitled_design_15.png',
  );

// Todo Embed
const todoEmbed = new Discord.MessageEmbed()
  .setColor('#ADFF00')
  .setTitle('Welcome to the Daily Goals!')
  .setDescription(
    'Basically as an extra incentive to complete your daily tasks as well as a motivator for anyone who sees it, this channel is for putting in your goals for the day!',
  )
  .addFields({
    name: 'Example on how to do it!',
    value:
      '1. Make a to-do list\n2. Do some chores\n3. Finish flashcards for assignment\n\n**You can then put ~~ before and after your text to cross it out! (you can edit your message!)**\n\n**Another tip is that you can move down space in your message by pressing "Shift + Enter".**',
    inline: false,
  })
  .setImage(
    'https://cdn.discordapp.com/attachments/793302938453803008/806332578520760361/unknown.png',
  );

// Music Embed
const musicEmbed = new Discord.MessageEmbed()
  .setColor('#00FFED')
  .setTitle('Yo! This is the music command channel.')
  .setDescription(
    'This is where you invite Focus Tunes into the voice channel your in to listen to some music :D. Spotify currently works!',
  )
  .addFields(
    {
      name: 'Play a Song / Playlist',
      value: '```-play [name of song || name of playlist]```',
      inline: false,
    },
    {
      name: 'Invoke other Music Bots',
      value:
        'If the other Focus Tunes are in use. You can invoke the 2nd one by typing --play instead.',
      inline: false,
    },
  )
  .setThumbnail(
    'https://cdn.discordapp.com/attachments/789331759572713522/793172804027678740/Untitled_design_14.png',
  );

// Streak Embed
const streaksEmbed = new Discord.MessageEmbed()
  .setColor('#FF0000')
  .setTitle('Welcome! This is the Grind Streaks!')
  .setDescription(
    'Welcome! This is your Grind Streaks. Streaks will be automatically updated if you have been in the Grind Time voice channel for at least 12 minutes. ',
  )
  .setThumbnail(
    'https://cdn.discordapp.com/attachments/793302938453803008/801248403916455946/Untitled_design_17.png',
  );

client.login(config.token);
client.once('ready', () => {
  console.log('Daily Instructions Scheduler is ready');
  const guild = client.guilds.cache.get('787354978166898708');
  const leaderboardChannel = client.channels.cache.get('793302938453803008');
  const pomoChannel = client.channels.cache.get('793302938453803008');
  const todoChannel = client.channels.cache.get('793302938453803008');
  const musicChannel = client.channels.cache.get('793302938453803008');
  const streaksChannel = client.channels.cache.get('793302938453803008');

  leaderboardChannel
    .send(leaderboardEmbed)
    .then(() => pomoChannel
      .send(pomodoroEmbed)
      .then(() => todoChannel
        .send(todoEmbed)
        .then(() => musicChannel
          .send(musicEmbed)
          .then(() => streaksChannel.send(streaksEmbed).then(() => client.destroy())))));
});
