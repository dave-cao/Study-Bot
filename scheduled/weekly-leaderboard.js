const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../config.json');

const now = new Date();
const getTimeDifference = (timeDiff) => {
  // Returns an array of formatted hrs, mins and secs of a time difference
  const hrs = Math.floor(timeDiff / (3600 * 1000));
  const min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
  return [hrs, min, sec];
};
function isThisWeek(date) {
  const today = new Date();
  const weekDay = (today.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
  const monthDay = today.getDate();
  let mondayThisWeek = monthDay - weekDay;

  const startOfThisWeek = new Date(Number(today));
  startOfThisWeek.setDate(mondayThisWeek);
  startOfThisWeek.setHours(0, 0, 0, 0);
  mondayThisWeek = startOfThisWeek.getDate(); // take into account negative numbers

  const startOfNextWeek = new Date(Number(startOfThisWeek));
  startOfNextWeek.setDate(mondayThisWeek + 7);

  return date >= startOfThisWeek && date < startOfNextWeek;
}

client.login(config.token);
client.once('ready', () => {
  console.log('Scheduler is ready!');
  const guild = client.guilds.cache.get('787354978166898708');
  const channel = client.channels.cache.get('790658695834763296');

  if (guild && channel) {
    if (fs.existsSync('/home/milk/personalBot/Personal-Bot/userData.json')) {
      // get array of user data
      const jsonString = fs.readFileSync(
        '/home/milk/personalBot/Personal-Bot/userData.json',
        'utf8',
      );
      const userData = JSON.parse(jsonString);

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
      const weekRanks = [];
      userData.forEach((user) => {
        if (user.weekTime && isThisWeek(new Date(user.weekTracker))) {
          weekRanks.push([user.userName, user.userID, user.weekTime]);
        }
      });

      // If there is no users at the moment
      if (!weekRanks.length) {
        client.destroy();
        return;
      }
      weekRanks.sort(compare);

      // Create message
      const monthDay = now.getDate();
      now.setDate(monthDay + 1); // display monday instead of sunday
      const lastWeekDay = monthDay - 6; // display monday instead of sunday
      let lastWeekDate = new Date();
      lastWeekDate = new Date(lastWeekDate.setDate(lastWeekDay));
      const weekMessage = `${lastWeekDate.toDateString()} - ${now.toDateString()}`;
      const title = 'Top Grinders for the Week';
      let message = '';
      weekRanks.forEach((user, index) => {
        const time = getTimeDifference(user[2]);
        if (index + 1 <= 3) {
          message += `\`#${index + 1}.\` **${time[0]} hrs, ${time[1]} mins: <@${
            user[1]
          }>**\n\n`;
        } else if (index + 1 <= 10) {
          message += `\`#${index + 1}.\` ${time[0]} hrs, ${time[1]} mins: <@${
            user[1]
          }>\n\n`;
        }
      });

      // Display Embed
      const leaderboard = new Discord.MessageEmbed()
        .setColor('#5D3FD3')
        .setTitle(`${title}`)
        .setDescription(message);

      // Only display if top 3 exists
      if (weekRanks[0] && weekRanks[1] && weekRanks[2]) {
        channel.send(
          `<@&801137353623076864>\n\n${weekMessage}\n\n`
            + `:first_place: : <@${weekRanks[0][1]}>\n`
            + `:second_place: : <@${weekRanks[1][1]}>\n`
            + `:third_place: : <@${weekRanks[2][1]}>\n`
            + '-',
        );
      }
      channel.send(leaderboard).then(() => client.destroy());
    } else {
      channel.send('There is no data to display!').then(() => client.destroy());
    }
  } else {
    channel.send('Something went wrong here!').then(() => client.destroy());
  }
});
