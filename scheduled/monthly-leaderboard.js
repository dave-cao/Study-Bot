/*
The purpose of this file is to display the monthly top 10 rankings for
the Grind Time server at the end of each month.
*/

const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../config.json');

const getTimeDifference = (timeDiff) => {
  // Returns an array of formatted hrs, mins and secs of a time difference
  const hrs = Math.floor(timeDiff / (3600 * 1000));
  const min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
  return [hrs, min, sec];
};
// All the names of the months to get the month date
const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
// Sart ranks
function compare(a, b) {
  if (a[2] < b[2]) {
    return 1;
  }
  if (a[2] > b[2]) {
    return -1;
  }
  // a must be equal to b
  return 0;
}
function isThisMonth(date) {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
}

client.login(config.token);
client.once('ready', () => {
  console.log('Monthly Scheduler is ready');
  const guild = client.guilds.cache.get('787354978166898708');
  const channel = client.channels.cache.get('937227182185529405');

  // If guild and channel exist then execute logic
  if (guild && channel) {
    if (fs.existsSync('/home/milk/personalBot/Personal-Bot/userData.json')) {
      // get array of user data
      const jsonString = fs.readFileSync(
        '/home/milk/personalBot/Personal-Bot/userData.json',
        'utf8',
      );
      const userData = JSON.parse(jsonString);

      const monthRanks = [];
      userData.forEach((user) => {
        if (user.monthlyTime && isThisMonth(new Date(user.monthlyTracker))) {
          monthRanks.push([user.userName, user.userID, user.monthlyTime]);
        }
      });

      // If there is no users at the moment
      if (!monthRanks.length) {
        client.destroy();
        return;
      }
      monthRanks.sort(compare);

      // Create message
      const now = new Date();
      const currentMonth = new Date().getMonth();
      const title = `<@&801137353623076864>\n\n:trophy: **The Top 10 Grinders of ${
        monthNames[currentMonth]
      } ${now.getFullYear()}** :trophy:`;
      let message = '';
      monthRanks.forEach((user, index) => {
        const time = getTimeDifference(user[2]);
        if (index + 1 <= 3) {
          message += `> \`${index + 1}.\` **${time[0]} hrs, ${
            time[1]
          } mins: <@${user[1]}>**\n`;
        } else if (index + 1 <= 10) {
          message += `> \`${index + 1}.\` ${time[0]} hrs, ${time[1]} mins: <@${
            user[1]
          }>\n`;
        }
        if (index === 2) {
          message += '\n';
        }
      });

      message
        += '\n> *I look forward to seeing you all next month as well! :)*';

      // Display Embed
      // const leaderboard = new Discord.MessageEmbed()
      //   .setColor('#5D3FD3')
      //   .setTitle(`${title}`)
      //   .setDescription(message);

      channel.send(`${title}\n\n${message}`).then(() => client.destroy());
    } else {
      channel.send('There is no data to display!').then(() => client.destroy());
    }
  } else {
    channel.send('Something went wrong here!').then(() => client.destroy());
  }
});
