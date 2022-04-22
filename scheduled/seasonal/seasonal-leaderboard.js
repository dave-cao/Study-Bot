// Then increase season by 1
//
// 1. Display seasonal leaderboard
//  - top 15
//  - display @ranks as well beside top 5?

/*
The purpose of this file is to display the seasonal leaderboard for the Grind
Time server at the end of each season.
*/

const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../../config.json');

const getTimeDifference = (timeDiff) => {
  // Returns an array of formatted hrs, mins and secs of a time difference
  const hrs = Math.floor(timeDiff / (3600 * 1000));
  const min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
  return [hrs, min, sec];
};
const grindRoleIDs = {
  slacker: '966518395963072523', // '787836823300472894',
  baby: '966518473285074964', // '789886143276515339',
  novice: '966518497385513030', // '789158970513555526',
  apprentice: '966518523524431972', // '789159063555801118',
  adept: '966518543527067709', //  '789159121676009483',
  rune: '966518558039363654', //  '789159182381088778',
  master: '966518579153481779', // '789159231227035688',
  grandmaster: '966518628944068659', // '789159341328302141',
  grindmaster: '966518651199057982', // '789159476182646794',
};
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
function getRank(hours) {
  // return what rank a user should be based on the time that they have
  // in season
  // When remaking, have it return an array consisting of rank, logical key,
  // and foreign key. That way I wouldn't need the object at all.
  const ranks = [
    [0, 'slacker', 'Slacker', '787836823300472894'],
    [10, 'baby', 'Baby Grinder', '789886143276515339'],
    [30, 'novice', 'Novice Grinder', '789158970513555526'],
    [95, 'apprentice', 'Apprentice Grinder', '789159063555801118'],
    [193, 'adept', 'Adept Grinder', '789159121676009483'],
    [325, 'rune', 'Rune Grinder', '789159182381088778'],
    [490, 'master', 'Master Grinder', '789159231227035688'],
    [688, 'grandmaster', 'Grandmaster Grinder', '789159341328302141'],
    [920, 'grindmaster', 'GrindMaster Supreme', '789159476182646794'],
    [999999, 'impossible', 'Impossible Grinder', '111111111'], // placeholder for ranks[i + 1]
  ];

  // loop through the ranks and figure out where the user belongs in rank
  const currentRank = ranks.filter(
    (rank, q) => hours >= rank[0] && hours < ranks[q + 1][0],
  );
  return currentRank[0];
}

function isThisSeason(oldDate) {
  const newDate = new Date();
  const yearsMatch = !(newDate.getFullYear() - oldDate.getFullYear());

  // Place the old and new date into zone

  const oldMonthDay = oldDate.getMonth();
  const newMonth = newDate.getMonth();

  const checkZone = (month) => {
    // Checks to see what zone the current month is in
    // Zone 1: January - April
    // Zone 2: May - August
    // Zone 3: September - December
    let zone;
    if (month >= 8) {
      zone = 3;
    } else if (month >= 4) {
      zone = 2;
    } else {
      zone = 1;
    }
    return zone;
  };

  // Compare the check zones
  return checkZone(oldMonthDay) === checkZone(newMonth) && yearsMatch;
}

function removeRolePromise(member, role) {
  return member.roles.remove(role).then(console.log('removed role!'));
}

