const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('./config.json');

const now = new Date();

client.login(config.token);
client.once('ready', () => {
  console.log('Scheduler is ready!');
  const guild = client.guilds.cache.get('787354978166898708');
  const channel = client.channels.cache.get('793302938453803008');

  if (guild && channel) {
    channel.send('this is working').then(() => client.destroy());
    if (fs.existsSync('userData.json')) {
      // get array of user data
      const jsonString = fs.readFileSync('userData.json', 'utf8');
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
        if (user.weekTime) {
          weekRanks.push([user.userName, user.userID, user.weekTime]);
        }
      });
      weekRanks.sort(compare);

      // Display message
      const monthDay = now.getDate();
      const lastWeekDay = monthDay - 7;
      const lastWeekDate = new Date(now.setDate(lastWeekDay));
      // TODO: finish up this here
      const weekMessage = `The week of: ${lastWeekDate.toDateString()} - ${now.toDateString()}`;
      weekRanks.forEach((user, index) => {
        message += `\`#${index}.\`${user[2]}: ${user[0]}\n`;
      });
      channel.send(message);
    } else {
      channel.send('There is no data to display!');
    }
  } else {
    channel.send('Something went wrong here!').then(() => client.destroy());
  }
});

function displayLeaderboardFunction(message, timeframe, displayTop) {
  // message is from the message object of discord
  // time frame is -d, -w, -m, or -t string from message
  // displayTop is a boolean true or false to send top 20 or just current user
  const userID = message.guild.member(message.author.id).user.id;
  // Returns a message embed of the leaderboard of the timeframe
  if (fs.existsSync('userData.json')) {
    const jsonString = fs.readFileSync('userData.json', 'utf8');
    const userData = JSON.parse(jsonString);
    // ==========================================
    // GET USER RANKINGS
    // ==========================================
    // SORT THIS
    function getHighest(rankArray) {
      let max = 0;
      let maxUser = [];
      rankArray.forEach((user) => {
        if (user[1] > max) {
          max = user[1];
          maxUser = user;
        }
      });
      return maxUser;
    }

    // function that adds rank number to rank
    const addRankNumber = (sortedRankArray) => {
      const arrayCopy = [...sortedRankArray];
      for (let i = 0; i < sortedRankArray.length; i += 1) {
        arrayCopy[i].push(i + 1);
      }
      return arrayCopy;
    };

    function sortRanks(rankArray) {
      const rankCopy = [...rankArray];
      let sortedArray = [];
      for (let i = 0; i < rankArray.length; i += 1) {
        const currentHighest = getHighest(rankCopy);
        sortedArray.push(currentHighest);
        const highestIndex = rankCopy.indexOf(currentHighest);
        rankCopy.splice(highestIndex, 1);
      }
      sortedArray = addRankNumber(sortedArray);

      return sortedArray;
    }

    const now = new Date();
    const dayRanks = [];
    const weekRanks = [];
    const monthRanks = [];
    const totalRanks = [];
    for (const userDatum of userData) {
      // if user hasn't grinded today then not in rankings
      const userGrindToday = new Date(userDatum.dayTrackerDay);
      const checkGrindedToday = now.toDateString() === userGrindToday.toDateString();
      if (checkGrindedToday) {
        dayRanks.push([
          userDatum.userID,
          userDatum.dayTrackerTime,
          userDatum.userName,
        ]);
      }

      // if user hasn't grinded this week then not in rankings
      const weekDay = new Date(userDatum.weekTracker);
      const weekTrackerCheck = isThisWeek(weekDay);
      if (weekTrackerCheck) {
        weekRanks.push([
          userDatum.userID,
          userDatum.weekTime,
          userDatum.userName, // THIS PART DIFFERENT THEN PROFILE
        ]);
      }

      // is user hasn't grinded this month then not in rankings
      const oldMonthDate = new Date(userDatum.monthlyTracker);
      const oldMonth = oldMonthDate.getMonth();
      const oldYear = oldMonthDate.getFullYear();
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();
      const monthTrackerCheck = oldMonth === currentMonth && oldYear === currentYear;
      if (monthTrackerCheck) {
        monthRanks.push([
          userDatum.userID,
          userDatum.monthlyTime,
          userDatum.userName,
        ]);
      }

      // push total time grinded
      totalRanks.push([
        userDatum.userID,
        userDatum.totalTime,
        userDatum.userName,
      ]);
    }
    const sortedDayRanks = sortRanks(dayRanks);
    const sortedWeekRanks = sortRanks(weekRanks);
    const sortedMonthRanks = sortRanks(monthRanks);
    const sortedTotalRanks = sortRanks(totalRanks);

    // GETTING INFORMATION FROM ARRAY
    const getPerson = (array) => {
      // array is the user rank info
      if (array.length > 1) {
        // I'm literally returning the same array but with different order smh
        return [array[2], array[3], array[1], array[0]];
      }
      return 0;
    };

    // FUNCTION FOR DISPLAY LEADERBOARD
    const displayLeaderboard = (sortedRanks) => {
      let leaderboardStr = '';
      let count = 0; // this is for the empty ranks
      sortedRanks.forEach((rank) => {
        if (rank.length > 1) {
          count += 1;
        }
      });
      // Maximum length should only be 25 in case something breaks
      let leaderboardLength = sortedRanks.length;
      if (count > 20) {
        leaderboardLength = 20;
      }

      // Show above and below 5 from user
      let startPos = 0;
      let endPos = leaderboardLength;

      // If they type "top" before the rank, then it will display top 20
      if (!displayTop) {
        const padding = 5;
        const [currentUser] = sortedRanks.filter((user) => user[0] === userID);
        if (currentUser !== undefined) {
          const currentPosition = currentUser[3];
          startPos = currentPosition - padding;
          endPos = currentPosition + padding;

          // End limit cases
          if (startPos < 0) {
            startPos = 0;
          }
          if (endPos > count) {
            endPos = count;
          }
        }
      }

      // Make the display string
      if (sortedRanks.length) {
        for (let i = startPos; i < endPos; i += 1) {
          const displayInfo = getPerson(sortedRanks[i]);
          const time = getTimeDifference(displayInfo[2]);

          const statsString = `${time[0]} hrs, ${time[1]} mins: ${displayInfo[0]}`;

          // Check to see if hours and minutes are 0 and don't display
          if (displayInfo) {
            let displayString = `\`# ${displayInfo[1]}.\` ${statsString} \n\n`;

            // Grabs the user
            if (displayInfo[3] === userID) {
              displayString = `\`# ${displayInfo[1]}.\` **${statsString}** \n\n`;
            }

            leaderboardStr += displayString;
          }
        }
      }
      if (!sortedRanks.length) {
        leaderboardStr = 'No one has grinded yet!';
      }
      return leaderboardStr;
    };

    let leaderboardStr = '';
    let title = '';
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
    const thisMonth = new Date().getMonth();

    switch (timeframe) {
      case '-d':
        leaderboardStr = displayLeaderboard(sortedDayRanks);
        title = 'Daily Leaderboard';
        break;
      case '-w':
        leaderboardStr = displayLeaderboard(sortedWeekRanks);
        title = 'Weekly Leaderboard';
        break;
      case '-m':
        leaderboardStr = displayLeaderboard(sortedMonthRanks);
        title = `Monthly Leaderboard (${monthNames[thisMonth]})`;
        break;
      case '-t':
        leaderboardStr = displayLeaderboard(sortedTotalRanks);
        title = 'All-Time Leaderboard';
        break;
      default:
        leaderboardStr = 'No one has grinded yet!';
        title = 'Something went wrong here';
    }
    const leaderboard = new Discord.MessageEmbed()

      .setColor('#5D3FD3')
      .setTitle(`${title}`)
      // If the length of the todayGrinded variable inreases by one
      // then we take out a white space before it and add it after it
      // Make a function that does this
      .setDescription(leaderboardStr);
    return leaderboard;
    // ================================
  }
  return 'There is no user data to display!';
}
