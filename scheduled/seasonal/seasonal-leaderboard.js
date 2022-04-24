/*
The purpose of this file is to display the seasonal leaderboard for the Grind
Time server at the end of each season.
*/

const Discord = require('discord.js');

const client = new Discord.Client();
const fs = require('fs');
const config = require('../../config.json');

// File names
const userDataFileName = '/home/milk/personalBot/Personal-Bot/userData.json';
const seasonalDataName = '/home/milk/personalBot/Personal-Bot/scheduled/seasonal/seasonal.json';

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
  [1488, 'mythical', 'Mythical Grinder', '803294083660382250'],
  [999999, 'impossible', 'Impossible Grinder', '111111111'], // placeholder for ranks[i + 1]
];

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

function getTimeDifference(timeDiff) {
  // Returns an array of formatted hrs, mins and secs of a time difference
  const hrs = Math.floor(timeDiff / (3600 * 1000));
  const min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
  return [hrs, min, sec];
}
function getRank(hours) {
  // return what rank a user should be based on the time that they have
  // in season
  // When remaking, have it return an array consisting of rank, logical key,
  // and foreign key. That way I wouldn't need the object at all.

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

// Create a promise delay of 1 second for rate-limiting (per role remove)
function Wait() {
  return new Promise((r) => setTimeout(r, 1000));
}
// Create a promise delay of 10 seconds for rate-limiting (per user remove)
function WaitMore() {
  return new Promise((r) => setTimeout(r, 1000 * 10));
}

// Promise that removes the specified role from a user
function removeRole(member, role, rankName, username) {
  return new Promise((resolve) => {
    member.roles.remove(role);
    console.log(`The role ${rankName} was removed from ${username}!`);
    resolve();
  });
}
// Removes all roles from a specified user
function removeRoles(member, username) {
  let chain = Promise.resolve();
  ranks.forEach((rankInfo) => {
    const [hrThreshold, rankName, logicalKey, roleID] = rankInfo;
    const role = member.guild.roles.cache.get(roleID);
    const hasRole = member.roles.cache.some((r) => r.id === roleID);
    if (hasRole) {
      chain = chain
        .then(() => removeRole(member, role, rankName, username))
        .then(Wait);
    }
  });
  return chain;
}

// Get user promise and callback to remove all their roles
function getUserProm(member, username) {
  return new Promise((resolve) => {
    removeRoles(member, username);
    resolve();
  });
}
// Promise that adds a role to member
function addRole(member, role, username) {
  return new Promise((resolve) => {
    member.roles.add(role);
    console.log(`Slacker role added to ${username}!`);
    resolve();
  });
}

// Go through all user data, remove their grind roles and add slacker role
function handleRoles(guild, userData) {
  let chain = Promise.resolve();
  const slackerRole = guild.roles.cache.get(ranks[0][3]);
  userData.forEach((user) => {
    const member = guild.members.cache.get(user.userID);
    if (member) {
      // If the member exists, chain their promises together so it doesn't
      // happen at the same time
      chain = chain
        .then(() => console.log(`Starting to remove roles on ${user.userName}.`))
        .then(() => getUserProm(member, user.userName))
        .then(() => addRole(member, slackerRole, user.userName))
        .then(WaitMore);
    }
  });
  return chain;
}

// Start the Client
client.login(config.token);
client.once('ready', () => {
  console.log('Seasonal Scheduler is Ready');
  const guild = client.guilds.cache.get('787354978166898708');
  const GFChannel = client.channels.cache.get('838545278679646239');
  const botChannel = client.channels.cache.get('793302938453803008');

  if (guild) {
    if (fs.existsSync(userDataFileName)) {
      // get array of user data
      const jsonString = fs.readFileSync(userDataFileName);
      const userData = JSON.parse(jsonString);

      // ===========================================
      // DISPLAY SEASONAL LEADERBOARD
      // ===========================================
      const seasonRanks = [];
      userData.forEach((user) => {
        if (user.totalTime && isThisSeason(new Date(user.seasonDate))) {
          seasonRanks.push([user.userName, user.userID, user.totalTime]);
        }
      });

      // If there is no users at the moment
      if (!seasonRanks.length) {
        client.destroy();
      }

      // Compare based on index 2 (user.seasonTime)
      seasonRanks.sort(compare);

      // Create Title
      // Get season Number
      let seasonData;
      if (fs.existsSync(seasonalDataName)) {
        const seasonString = fs.readFileSync(seasonalDataName, 'utf8');
        seasonData = JSON.parse(seasonString);
      }
      const { seasonNumber } = seasonData;
      const title = `@everyone\n\n:medal: **The Top 15 of Grind Time Season ${seasonNumber}** :medal:`;

      // Create rank information message
      let message = '';
      seasonRanks.forEach((user, index) => {
        // Get rank information for each user
        const time = getTimeDifference(user[2]);
        const rankID = getRank(time[0])[3];
        const rankMention = `<@&${rankID}>`;

        // Display top 3 in bold
        if (index + 1 <= 3) {
          message += `> \`${index + 1}.\` <@${user[1]}> - **${
            time[0]
          } hours** : ${rankMention}\n`;
          // Display the rest up top 15
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

      // display information to GFChannel
      GFChannel.send(`${title}\n\n${message}`);

      // ==================================================
      // REST SERVER (GET RID OF ALL ROLES)
      // ==================================================
      // Increase Grind Season by 1
      seasonData.seasonNumber += 1;
      saveData(seasonalDataName, seasonData);

      // Cycle through each member and get rid of every role
      // that contians a grinder in them
      handleRoles(guild, userData)
        .then(() => console.log('FINSHED!'))
        .then(() => client.destroy());
      //
    } else {
      botChannel
        .send('There is no data to display!')
        .then(() => client.destroy());
    }
  } else {
    botChannel.send('Someting when wrong here!').then(() => client.destroy());
  }
});

// Increase Grind Season by 1

//
// TODO:
// CRONTAB
// 57 23 31 1,5 * // Run crontab at end of month at 31 on jan and may
// 57 23 30 9 *   // Run crontab at end of month at 30 on september