const saveData = (saveFileName, userData) => {
  // Saves current userData to JSON file
  const finished = (error) => {
    if (error) {
      console.error(error);
    }
  };

  const jsonData = JSON.stringify(userData, null, 2);
  fs.writeFileSync(saveFileName, jsonData, finished);
};
client.login(config.token);
client.once('ready', () => {
  console.log('Seasonal Scheduler is Ready');
  const guild = client.guilds.cache.get('921966065108521001');
  const channel = client.channels.cache.get('921966065108521004');

  if (guild && channel) {
    if (fs.existsSync('../../userData.json')) {
      // get array of user data
      const jsonString = fs.readFileSync('../../userData.json', 'utf8');
      const userData = JSON.parse(jsonString);

      const seasonRanks = [];
      userData.forEach((user) => {
        if (user.seasonTime && isThisSeason(new Date(user.seasonDate))) {
          seasonRanks.push([user.userName, user.userID, user.seasonTime]);
        }
      });

      // If there is no users at the moment
      if (!seasonRanks.length) {
        client.destroy();
      }

      seasonRanks.sort(compare);

      // Create Message
      // Get season Number
      let seasonData;
      const seasonalDataName = './seasonal.json';
      if (fs.existsSync(seasonalDataName)) {
        const seasonString = fs.readFileSync(seasonalDataName);
        seasonData = JSON.parse(seasonString);
      }
      const { seasonNumber } = seasonData;
      const title = `@everyone\n\n:medal: **The Top 15 of Grind Time Season ${seasonNumber}** :medal:`;

      let message = '';
      seasonRanks.forEach((user, index) => {
        const time = getTimeDifference(user[2]);
        // Get user rank
        const rankID = getRank(time[0])[3];
        const rankMention = `<@&${rankID}>`;

        if (index + 1 <= 3) {
          message += `> \`${index + 1}.\` <@${user[1]}> - ${
            time[0]
          } hours : ${rankMention}\n`;
        } else if (index + 1 <= 15) {
          message += `> \`${index + 1}.\` <@${user[1]}> - ${
            time[0]
          } hours : ${rankMention}\n`;
        }
        // Add extra white space between top 3 and rest
        if (index === 2) {
          message += '\n';
        }
      });

      message += '\n> *Great work everyone! On to another productive season!*';

      // display information
      channel.send(`${title}\n\n${message}`);

      // 2. Cycle through each member and get rid of every role
      //    that contians a grinder in them
      const rankKeys = Object.keys(grindRoleIDs);
      const promises = [];
      const delay = (ms) => new Promise((res) => setTimeout(res, ms));

      const role = guild.roles.cache.get('966518395963072523');

      function getProm(member, removeRole, rankName, username) {
        return new Promise((resolve) => {
          member.roles.remove(removeRole);
          console.log(`The role ${rankName} was removed from ${username}!`);
          resolve();
        });
      }

      function Wait() {
        return new Promise((r) => setTimeout(r, 1000));
      }
      function WaitMore() {
        return new Promise((r) => setTimeout(r, 1000 * 10));
      }
      function removeRoles(member, username) {
        let chain = Promise.resolve();
        for (const rankName of rankKeys) {
          const roleID = grindRoleIDs[rankName];
          const removeRole = member.guild.roles.cache.get(roleID);
          const hasRole = member.roles.cache.some((r) => r.id === roleID);
          if (hasRole) {
            chain = chain
              .then(() => getProm(member, removeRole, rankName, username))
              .then(Wait);
          }
        }
        return chain;
      }
      function userProm(member, username) {
        return new Promise((resolve) => {
          removeRoles(member, username);
          resolve();
        });
      }
      function addRole(member, role, username) {
        return new Promise((resolve) => {
          member.roles.add(role);
          console.log(`Slacker role added to ${username}!`);
          resolve();
        });
      }

      // Include everybody
      function handleRoles() {
        let chain = Promise.resolve();
        const slackerRole = guild.roles.cache.get('966518395963072523');
        for (const user of userData) {
          const member = guild.members.cache.get(user.userID);
          if (member) {
            chain = chain
              .then(() => console.log(`Starting to remove roles on ${user.userName}.`))
              .then(() => userProm(member, user.userName))
              // .then(() => addRole(member, slackerRole, user.userName))
              .then(WaitMore);
          }
        }
        return chain;
      }

      // Increase Grind Season by 1
      // grab a bot channel
      seasonData.seasonNumber += 1;
      saveData(seasonalDataName, seasonData);

      // Run handle roles
      handleRoles()
        .then(() => console.log('FINSHED!'))
        .then(() => client.destroy());

      //
      //
      //
    } else {
      channel.send('There is no data to display!').then(() => client.destroy());
    }
  } else {
    channel.send('Someting when wrong here!').then(() => client.destroy());
  }
});

// Increase Grind Season by 1

//
// TODO:
// CRONTAB
// 0 0 1 1,5,9 *
