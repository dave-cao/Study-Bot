const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('./config.json');
const command = require('./command');
const firstMessage = require('./first-message');

// My own files
const rankupMessages = require('./rankup-embeds');

client.once('ready', () => {
  console.log('Real Grinder is Online!');

  command(client, ['ping', 'test'], (message) => {
    message.channel.send('Pong!');
  });

  // List servers
  command(client, 'servers', (message) => {
    for (const guild of client.guilds.cache) {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`,
      );
    }
  });
  // Delete messages
  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results);
      });
    }
  });

  // Update bot status
  command(client, 'status', (message) => {
    const content = message.content.replace('grind status', '');

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    });
  });

  // DM Member on Join
  client.on('guildMemberAdd', (member) => {
    member.send(
      '**Hello! Welcome to Grind Time**! \n'
        + 'Grind Time is a server meant to facilitate a community that supports accountability and productivity. \n'
        + 'We encourage this through gamification! There are many features that you can test and try out like a **leveling system** and a **streaks system**. \n'
        + "If you don't want to read the tutorial in the beginning, you can also watch the short video below to get a handle of everything on Grind Time. \n\n"
        + 'Have fun grinding, I look forward to seeing you on the other side! ~ David (Cow) '
        + '```The more you grind, the higher the level. The current highest is the Grindmaster Supreme...till this day, none has yet to achieve this feat. Can you?``` \n'
        + 'https://youtu.be/FRBrVgeM1d8',
    );
  });

  // Send first message
  // Not working = firstMessage(client, '817984922262306857', 'Nani the fk this dont', [`🔥`])
});

/*
Client.on('message', async message =>{
    //Check message is not Bot
    if(message.author.bot) return;
    if(message.content=="!movetome"){

        const channel = message.member.voice.channel;
    message.guild.members.cache.forEach(member => {
  //guard clause, early return
  if(member.id === message.member.id || !member.voice.channel) return;
  member.voice.setChannel('817111025819975700');
});
    }
});
*/

// Making a dark Portal KEKW - have them loop for now

// client.on("voiceStateUpdate", (oldMember, newMember) => {
//   let minuteTime = 15000;
//   let portalOne = "823394539247108118";
//   let portalTwo = "823394660906827797";
//   let portalThree = "823394715092254740";
//   let portalFour = "823394758486654986";
//   let portalFive = "823394661636636762";
//   const textChannel = client.channels.cache.get(`821951428717183006`);

// first Portal
//   if (newMember.channelID === portalOne && oldMember.channelID !== portalOne) {
//     setTimeout(function () {
//       textChannel.send(
//         `<@${newMember.id}> Please wait a few seconds for your journey to begin!`
//       );
//     }, 3000);
//     setTimeout(function () {
//       newMember.setChannel(portalTwo);
//     }, minuteTime);
//   } else if (
//     newMember.channelID === portalTwo &&
//     oldMember.channelID !== portalTwo
//   ) {
//     setTimeout(function () {
//       newMember.setChannel(portalThree);
//     }, minuteTime);
//   } else if (
//     newMember.channelID === portalThree &&
//     oldMember.channelID !== portalThree
//   ) {
//     setTimeout(function () {
//       newMember.setChannel(portalFour);
//     }, minuteTime);
//   } else if (
//     newMember.channelID === portalFour &&
//     oldMember.channelID !== portalFour
//   ) {
//     setTimeout(function () {
//       newMember.setChannel(portalFive);
//     }, minuteTime);
//   } else if (
//     newMember.channelID === portalFive &&
//     oldMember.channelID !== portalFive
//   ) {
//     setTimeout(function () {
//       newMember.setChannel(portalOne);
//     }, minuteTime);
//   } else {
//     return;
//   }
// });
const ranks = [
  [
    0,
    'slacker',
    'Slacker',
    '787836823300472894',
    rankupMessages.slackerMessage,
  ],
  [
    10,
    'baby',
    'Baby Grinder',
    '789886143276515339',
    rankupMessages.babyMessage,
  ],
  [
    30,
    'novice',
    'Novice Grinder',
    '789158970513555526',
    rankupMessages.noviceMessage,
  ],
  [
    95,
    'apprentice',
    'Apprentice Grinder',
    '789159063555801118',
    rankupMessages.apprenticeMessage,
  ],
  [
    193,
    'adept',
    'Adept Grinder',
    '789159121676009483',
    rankupMessages.adeptMessage,
  ],
  [
    325,
    'rune',
    'Rune Grinder',
    '789159182381088778',
    rankupMessages.runeMessage,
  ],
  [
    490,
    'master',
    'Master Grinder',
    '789159231227035688',
    rankupMessages.masterMessage,
  ],
  [
    688,
    'grandmaster',
    'Grandmaster Grinder',
    '789159341328302141',
    rankupMessages.grandmasterMessage,
  ],
  [
    920,
    'grindmaster',
    'GrindMaster Supreme',
    '789159476182646794',
    rankupMessages.grindmasterMessage,
  ],
  [
    1300,
    'mythical',
    'Mythical Grindmaster',
    '803294083660382250',
    rankupMessages.mythicalMessage,
  ],
  [999999, 'impossible', 'Impossible Grinder', '999999999999', 'placeholder'], // placeholder for ranks[i + 1]
];

function getRankInfo(hours) {
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
// Checks to see if a date is within this week!!
function isThisSeason(oldDate, newDate) {
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
function isThisWeek(date) {
  const now = new Date();
  const weekDay = (now.getDay() + 6) % 7; // Make sure Sunday is 6, not 0
  const monthDay = now.getDate();
  let mondayThisWeek = monthDay - weekDay;

  const startOfThisWeek = new Date(Number(now));
  startOfThisWeek.setDate(mondayThisWeek);
  startOfThisWeek.setHours(0, 0, 0, 0);

  const startOfNextWeek = new Date(Number(startOfThisWeek));
  // In cases where this is a neg number, re-read mondayThisWeek
  mondayThisWeek = startOfThisWeek.getDate();
  startOfNextWeek.setDate(mondayThisWeek + 7);

  return date >= startOfThisWeek && date < startOfNextWeek;
}

// Maybe get a formatter
const getTimeDifference = (timeDiff) => {
  // Returns an array of formatted hrs, mins and secs of a time difference
  const hrs = Math.floor(timeDiff / (3600 * 1000));
  const min = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const sec = Math.floor((timeDiff % (1000 * 60)) / 1000);
  return [hrs, min, sec];
};

// Save JSON Data
const saveData = (userData) => {
  // Saves current userData to JSON file
  const finished = (error) => {
    if (error) {
      console.error(error);
    }
  };

  const jsonData = JSON.stringify(userData, null, 2);
  fs.writeFileSync('userData.json', jsonData, finished);
};

// STREAK SYSTEM IMPLEMENTATION
client.on('voiceStateUpdate', (oldMember, newMember) => {
  // check is user is bot
  if (oldMember.member.user.bot) return;
  const isBeef = newMember.id === '751885320936620162';

  const newUserChannel = newMember.channelID;
  const oldUserChannel = oldMember.channelID;
  const person = client.users.cache.get(newMember.id);
  let hasMember = 0;
  const grindTimeVC = '787354978523545634';
  const streakChannel = client.channels.cache.get('839226206276812800');
  const accountabilityChannel = client.channels.cache.get('821951428717183006');
  const announcementsChannel = client.channels.cache.get('795155126208823297');
  const minute = 1000 * 60;

  let userData = [];
  // Read JSON file
  if (fs.existsSync('userData.json')) {
    const jsonString = fs.readFileSync('userData.json', 'utf8');
    userData = JSON.parse(jsonString);
  }

  // If user enters voice channel
  if (newUserChannel === grindTimeVC && oldUserChannel !== grindTimeVC) {
    // check if user is Beef
    if (isBeef) {
      newMember.setMute(true);

      return;
    }
    // TODO: MAKE A ACCOUNTABIILTY TWO HOUR BOT FOR THOSE WHO DON't HAVE CAMS ON
    // When member enters grind time, give them a role that unlocks the goals channel
    // FIXME: we have to make it on old AND new member as new too
    //  not just when they first enter.
    //
    // setTimeout(() => {
    //   // notice if user has cams on or screensharing, if yes, return
    //   // notice if user has sent a message in goals session, if yes, return.
    //   //
    //   //
    //   // if user is not cams on / screensharing then ping message
    //   //  "it looks like you have not put on cams or screensharing, please type in a
    //   //    goal in the Goals Channel for this session in the next 5 minutes or you
    //   //    will be kicked"
    //   setTimeout(() => {
    //     // notice if user has cams on or screensharing, if yes return
    //     // notice if user has sent message in goals channel, if yes, return.
    //     //
    //     // if not, kick them out
    //   }, 5min)

    // }, 5min)
    // TODO: Make this is a message channel
    // if member has typed in goals channel:
    //  check to see if user has already logged in session goal, if yes, return.
    //  send message = "successfully logged in your session goal, I will check back
    //    with you in 2 hours"
    //  setTimeout (2 hours):
    //    check to see if user is in voice channel, if yes continue, if not, return.
    //    reset the users session goal back to 0 so they have to retype it.
    //    send message = "Did you finish your tasks for this session? If you want to
    //      continue, please type again in the session goals, if not, you will be kicked
    //      in the next 5 minutes."
    //    setTimeout (5 minutes):
    //      check to see if user is still in voice channel
    //      if user has typed in a new session goal, return.
    //      if user has not type in a new session goal, kick from channel.
    //
    //
    //
    //
    //
    // Push an object of new member into list
    if (userData.length === 0) {
      // If there is nothing in array then push
      userData.push({
        userName: person.username,
        userID: newMember.id,
        streakDate: new Date(),
        streak: 0,
        maxStreak: 0,
        streakFreeze: 0,
        firstStreak: true,
      });
    } else {
      for (const userDatum of userData) {
        // If the userID doesn't already exist in array then push
        if (userDatum.userID !== newMember.id) {
          hasMember += 1;
        }
      }

      if (hasMember === userData.length) {
        userData.push({
          userName: person.username,
          userID: newMember.id,
          streakDate: new Date(),
          streak: 0,
          maxStreak: 0,
          streakFreeze: 0,
          firstStreak: true,
        });
      }
    }

    for (let i = 0; i < userData.length; i += 1) {
      // Only change data of entered member
      if (userData[i].userID === newMember.id) {
        // Every time user enters, entertime will be different
        userData[i].enterTime = new Date();
        userData[i].inVoiceChannel = true;

        // If a day tracker hasn't been made, then make it
        if (
          userData[i].dayTrackerTime === undefined
          || userData[i].dayTrackerTime === null
        ) {
          userData[i].dayTrackerTime = 0;
          userData[i].dayTrackerDay = new Date();
        }

        // If a weekly tracker hasn't been made, then make it
        if (
          userData[i].weekTime === undefined
          || userData[i].weekTime === null
        ) {
          userData[i].weekTime = 0;
          userData[i].weekTracker = new Date();
        }

        // If a monthly time tracker hasn't been made, then make it
        if (
          userData[i].monthlyTime === undefined
          || userData[i].monthlyTime === null
        ) {
          userData[i].monthlyTime = 0;
          userData[i].monthlyTracker = new Date();
        }

        // If a seasonal time tracker hasn't been made, then make it
        if (
          userData[i].seasonTime === undefined
          || userData[i].seasonTime === null
        ) {
          userData[i].seasonTime = 0;
          userData[i].seasonDate = new Date();
        }

        // If a total time tracker hasn't been made, then make it
        if (
          userData[i].totalTime === undefined
          || userData[i].totalTime === null
        ) {
          userData[i].totalTime = 0;
        }

        // Checks to see if it's a new day
        const dayTrackerCheck = new Date(userData[i].dayTrackerDay).toDateString()
          === new Date().toDateString();
        if (!dayTrackerCheck) {
          userData[i].dayTrackerDay = new Date();
          userData[i].dayTrackerTime = 0;
        }

        // Check to see if it's a new week
        const weekDay = new Date(userData[i].weekTracker);
        const weekTrackerCheck = isThisWeek(weekDay);
        if (!weekTrackerCheck) {
          userData[i].weekTracker = new Date();
          userData[i].weekTime = 0;
        }

        // Checks to see if it's a new month
        const oldMonthDate = new Date(userData[i].monthlyTracker);
        const oldMonth = oldMonthDate.getMonth();
        const oldYear = oldMonthDate.getFullYear();

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        const monthTrackerCheck = oldMonth === currentMonth && oldYear === currentYear;
        if (!monthTrackerCheck) {
          userData[i].monthlyTracker = new Date();
          userData[i].monthlyTime = 0;
        }

        // Checks to see if it's a new season

        const oldSeasonData = new Date(userData[i].seasonDate);
        if (!isThisSeason(oldSeasonData, currentDate)) {
          userData[i].seasonDate = new Date();
          userData[i].seasonTime = 0;
        }

        // ===================================================================
        // STREAK SYSTEM
        // ===================================================================
        const actualDate = new Date();
        // Need to turn it back into a date object
        const dateToCheck = new Date(userData[i].streakDate);
        const timeDiff = actualDate.getTime() - dateToCheck.getTime();
        const nextDayCheck = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        // Checks to see if it is the same day
        const check = actualDate.toDateString() === dateToCheck.toDateString();

        if (!check || userData[i].firstStreak) {
          // If more than two days past, then reset streak
          if (nextDayCheck > 1) {
            // If day diff is 2 then use 1 freezes
            // If day diff is 3 then use 2 freezes
            for (let q = nextDayCheck; q > 1; q -= 1) {
              userData[i].streakFreeze -= 1;
            }

            if (userData[i].streakFreeze >= 0) {
              streakChannel.send(
                `<@${newMember.id}> You were about to lose your streak but your freeze saved the day!\nYou now have \`${userData[i].streakFreeze}\` freezes left!`,
              );
              // TODO: Implement the case where the user uses a streak freeze
              // however, they don't complete the streak freeze
              // If they come back into the voice channel they will lose
              // even more streak freezes.
              //
              // My thought process here is to set the streak Date to yesterday
              // once the user gets here. Thus, the streak freezes are used
              // but are not used again.
              //
              // If we set it to yesterday, then if they come back tomorrow,
              // their streak will now only decrease by 1 day since they already
              // used their streaks
              //
              // Code Example:
              //
              // const ONE_DAY_MILLI = 24 * 60 * 60 * 1000 || 86 400 000
              // userData[i].streakDate = currentDate - ONE_DAY_MILLI
              //
              // Bug Example:
              //  - user comes into voice channel and has not grinded for
              //    20 days. They have 30 streak freezes, thus once they enter
              //    their streak freezes decreases by 20 and they have 10 left.
              //    Howwever, they don't complete their streak and leave. If
              //    they come again the next day, it will now be subtracted by
              //    21 days but they only have 10 streak freezes left, thus
              //    losing their streak.
              const ONE_DAY_MILL = 24 * 60 * 60 * 1000;
              const yesterday = actualDate - ONE_DAY_MILL;
              userData[i].streakDate = new Date(yesterday);
            } else {
              // if your streak is not zero, then send this message
              if (userData[i].streak !== 0) {
                streakChannel.send(
                  `<@${newMember.id}> You lost your ${userData[i].streak} day streak! Try to gain it back!`,
                );
              }

              userData[i].streak = 0;
              userData[i].streakFreeze = 0;
            }
          }

          setTimeout(() => {
            // Read userData again
            if (fs.existsSync('userData.json')) {
              const jsonString = fs.readFileSync('userData.json', 'utf8');
              userData = JSON.parse(jsonString);
            }

            const checkAgain = new Date().toDateString()
              === new Date(userData[i].streakDate).toDateString();

            if (userData[i].inVoiceChannel) {
              // Check again in case someone leaves and enters and leaves and enters again
              if (!checkAgain || userData[i].firstStreak) {
                userData[i].firstStreak = false;
                userData[i].streak += 1;
                // Update max score
                if (userData[i].streak > userData[i].maxStreak) {
                  userData[i].maxStreak = userData[i].streak;
                }

                // Update streak freeze
                if (userData[i].streak % 7 === 0) {
                  userData[i].streakFreeze += 1;
                  streakChannel.send(
                    `<@${newMember.id}> Good work! You've maintained your streak for a week so you've been given a streak freeze!\n\`You have ${userData[i].streakFreeze} streak freezes\`\n-`,
                  );
                }

                streakChannel.send(
                  `<@${newMember.id}> Your **Grind Streak** has increased!\n\`Current Streak: ${userData[i].streak}\`\n\`Max Streak: ${userData[i].maxStreak}\`\n\nKeep up the good work :).`,
                );
                // Change the streak date to the current date
                userData[i].streakDate = new Date();
                // Update user data
                saveData(userData);
              }
            }
          }, minute * 12);
        }
      }
    }

    // Overall save data
    saveData(userData);

    // If user leaves voice channel
  } else if (
    oldUserChannel === grindTimeVC
    && newUserChannel !== grindTimeVC
    && !isBeef
  ) {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].userID === newMember.id) {
        userData[i].inVoiceChannel = false;

        // TIME TRACKER
        const endTime = new Date();
        const timeDif = Math.floor(endTime - new Date(userData[i].enterTime));
        const sessionTime = getTimeDifference(timeDif);

        // DAY TRACKER
        userData[i].dayTrackerTime += timeDif;
        const dayTime = getTimeDifference(userData[i].dayTrackerTime);

        // WEEK TIME TRACKER
        userData[i].weekTime += timeDif;

        // MONTHLY TIME TRACKER
        userData[i].monthlyTime += timeDif;

        // SEASONAL TIME TRACKER
        userData[i].seasonTime += timeDif;

        // TOTAL TIME TRACKER
        userData[i].totalTime += timeDif;

        accountabilityChannel.send(
          `<@${newMember.id}> You have grinded for \`${sessionTime[0]} hour(s), ${sessionTime[1]} minute(s) and ${sessionTime[2]} second(s)\` in **Grind Time**!\n\nThis comes to a total of \`${dayTime[0]} hour(s), ${dayTime[1]} minutes(s), and ${dayTime[2]} second(s)\` grinded **Today**!`,
        );
        // ========================================================
        // SEASONAL ADDING ROLES
        // ========================================================
        // Give role to member at a certain number of hours
        // We'll be using seasonal data here
        //
        // If user leaves and their seasonTime is a certain time, then give role
        // Assign role based on string
        const seasonTime = getTimeDifference(userData[i].seasonTime);
        const seasonHours = seasonTime[0];

        // Get the rank info
        const userRankInfo = getRankInfo(seasonHours);
        const [rankThreshold, rankName, logicalKey, roleID, rankMessage] = userRankInfo;
        const roleAdd = oldMember.guild.roles.cache.get(roleID);
        // Find if member already has the selected role
        const hasRole = oldMember.member.roles.cache.some(
          (r) => r.id === roleID,
        );

        // Only send message, add role, and remove unnecessary roles
        // if user doesn't already have role
        if (!hasRole) {
          // Get rid of all roles
          const rankIDs = ranks.map((rankInfo) => rankInfo[3]);
          rankIDs.forEach((rankID, q) => {
            // Make sure it doesn't use the impossible rank
            if (q !== rankIDs.length - 1) {
              const removeRole = newMember.guild.roles.cache.get(rankID);
              newMember.member.roles.remove(removeRole).catch(console.error);
            }
          });

          // add rank role based on hours
          oldMember.member.roles.add(roleAdd).catch(console.error);
          // send rank message
          const rankMessageDisplay = `<@${userData[i].userID}> - You're rank increased!\n\n`;
          announcementsChannel.send(rankMessageDisplay);
          announcementsChannel.send(
            rankMessage(userData[i].userName, userData[i].userID),
          );
        }

        // Save data on leave
        saveData(userData);
      }
    }
  }
});

// Record time in voice channel
client.on('voiceStateUpdate', (oldMember, newMember) => {
  const newUserChannel = newMember.channelID;
  const oldUserChannel = oldMember.channelID;
  // Record time in grind time and hard mode
  const voiceChannelID1 = '822696684139315261';
  const voiceChannelID2 = '787354978523545634';
  // Enter channel id
  const enterChannelID = '817298113169195029';
  const finishedTutorialRole = '793538214396690442';
  // Other
  const textChannel = client.channels.cache.get('821951428717183006');
  const currentlyGrindingRole = '788248531927695421';

  // Assign Finished Tutorial Role on Enter
  if (newUserChannel === enterChannelID && oldUserChannel !== enterChannelID) {
    const role = oldMember.guild.roles.cache.get(finishedTutorialRole);
    oldMember.member.roles.add(role).catch(console.error);
    setTimeout(() => {
      newMember.setChannel(null);
    }, 5000);
  }

  // Record time in voice channel
  // If user enters voice channel
  if (
    newUserChannel === voiceChannelID1
    && oldUserChannel !== voiceChannelID1
  ) {
    newMember.voiceTime1 = new Date();

    // If user leaves voice channel
  } else if (
    oldUserChannel === voiceChannelID1
    && newUserChannel !== voiceChannelID1
  ) {
    const endTime = new Date();
    const timeDif = Math.floor(endTime - newMember.voiceTime1);
    const hrs = Math.floor(timeDif / (3600 * 1000));
    const min = Math.floor((timeDif % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((timeDif % (1000 * 60)) / 1000);

    textChannel.send(
      `<@${newMember.id}> You have grinded for \`${hrs} hour(s), ${min} minute(s) and ${sec} second(s)\` in **Hard Mode**!`,
    );
  }

  if (
    newUserChannel === voiceChannelID2
    && oldUserChannel !== voiceChannelID2
  ) {
    newMember.voiceTime2 = new Date();

    // Add currently grinding role
    const role = oldMember.guild.roles.cache.get(currentlyGrindingRole);
    oldMember.member.roles.add(role).catch(console.error);
  } else if (
    oldUserChannel === voiceChannelID2
    && newUserChannel !== voiceChannelID2
  ) {
    // Remove currently grinding role
    const role = newMember.guild.roles.cache.get(currentlyGrindingRole);
    newMember.member.roles.remove(role).catch(console.error);
  }
});

// Real working hard mode system
// client.on('voiceStateUpdate', (oldMember, newMember) => {
// 	const newUserChannel = newMember.channelID;
// 	const oldUserChannel = oldMember.channelID;
// 	const voiceChannelID = '822696684139315261';
// 	const textChannel = client.channels.cache.get('821951428717183006');
// 	const minuteTime = 1000 * 60;
//
// 	if (
// 		newMember.id === '234395307759108106'
//     || newMember.id === '811422368752336936'
// 	) {} else if (newMember.channelID === voiceChannelID) {
// 		// Don't remove ""
// 		// User Joins a voice channel
// 		if (
// 			newUserChannel === voiceChannelID
//       && oldUserChannel !== voiceChannelID
// 		) {
// 			// Camera and screenshare logic
// 			setTimeout(() => {
// 				if (
// 					newMember.selfVideo === true
//           || newMember.streaming === true
//           || (oldUserChannel === voiceChannelID
//             && newUserChannel !== voiceChannelID)
// 				) {} else if (
// 					(newMember.selfVideo === false
//             && newMember.channelID === voiceChannelID)
//           || (newMember.streaming === false
//             && newMember.channelID === voiceChannelID)
// 				) {
// 					textChannel.send(
// 						`<@${newMember.id}> Hey, I noticed that you're in hard mode but you haven't put on cams or screen-shared for the past **2 minutes**. You have another **2 minutes** to do that or you will get moved to AFK/Break!`,
// 					);
// 					setTimeout(() => {
// 						if (
// 							newMember.selfVideo === true
//               || newMember.streaming === true
//               || (oldUserChannel === voiceChannelID
//                 && newUserChannel !== voiceChannelID)
// 						) {} else if (
// 							(newMember.selfVideo === false
//                 && newMember.channelID === voiceChannelID)
//               || (newMember.streaming === false
//                 && newMember.channelID === voiceChannelID)
// 						) {
// 							newMember.setChannel('817111025819975700');
// 							textChannel.send(
// 								`<@${newMember.id}> You've been kicked due to no cams or screensharing. Make sure to turn on cams when joining this VC or it will happen again!`,
// 							);
// 						}
// 					}, minuteTime * 2);
// 				}
// 			}, minuteTime * 2);
//
// 			// User is in channel
// 		} else if (
// 			(newMember.streaming === false
//         && oldMember.selfVideo === true
//         && oldMember.streaming === true)
//       || (newMember.selfVideo === false
//         && oldMember.selfVideo === true
//         && oldMember.streaming)
// 		) {} else if (
// 			(newMember.selfVideo === false && oldMember.selfVideo === true)
//       || (newMember.streaming === false
//         && oldMember.streaming === true
//         && oldMember.selfVideo === false)
// 		) {
// 			setTimeout(() => {
// 				if (
// 					newMember.selfVideo === true
//           || newMember.streaming === true
//           || (oldUserChannel === voiceChannelID
//             && newUserChannel !== voiceChannelID)
// 				) {} else if (
// 					oldMember.channelID === voiceChannelID
//           && newMember.channelID === voiceChannelID
// 				) {
// 					textChannel.send(
// 						`<@${newMember.id}> Hey! It's been **3 minutes** since you turned off cam or stopped screensharing, please turn it back on or you will be **kicked** in the next **two minutes** to the AFK/Break channel!`,
// 					);
// 					setTimeout(() => {
// 						if (
// 							newMember.selfVideo === true
//               || newMember.streaming === true
//               || oldMember.channelID !== voiceChannelID
// 						) {} else if (
// 							newMember.selfVideo === false
//               || newMember.streaming === false
// 						) {
// 							textChannel.send('Sorry, you were kicked!');
// 							newMember.setChannel('817111025819975700');
// 						}
// 					}, minuteTime * 2);
// 				}
// 			}, minuteTime * 3);
// 		}
// 	} else if (
// 		oldUserChannel === voiceChannelID
//     && newUserChannel !== voiceChannelID
// 	) {
// 		// User leaves a voice channel
//
// 	}
// });

client.login(config.token);

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
    const seasonRanks = [];
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

      // If user hasn't grinded this season then not in rankings
      const oldSeasonData = new Date(userDatum.seasonDate);
      if (isThisSeason(oldSeasonData, currentDate)) {
        seasonRanks.push([
          userDatum.userID,
          userDatum.seasonTime,
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
    const sortedSeasonRanks = sortRanks(seasonRanks);
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

          const statsString = `${time[0]} hrs, ${time[1]} mins: <@${displayInfo[3]}>`;

          // Check to see if hours and minutes are 0 and don't display
          if (displayInfo) {
            let displayString = `\`# ${displayInfo[1]}.\` ${statsString} \n\n`;

            // Grabs the user
            if (displayInfo[3] === userID) {
              displayString = `\`# ${displayInfo[1]}.\` **${statsString}** **<<**\n\n`;
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
      case '-s':
        leaderboardStr = displayLeaderboard(sortedSeasonRanks);
        title = 'Seasonal Leaderboard';
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

// People comments
client.on('message', (message) => {
  // Move voice channel code
  if (message.author.bot === false) {
    if (message.content.includes('?afk')) {
      message.channel.send(
        "I've sent you to the AFK zone, have fun on your break!",
      );
      message.guild
        .member(message.author.id)
        .voice.setChannel('817111025819975700');
    }

    if (message.content === '?grind') {
      message.channel.send(
        'Order received, you have been moved to Grind Time.',
      );
      message.guild
        .member(message.author.id)
        .voice.setChannel('787354978523545634');
    }
    // Display Leaderboard at current user position
    switch (message.content.toLowerCase()) {
      case '-d':
        message.channel.send(displayLeaderboardFunction(message, '-d', false));
        break;
      case '-w':
        message.channel.send(displayLeaderboardFunction(message, '-w', false));
        break;
      case '-m':
        message.channel.send(displayLeaderboardFunction(message, '-m', false));
        break;
      case '-s':
        message.channel.send(displayLeaderboardFunction(message, '-s', false));
        break;
      case '-t':
        message.channel.send(displayLeaderboardFunction(message, '-t', false));
        break;
      case 'leaderboard':
        message.channel.send(
          'To view **your current position** on the leaderboard please type:\n'
            + '`-d` for the Daily Leaderboard\n'
            + '`-w` for the Weekly Leaderboard\n'
            + '`-m` for the Monthly Leaderboard\n'
            + '`-s` for the Seasonal Leaderboard\n'
            + '`-t` for the All-time Leaderboard\n\n'
            + 'To view the **Top 20 leaderboards** please type:\n'
            + '`top -d` for the Daily Leaderboard\n'
            + '`top -w` for the Weekly Leaderboard\n'
            + '`top -m` for the Monthly Leaderboard\n'
            + '`top -s` for the Seasonal Leaderboard\n'
            + '`top -t` for the All-time Leaderboard\n\n',
        );
        break;
    }
    // Display Top 20 Leaderboard
    switch (message.content) {
      case 'top -d':
        message.channel.send(displayLeaderboardFunction(message, '-d', true));
        break;
      case 'top -w':
        message.channel.send(displayLeaderboardFunction(message, '-w', true));
        break;
      case 'top -m':
        message.channel.send(displayLeaderboardFunction(message, '-m', true));
        break;
      case 'top -s':
        message.channel.send(displayLeaderboardFunction(message, '-s', true));
        break;
      case 'top -t':
        message.channel.send(displayLeaderboardFunction(message, '-t', true));
        break;
    }

    // ==================================================================
    // User Profile Display
    if (message.content.toLowerCase() === 'grind profile') {
      // Read file data
      const userID = message.guild.member(message.author.id).user.id;
      if (fs.existsSync('userData.json')) {
        const jsonString = fs.readFileSync('userData.json', 'utf8');
        const userData = JSON.parse(jsonString);
        let userExists = userData.length;
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
        const seasonRanks = [];
        const totalRanks = [];
        for (const userDatum of userData) {
          // if user hasn't grinded today then not in rankings
          const userGrindToday = new Date(userDatum.dayTrackerDay);
          const checkGrindedToday = now.toDateString() === userGrindToday.toDateString();
          if (checkGrindedToday) {
            dayRanks.push([userDatum.userID, userDatum.dayTrackerTime]);
          }

          // if user hasn't grinded this week then not in rankings
          const weekDay = new Date(userDatum.weekTracker);
          const weekTrackerCheck = isThisWeek(weekDay);
          if (weekTrackerCheck) {
            weekRanks.push([userDatum.userID, userDatum.weekTime]);
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
            monthRanks.push([userDatum.userID, userDatum.monthlyTime]);
          }

          // If user hasn't grinded this season then not in rankings
          const oldSeasonData = new Date(userDatum.seasonDate);
          if (isThisSeason(oldSeasonData, currentDate)) {
            seasonRanks.push([userDatum.userID, userDatum.seasonTime]);
          }

          // push total time grinded
          totalRanks.push([userDatum.userID, userDatum.totalTime]);
        }

        const sortedDayRanks = sortRanks(dayRanks);
        const sortedWeekRanks = sortRanks(weekRanks);
        const sortedMonthRanks = sortRanks(monthRanks);
        const sortedSeasonRanks = sortRanks(seasonRanks);
        const sortedTotalRanks = sortRanks(totalRanks);
        // ================================

        for (const userDatum of userData) {
          if (userDatum.userID === userID) {
            userExists -= 1;
            // Implement, time left till streak ends
            const actualDate = new Date();
            const dateToCheck = new Date(userDatum.streakDate);
            const timeDiff = 48 * 60 * 60 * 1000 - (actualDate - dateToCheck);
            const streakTimeLeft = getTimeDifference(timeDiff);
            const day = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

            // Tells user how much time they have left on streak
            let showStreak = userDatum.streak;
            userDatum.timeLeft = timeDiff > 0
              ? `${streakTimeLeft[0]} hrs, ${streakTimeLeft[1]} mins, ${streakTimeLeft[2]} secs`
              : `You've been gone for ${-day} day(s), maybe a streak freeze can save it?`;

            // If the user is gone for a long time and pulls up profile, current streak
            // will display ??
            if (timeDiff <= 0) {
              showStreak = '??';
            }

            // If they've completed the streak in the past
            // 24 hours and it's the same day, then they've
            // Completed their streak
            const timeLeftDayCheck = actualDate.toDateString() === dateToCheck.toDateString();
            if (streakTimeLeft[0] > 23 && timeLeftDayCheck) {
              userDatum.timeLeft = "You've completed your streak for the day!";
            }

            if (userDatum.firstStreak === true) {
              userDatum.timeLeft = "Hasn't started a streak yet.";
            }

            // If a new day and haven't grinded today yet
            // Then display 'haven't grinded yet today

            const userGrindToday = new Date(userDatum.dayTrackerDay);
            const checkGrindedToday = actualDate.toDateString() === userGrindToday.toDateString();

            if (!checkGrindedToday) {
              userDatum.dayTrackerTime = 0;
            }

            // Display Total Time Grind Today
            const dayTime = getTimeDifference(userDatum.dayTrackerTime);
            const todayGrinded = `${dayTime[0]} hrs, ${dayTime[1]} mins`;

            // If a new week and haven't grinded today yet
            // Then display haven't grinded this week yet
            const weekDay = new Date(userDatum.weekTracker);
            const weekTrackerCheck = isThisWeek(weekDay);
            if (!weekTrackerCheck) {
              userDatum.weekTime = 0;
            }
            // Display Week Grind Time
            const weeklyTime = getTimeDifference(userDatum.weekTime);
            const weekGrinded = `${weeklyTime[0]} hrs, ${weeklyTime[1]} mins`;

            // If a new month haven't grinded today yet
            // Then display haven't grinded this month yet
            const oldMonthDate = new Date(userDatum.monthlyTracker);
            const oldMonth = oldMonthDate.getMonth();
            const oldYear = oldMonthDate.getFullYear();

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();

            const monthTrackerCheck = oldMonth === currentMonth && oldYear === currentYear;

            if (!monthTrackerCheck) {
              userDatum.monthlyTime = 0;
            }
            // Display Monthly Grind Today
            const monthlyTime = getTimeDifference(userDatum.monthlyTime);
            const monthGrinded = `${monthlyTime[0]} hrs, ${monthlyTime[1]} mins`;

            // If a new season haven't grinded today yet
            // Then display haven't grinded this month yet
            const oldSeasonData = new Date(userDatum.seasonDate);
            if (!isThisSeason(oldSeasonData, currentDate)) {
              userDatum.seasonTime = 0;
            }
            // Disp[lay Seasonal Grind Today]
            const seasonTime = getTimeDifference(userDatum.seasonTime);
            const seasonGrinded = `${seasonTime[0]} hrs, ${seasonTime[1]} mins`;

            // Display Total Grind Hours Overall
            const totalGrindTime = getTimeDifference(userDatum.totalTime);
            const totalGrinded = `${totalGrindTime[0]} hrs, ${totalGrindTime[1]} mins`;

            // Display AVERAGE time grinded per day for the month

            // got the milli difference from when month date was grabbed
            // to now
            const monthDifference = currentDate - oldMonthDate;
            // Calculate the days between months
            const daysBetween = Math.floor(monthDifference / (1000 * 60 * 60 * 24)) + 1;
            const dailyAverage = getTimeDifference(
              userDatum.monthlyTime / daysBetween,
            );

            const displayDailyAverage = `${dailyAverage[0]} hrs, ${dailyAverage[1]} mins`;

            // ================================================================
            // DISPLAY SUCH THAT IT DOESN'T MOVE EVERYTHING TO THE RIGHT
            // ================================================================
            // USE CASE for displaying Time Grinded in profile with too much characters
            const whiteSpaceBA = (variable, string, rank) => {
              const defVarLength = 13;
              const needsChange = defVarLength !== variable.length;
              const test = string.split(' ');
              // BEFORE IS THE AMOUNT OF WHITESPACES BEFORE
              function whiteSpaceCount(array, start) {
                let before = 0;
                let i = start;
                let notFound = true;
                while (notFound && i < array.length) {
                  const current = array[i];
                  const next = array[i + 1];

                  if (!current) {
                    before += 1;
                  } else if (current && next) {
                    notFound = false;
                  }
                  i += 1;
                }
                // we plus 1 because the split only counts the white space after
                // the first white space
                return before + 1;
              }

              let before = whiteSpaceCount(test, 0);

              // AFTER IS THE AMOUNT OF WHITESPACE AFTER
              // find where we start
              const varArrLen = variable.split(' ').length;
              // plus one doesn't matter since we start at 0
              const afterStart = varArrLen + before;
              const after = whiteSpaceCount(test, afterStart);

              if (needsChange) {
                // count whitespace before today Grinded
                // USE before
                // count whitespace after today Grinded
                // USE after

                const difference = variable.length - defVarLength; // 1 or 2
                // Subtract the difference from before
                // no need to add difference to after because the number char
                // is increasing by one anway
                before -= difference;

                // Take the first word of array test
                const filteredArray = [test[0]];

                // Add new amount of white space after first word
                for (let i = 0; i < before; i += 1) {
                  filteredArray.push(' ');
                }
                // add time grinded variable
                filteredArray.push(variable);

                // Add new amount of white space before second last word
                for (let i = 0; i < after; i += 1) {
                  filteredArray.push(' ');
                }
                // add placement variable
                filteredArray.push(`# ${rank}`);

                // join the array
                // Return the new string
                return filteredArray.join('');
              }
              return string;
            };

            // ==================================================================

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

            // ============================================================
            // GET THE RANKING OF EACH TIME FRAME - CONTINUED
            // ============================================================
            // get user rank
            const getRank = (rankArray) => {
              const [getUser] = rankArray.filter(
                (user) => user[0] === userDatum.userID,
              );
              if (getUser) {
                return getUser[2];
              }
              return 'NA';
            };
            getRank(sortedDayRanks);

            const userDayRank = getRank(sortedDayRanks);
            const userWeekRank = getRank(sortedWeekRanks);
            const userMonthRank = getRank(sortedMonthRanks);
            const userSeasonRank = getRank(sortedSeasonRanks);
            const userTotalRank = getRank(sortedTotalRanks);

            // ================================================================
            // Strings to display
            const dayString = `Daily:             ${todayGrinded}         # ${userDayRank}`;
            const dayDisplay = whiteSpaceBA(
              todayGrinded,
              dayString,
              userDayRank,
            );
            const weekString = `Weekly:            ${weekGrinded}         # ${userWeekRank}`;
            const weekDisplay = whiteSpaceBA(
              weekGrinded,
              weekString,
              userWeekRank,
            );
            const monthString = `Monthly:           ${monthGrinded}         # ${userMonthRank}`;
            const monthDisplay = whiteSpaceBA(
              monthGrinded,
              monthString,
              userMonthRank,
            );
            const seasonString = `Seasonal:          ${seasonGrinded}         # ${userSeasonRank}`;
            const seasonDisplay = whiteSpaceBA(
              seasonGrinded,
              seasonString,
              userSeasonRank,
            );
            // Display rank with title
            const rankID = getRankInfo(seasonTime[0])[3];
            const userProfile = new Discord.MessageEmbed()
              .setColor('#8B0000')
              .setTitle(
                `${userDatum.userName}\n\nYour Personal Grind Statistics`,
              )
              // If the length of the todayGrinded variable inreases by one
              // then we take out a white space before it and add it after it
              // Make a function that does this
              .setDescription(
                `Current Rank | <@&${rankID}>`
                  + '```'
                  + 'Time Frame          Time Grinded         Ranking\n'
                  + '----------          ------------         -------\n'
                  + `${dayDisplay}\n`
                  + `${weekDisplay}\n`
                  + `${monthDisplay}\n`
                  + `${seasonDisplay}\n\n`
                  + `Daily Average (${monthNames[currentMonth]}): ${displayDailyAverage}`
                  + '```---',
              )
              .addFields(
                {
                  name: 'Current Streak',
                  value: `\`\`\`${showStreak}\`\`\``,
                  inline: true,
                },
                {
                  name: 'Max Streak',
                  value: `\`\`\`${userDatum.maxStreak}\`\`\``,
                  inline: true,
                },
                {
                  name: 'Streak Freezes',
                  value: `\`\`\`${userDatum.streakFreeze}\`\`\``,
                  inline: true,
                },

                {
                  name: 'Time Until Lost Streak',
                  value: `\`\`\`${userDatum.timeLeft}\`\`\``,
                },
              );

            // COMING SOON WITH POINTS AND STORE SYSTEM
            // .setImage(
            //   'https://cdn.discordapp.com/attachments/793302883511959613/920142893627346984/ezgif.com-gif-maker.gif',
            // );
            message.channel.send(userProfile);
          }
        }

        if (userExists === userData.length) {
          message.channel.send(
            "We don't have any information on you at the moment!",
          );
        }
      } else {
        message.channel.send(
          "We don't have any information on you at the moment!",
        );
      }
    }
  }

  let computerOptions = [];
  const randomObject = {
    Wake: 'Imagine not sleeping LULW',
  };
  switch (message.content) {
    case 'Christina':
    case 'christina':
    case 'CHRISTINA': {
      const christinaEmbed = new Discord.MessageEmbed()
        .setColor('#90ee90')
        .setTitle('The Bedbug')
        .setDescription(
          'A creature known to occupy the habitat known as the "Bedroom". This fascinating creature does not set a foot off the bed; in a perpetual state of lying down. This creature is known to have found a loop hole to the Grinding arithmetic. Able to gain levels while doing nothing. Essentially a bug in the system!',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Christeenie``` - *princess of the Fragul Tribe, in the world of Tona*',
          },
          {
            name: 'Class',
            value:
              '```Forest Fairy (Healer)``` - *Escaped from her own realm to explore the mysteries of our world. Resilient and sharp, with a mind that can pierce through problems, and a tongue that can cut through people.*',
          },
          { name: 'Strength', value: '```5```', inline: true },
          { name: 'Magic', value: '```30```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/804095808634355762/forestFairy.jpg',
        );
      computerOptions = [christinaEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Nolan':
    case 'nolan':
    case 'Lord Nolan':
    case 'NOLAN': {
      const nolanImbed = new Discord.MessageEmbed()
        .setColor('#C0C0C0')
        .setTitle('The Silent Sky')
        .setDescription(
          `Open and all encompassing. A being that can accomodate many things and people. Throw a rock at the sky and there is no ripples. Though there may be long nights and rainy days, the sun will always rise up again.

            A deep and philosophical creature once you get get to know it. A people pleaser, sometimes a pushover, but one of the **kindest and compassionate creatures known in existence**. Do not be afraid to share your stories with it, for this creature is understanding. 
        
            It can be found either on a red chair or the couch, where it is usually seen with a book in hand or a game controller. For reference, a snapshot of this creature can be found in <#793591458656813066> where you may witness it on the hunt for better grades (red sweater)`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              "```Null``` - *Travelling through many worlds and many millenia. He has already forgotten his name...his past. His only purpose is to continue to raise the dead. For what? Even he doesn't know...*",
          },
          {
            name: 'Class',
            value:
              '```Abyssal Necromancer``` - *Allies rise up and join you again to celebrate a new day, only to stab you in the back and drag you down...down back into the abyss.*',
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Darkness', value: '```30```', inline: true },
          { name: 'Wisdom', value: '```10```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/804518654917214278/37182850275_63c04ccc22_c.jpg',
        )
        .setFooter('An Honorary Member of the Grind Time server');
      computerOptions = [nolanImbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Rodeem':
    case 'rodeem':
    case 'ro':
    case 'Ro':
    case 'RO':
    case 'RODEEM': {
      const rodeemEmbed = new Discord.MessageEmbed()
        .setColor('#000000')
        .setTitle('The Gentle Giant')
        .setDescription(
          `A gigantic monstrous beast of a creature. The only word that can be used to describe it is **"deezed"**. Passionate and kind, there is basically no way for anyone to dislike it. One of the most supportive creatures I've ever met in my life, nothing can go wrong with befriending this one. 
            
        It can usually be found grinding a shit game online (DOTA 2) or a shit game in real life (Football (jk, I love Football)). If not, then it is banging its head on its keyboard trying to figure out discord code.
        
        For reference, a snapshot of this creature can be found in <#793591458656813066>. Whether the creature is sleeping or studying...we have yet to find out (yellow sweater)`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Rodelius the Damned``` - *soul-bound...formless...from the depths...and the darkness*',
          },
          {
            name: 'Class',
            value:
              '```Dark Knight``` - *A tanky spell caster, able to handle hits and deal devastating damage*',
          },
          { name: 'Strength', value: '```15```', inline: true },
          { name: 'Magic', value: '```20```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/804100247734583307/rsz_21rsz_dark_knight.png',
        )
        .setFooter('An Honorary Member of the Grind Timer server.');

      computerOptions = [rodeemEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Sadeed':
    case 'sadeed':
    case 'ilmun':
    case 'Ilmun':
    case 'DetectiveBongHits': {
      const sadeedImbed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle('The Shield')
        .setDescription(
          `Though sometimes coming off as passive, this person really tries to protect and accomdoate everyone around him. Sometimes at the expense of himself. But hey, that's just one of the side-effects of being a super-hero. 

            This creature is known to be fighting crime late in the depths of the night...unable to answer phone calls or text messages. Sometimes going so far as to ask something and then never respond to the reply. In essence, a big gawd dam gandoo. 
            
            Known to be very passive in every situation. If you bug it, it will actually blame itself for allowing you to do it! However, this creature is a real hero. The first one to come over when there is a cry for help. You can be sure that when you need something, this creature will help you no matter what. With a heart made of gold. `,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Sad-no-more (Sadude)``` - *After witnessing the evils and vices from the world, Sadude went on a rampage, purging the world of all villains for as long as it takes. To the villains, he is known as the infamous "Sadude", but for the common citizen, they say as long as he is near, you will be "Sad-no-more".*',
          },
          {
            name: 'Class',
            value:
              '```Arcane Trickster``` - *a class with high speed and damage, with mystifying abilities; able to trick and confuse the enemy before going in for the kill*',
          },
          { name: 'Strength', value: '```20```', inline: true },
          { name: 'Dexterity', value: '```25```', inline: true },
          { name: 'Constitution', value: '```5```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/832461074632671282/Trickery_by_John_Constantine.jpg',
        )
        .setFooter('Also known as a gandoo kid');
      computerOptions = [sadeedImbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Miran':
    case 'miran': {
      const miranEmbed = new Discord.MessageEmbed()
        .setColor('#000080')
        .setTitle('The Thinker')
        .setDescription(
          `Can often be found contemplating about the meaning of life.

            A creature known to value its friendships and relationships very much. Solid in its core values and beliefs, it is the type of creature to straight forwardly tell you what it's thinking with no strings attached. If I would ever need someone to rely on for something, I would gladly put my life in its hands. 
            
            **The following excerpt is quoted from Jay**: "Miran is literally a father figure to me but will straight up tell a girl he’s talking to that he would want to marry a female version of me :skull: so he’s also a little Alabama"`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Kinshot``` - *He spent most of his life studying the practical arts of human movement, anatomy and osteology. He became so proficient that others mistook him for a Doctor...however the truth is, he studied it to further his craft on the one-shot kill. Others know this deadly figure as "Deadshot", however he prefers to be called "Kinshot".*',
          },
          {
            name: 'Class',
            value:
              '```Golden-Eye Archer``` - *Similar to a sniper, this class prides itself on the one-shot kill. People also refer this class to the "predator" because these archers lay in wait for long periods of time for the perfect shot. With an eagle\'s golden eye, these archers can shoot from several miles away.*',
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Dexterity', value: '```20```', inline: true },
          { name: 'Intellect', value: '```20```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/832001039360065536/cool_archer.jpg',
        )
        .setFooter('Gandoo ass kid');

      computerOptions = [miranEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Jay':
    case 'jay':
    case 'Jayant':
    case 'jayant':
    case 'MemeSupremeJay': {
      const jayEmbed = new Discord.MessageEmbed()
        .setColor('#7894be')
        .setTitle('The Sentimental')
        .setDescription(
          `A creature with high self reflection, internal diolgue, and emotional quotient. A loving character; though at times a little slow (with eating), once you get to know it, it will be your life-long friend. It is very easy to build a connection with it.

            This creature is known to hop in and out of voice channels randomly. Look out, because you might be able to spot it one day!
            
            **Background Info**: *This man once went to an IMAX theatre to watch a movie. He then went to one of the employees and asked them to turn down the volume weirdCHAMP*`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Giant``` - *The Titan Giant tribe was thought to be extinct once they were exiled into the void by the Great Wizard of Gatulan. And they were partially true, however instead of all dying, they learned to utilize the mysteries of the void to help them survive. The best knight of the Titan Giant Tribe is picked as the guardian warrior of the tribe. That knight then changes their name, to be known simply as **The Giant***',
          },
          {
            name: 'Class',
            value:
              "```Void Knight``` - *After being exiled into the void, the Titan Giant tribe's scholars were able to decipher a little bit of the mysteries of the void. They used this power and embued it into the best knight in the whole tribe. Void Knights are able to create vortexes in battle in combination with their high strength and constitution.*",
          },
          { name: 'Strength', value: '```20```', inline: true },
          { name: 'Intellect', value: '```5```', inline: true },
          { name: 'Constitution', value: '```25```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/835347185284415488/VoidKnightGiant.jpg',
        )
        .setFooter('OG KIN BOY');
      computerOptions = [jayEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Liam':
    case 'liam': {
      const liamEmbed = new Discord.MessageEmbed()
        .setColor('#623120')
        .setTitle('The Blazing')
        .setDescription(
          `Like a bright sun illuminating the night sky. Travelling like a shooting star towards a great and exciting unknown. Leaving darkness in the dusk; supporting the many creatures that rely on its warmth and sunlight.

            On the surface, this creature may seem like a dumbass, in fact, it may seem like it doesn't have a clue of what's going on. Happy go lucky so to speak. However, the deeper you get to know it, you find out that it is one of the most intellectually and emotionally aware creature there is. 
            
            Draws a clear line between work and play, it is one of the most hard working creatures there is to man. Though it may not know it; I have grown so much interacting with this creature. I am honestly grateful for having such a different a unique person in my life. I've never met anyone like you before.
            
            **Quote**: *If I could choose a world where pessimism doesn't exist, and the only thing that drives people is optimism; I would do it.*`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Light-Man D``` - *Usually going by the nickname "D", he was one of the first Lightmans to travel to Grandune. Actually, he was exciled by the Lightman King because he refused to kill an innocent alien creature. The creature turned out to be a human girl from Grandune, in which he helped her return. However, he became enamored by the wonders and life of Grandune that he decided to stay. He is often seen playing pranks and saying jokes where-ever he goes.*',
          },
          {
            name: 'Class',
            value:
              "```Court Jester``` - *A unique and one-of-a-kind class. After a failed attempt to make the Lightman King laugh, the King abolished all Jesters from the Lighman world. Thus, there is only one Jester alive. This class doesn't really have any abilities...though they tend to be very lucky.*",
          },
          { name: 'Strength', value: '```-5```', inline: true },
          { name: 'Luck', value: '```60```', inline: true },
          { name: 'Constitution', value: '```-5```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/833471930597507072/Jester.jpg',
        )
        .setFooter('A fellow Tenor 2 Buddy :)');
      computerOptions = [liamEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'Noyan':
    case 'noyan':
    case 'Noyano': {
      const noyanEmbed = new Discord.MessageEmbed()
        .setColor('#C0C0C0')
        .setTitle('The Versatile')
        .setDescription(
          `All-rounded; able to do anything and everything that he puts his mind to. With a wide skill-set; all-encompassing. A hard-working and talented individual. 

            One of the easiest creatures to talk and connect with. Intellectually adept and socially aware. Is able to detect if you don't want to talk and will give you space. You will have a natural tendency to help this creature because you know that in your time of need, it's got your back, no questions asked.
            
            Perhaps addicted to playing games, however once it gets to work and has its motivation, it can grind out long hours easily. Has a genetically gifted superior physique, but above all, a **high quality perseverence and ability to withstand punishment**.`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Reaper``` - *An evil world. A mad world. Apocolyptic in nature. After a war between superpowers, his world descended into madnesss. The resistance crippled and destroyed, ruled over by the Tyrant King of Norvack. The Reaper came to restore order to the world, coming and going like a ghost, laying judgement on the sinful.*',
          },
          {
            name: 'Class',
            value:
              '```Night Warlock``` - *Powers bolstered in the night. Not much is known about this class other than the sheer power within its capabilities. Some say it has the potential to destroy worlds.*',
          },
          { name: 'Strength', value: '```??```', inline: true },
          { name: 'Magic', value: '```50```', inline: true },
          { name: 'Intellect', value: '```??```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/833148256267665408/Warlock_Noyan.jpg',
        )
        .setFooter('You gawd dam gandoo kid');

      computerOptions = [noyanEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'David':
    case 'david':
    case 'Cow':
    case 'KingCao':
    case 'DAVID':
    case 'cow': {
      const davidEmbed = new Discord.MessageEmbed()
        .setColor('#FFA500')
        .setTitle('Cow')
        .setDescription('Owner of the server...also not a bitch')
        .addFields(
          {
            name: 'Name',
            value:
              "```Sir Cownelius Maximus``` - *Wielder of Heaven's Shield, the divine artifact known to protect entire cities when imbued with holy energy*",
          },
          {
            name: 'Class',
            value:
              '```Paladin``` - *A meatball of a man who primarily seeks to build up his allies*',
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Constitution', value: '```35```', inline: true },
          { name: 'Intellect', value: '```5```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/787654137352683521/803413971146506260/9la3cag4i1n01.png',
        )
        .setFooter(
          "If this man is not Grinding then call him out. Don't let him be a bitch.",
        );
      computerOptions = [davidEmbed];
      const computerNumber = Math.floor(Number(Math.random()));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'William':
    case 'william':
    case 'will':
    case 'Will': {
      const williamEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setTitle('The Harnesser')
        .setDescription(
          `If you attend the Grind Time regularly, you may be able to see this creature bobbing and swaying to the beat of an epic orchestral song! Don't be fooled! This isn't a show of awkward dancing but a way for him to channel the forces of the world!
        
            A man able to harness the powers of music, art, spirit, and soul. An asset to any Grinder party, he has the ability to wipe out hordes of monsters!`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Red Will``` - *his body is a santuary, his home is his soul*',
          },
          {
            name: 'Class',
            value:
              '```Dragon Knight``` - *The righteous knight with a dark past, seeking to regain his honour and reclaim his place among the sacred dragon knights faction.*',
          },
          { name: 'Strength', value: '```25```', inline: true },
          { name: 'Constitution', value: '```10```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/803476021629812746/1418db9e62adcf32fa0727c699bcdf98.png',
        );

      message.channel.send(williamEmbed);

      break;
    }

    case 'Suzy':
    case 'suzy': {
      const suzyEmbed = new Discord.MessageEmbed()
        .setColor('#FFC0CB')
        .setTitle('The Rose')
        .setDescription(
          `Thorny at first glance, it seems like she would be hard to touch. However peeling back the thorns reveal a beautiful rose. Sweet and gentle on the inside but tough and intimidating on the outside. Watch out, because if your not protected within her thorns, then your getting hit by it!
        
            Can usually be seen giving a disapproving gaze. She doesn't yet know it, but she's been secretly recruited into a cult that is impossible to leave...`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Professor Sprout``` - *Coming back to a home ransacked by monsters, she abandoned her job as a professor and took up her family trade as a huntress, vowing to seek veangance on any monster that she sees*',
          },
          {
            name: 'Class',
            value:
              '```Tempest Ranger``` - *lithe and agile while dealing devastating piercing damage to her foes, charging through head on like a rampaging tornado*',
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Dexterity', value: '```20```', inline: true },
          { name: 'Intellect', value: '```20```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/804093581995671582/epic_huntress.jpg',
        );

      message.channel.send(suzyEmbed);

      break;
    }

    case 'Justin':
    case 'justin': {
      const justinEmbed = new Discord.MessageEmbed()
        .setColor('#FFFF00')
        .setTitle(':monkey: **I MUST RETURN TO MONKE** :monkey:')
        .setDescription(
          ` A rare phenomenon. Nothing can explain this rare breeded creature. An organism able to navigate the world through pure spinal cord interactions!
        
    `,
        )
        .addFields(
          {
            name: 'Name',
            value: '```BUNGA``` - *of Ungrunga; good at two hand hammer*',
          },
          {
            name: 'Class',
            value: '```Large Ape Warrior``` - *Big Hammer*',
          },
          { name: 'Strength', value: '```50```', inline: true },
          { name: 'Constitution', value: '```50```', inline: true },
          { name: 'Intellect', value: '```-50```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/805145337428705280/Webp.net-resizeimage_6.png',
        )
        .setFooter(
          "Can often be seen travelling the jungles searching for banana's.",
          'https://cdn.discordapp.com/attachments/793302938453803008/803842131310673940/Daco_518550.png',
        );

      message.channel.send(justinEmbed);

      break;
    }

    case 'Sahaj':
    case 'sahaj': {
      const sahajImbed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('The Philospher')
        .setDescription(
          `A chemist, planter, and apothecary. An indispensable member in any Grinder expedition. He has the ability to give +5 intellect to everyone in his party. 
    
        Can usually be found brewing potions for the next party asking for assistance.`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Soulhaj``` - *stepped out of a hidden society with a millenia of accumulated wisdom. Determined that he could find more valuable information in the real world, he sets out seeking more knowledge*',
          },
          {
            name: 'Class',
            value:
              "```Druid``` - *a plethora of skills under his arsenal, you don't know what he might throw at you next!*",
          },
          { name: 'Strength', value: '```5```', inline: true },
          { name: 'Intellect', value: '```25```', inline: true },
          { name: 'Wisdom', value: '```20```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/787654137352683521/803476053938143232/09e88e7eccec20737f8142683b4abd34.png',
        );

      message.channel.send(sahajImbed);

      break;
    }

    case 'Pauline':
    case 'pauline': {
      const paulineEmbed = new Discord.MessageEmbed()
        .setColor('#f9e5c4')
        .setTitle('The Apothecary')
        .setDescription(
          'Our local Nutritionist and ALES farmer. Able to provide foods that provide boosts to every specific stat available. Her knowledge spans from the most obscure plant in the forest to the most poisonous mushrooms in the bogs. ',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Goldfish``` - *Known as the most benevolent Queen of the Moon Kingdom, Goldfish seeks to travel across the stars and spread her knowledge over the vast universe. She however specializes in dietary knowledge*',
          },
          {
            name: 'Class',
            value:
              '```Starlight Cleric``` - *Since ancient times, stars have been the medium of direction, myths, legends, and fate. Noone knows the limits that this power may have. The Starlight Cleric is able to utilize this power and miraculously heal people with a single touch, seemingly like reversing their fate*',
          },
          { name: 'Strength', value: '```5```', inline: true },
          { name: 'Magic', value: '```20```', inline: true },
          { name: 'Intellect', value: '```20```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302883511959613/835701361169268776/Cleric.jpg',
        );

      message.channel.send(paulineEmbed);

      break;
    }

    case 'Victor':
    case 'victor': {
      const victorImbed = new Discord.MessageEmbed()
        .setColor('#c8b6a0')
        .setTitle('The Baker')
        .setDescription(
          `Able to produce / make foods that give unique boosts to stats. Rumor has it that he is in search of the “The Ingredient” known to be the most delicious and scrumptious but never seen before. He is on a quest to make the ultimate foods in existence! 

        *Note: He’s also a weeb.*`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Vic``` - *His future was to become the future Head Monk of the Tao Temple, however he decided to forsake his reputation and future to travel the world and explore the sufferings of the world*',
          },
          {
            name: 'Class',
            value:
              '```Firefist Monk``` - *The main class granted to those who worked in the Tao Temple. A basic class, but with infinite potential, able to endure large amounts of damage while subduing enemies.*',
          },
          { name: 'Strength', value: '```15```', inline: true },
          { name: 'Constitution', value: '```20```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/836723669442232380/monk.jpg',
        );

      message.channel.send(victorImbed);

      break;
    }

    case 'Andrew':
    case 'andrew':
    case 'Woody':
    case 'woody': {
      const woodyImbed = new Discord.MessageEmbed()
        .setColor('#0000FF')
        .setTitle('The Cyborg')
        .setDescription(
          `Is he a man or machine? No one knows. I was able to capture a recording of a conversation from him...listen carefully:
        
            **Beep boop....beep boop 101001 1001 01 01 100 1010101**`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Woody``` - *A poor orphan captured by an evil organization. Brutally trained to become a tool for their use. However his potential was too high, wresting control away from his captors, he slayed them all and made his way in the world trying to find meaning in his life again.*',
          },
          {
            name: 'Class',
            value:
              "```Faceless Assassin``` - *A universally feared profession, with strict requirements and even stricter abilities. So fast one might say you won't be able to catch a glimpse of its face. There's a saying that a job isn't done right if it isn't done by a Faceless Assassin.*",
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Dexterity', value: '```25```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/804514688070582323/pngfind.com-assassins-creed-png-1261513.png',
        )
        .setFooter('An OG Google Meets Grind Time member');
      message.channel.send(woodyImbed);

      break;
    }

    case 'Renzi':
    case 'renzi':
    case 'renz':
    case 'Renz': {
      message.channel.send(
        'RPG Character: **Wizard** - *blasting fools with 8000 spells*',
      );

      break;
    }

    case 'Steve':
    case 'steve': {
      const steveEmbed = new Discord.MessageEmbed()
        .setColor('#90EE90')
        .setTitle('The Adventurer')
        .setDescription(
          'A strong sense of curiosity. Able to take that leap of faith and try out new things regardless of uncomfortableness. Daring; a risk taker. Definitely someone who will go far in life.',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Steve Musashi``` - *Hailing from a celebrated and honorable background. He was betrayed by one of his most trusted confidantes. Blinded by rage, he murdered him and all generations of his family. When he came back to his senses, realizing the weight of his actions, he wanders the land seeking ways to atone for his sins.*',
          },
          {
            name: 'Class',
            value:
              '```Lonesome Samerai (Ronin)``` - *with only a sword on his waist and the clothes on his back. Wandering the world with steadfast steps.*',
          },
          { name: 'Strength', value: '```25```', inline: true },
          { name: 'Dexterity', value: '```5```', inline: true },
          { name: 'Constitution', value: '```20```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/832785048758648832/Samerai_Steve.jpg',
        )
        .setFooter(
          'Often seen chilling in a random discord server voice channel by himself',
        );

      message.channel.send(steveEmbed);

      break;
    }

    case 'Anthony':
    case 'anthony':
    case 'Tony':
    case 'tony': {
      const anthonyEmbed = new Discord.MessageEmbed()
        .setColor('#DC143C')
        .setTitle('The Serene')
        .setDescription(
          `Remains tranquil no matter the outside disturbance. Calm and unaffected...perhaps too chill if you ask me. A very giving and thoughtful individual. If everyone in the world would go against me, he would probably still have my back. 
        `,
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Tony``` - *Growing up in poverty, Tony had to find unique ways to make ends meet. He began to learn martial arts at a young age in order to get some extra coin as a bodyguard. One day, when he was working as a guard to a Missus from the Tepes family, a rival family ambushed. Noone survived except for Tony who escaped by jumping off a cliff. Instead of dying, at the bottom of the cliff was a mysterious old man who saved him. The old man saw his potential and took him as a disciple - passing on to him monstrous amounts of martial arts knowledge*',
          },
          {
            name: 'Class',
            value:
              '```Origin Martial Artist``` - *Only the most dedicated martial artists are able to dig deep into the essense of martial arts and comprehend the true nature of all things. All martial arts come from a single concept. All these martial arts branched out into many different paths, they also can converge back together...back to the origin.*',
          },
          { name: 'Strength', value: '```25```', inline: true },
          { name: 'Constitution', value: '```20```', inline: true },
          { name: 'Intellect', value: '```5```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/833151703972708403/ezgif.com-gif-maker_1.gif',
        )
        .setFooter('You suck at Smash 64 btw');

      message.channel.send(anthonyEmbed);

      break;
    }

    case 'michelle':
    case 'Michelle': {
      const michelleEmbed = new Discord.MessageEmbed()
        .setColor('#0d2317')
        .setTitle('The Demon')
        .setDescription(
          'Complex, twisted, and corrupted. The demon is a master of manipulation and seizing the moment. With an incredibly high charm stat, she makes a powerful ally, and an even more powerful enemy.',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Garfiend``` - *Garfiend was a regular grunt worker under the mighty Lich King. By a stroke of luck, she managed to witness the battle between the Hero and the King, both deciding to partake in mutual destruction. In the end, with both Boss level characters dead, a small crystal was the only thing left behind. Being a grunt worker, the only thing Garfiend thought she could do with it...was eat it.*',
          },
          {
            name: 'Class',
            value:
              '```Darwinian Goblin``` - *Regarded as one of the weakest mob creatures, by a turn of pure luck, a unique class was created. This goblin is able to absorb the abilities of anything it eats!*',
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Constitution', value: '```10```', inline: true },
          { name: 'Potential', value: '```??```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/837066739438452826/Goblin.jpg',
        );

      message.channel.send(michelleEmbed);

      break;
    }

    case 'Sarah':
    case 'sarah': {
      const sarahEmbed = new Discord.MessageEmbed()
        .setColor('#add8e6')
        .setTitle('The Alchemist')
        .setDescription(
          'The alchemist is a mysterious figure. Able to give members of her party certain stat boosts in critical moments. It seems she also dabbles in medicine and poison.',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Sora``` - *The meaning of Sora is the "sky". She once had a dream to travel the world, and experience everything there was to experience under this vast expanse. So she set off on a journey to travel the world.*',
          },
          {
            name: 'Class',
            value:
              '```Witch of Creation``` - *A deceptively low profile class, usually seen researching otherwordly creatures and ingredients. Rumors say that the very first witch of creation created unimaginable weapons of destruction. What was her very first creation? Was it Pandora?*',
          },
          { name: 'Constitution', value: '```10```', inline: true },
          { name: 'Magic', value: '```20```', inline: true },
          { name: 'Intellect', value: '```20```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302883511959613/869330016255758396/sorceress_by_nibelart_ddiywga-350t.jpg',
        );

      message.channel.send(sarahEmbed);

      break;
    }

    case 'Erica':
    case 'erica': {
      const ericaEmbed = new Discord.MessageEmbed()
        .setColor('#00008b')
        .setTitle('The Unexpected')
        .setDescription(
          'Unexpectedly genuine in her actions and thoughts however a bit shy in her demeanor. She tends to easily make friends wherever she goes. Be careful around this one, because you might get hit for no reason out of nowhere!',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Erica``` - *A part of an ice kingdom situated in the North, her Father known as the Frozen Emperor. An aristocrat from birth, she is the sole heir and soon to be “Eternal Ruler of the North”.*',
          },
          {
            name: 'Class',
            value:
              '```Ice Cleric``` - *Most cleric classes are known for accelerating the patient body healing process. However, the Ice Cleric is unique. Instead of accelerating natural growth, they instead slow down the degradation of outcomes. Their healing prowess comes less in the form of healing wounds but in stopping illnesses and incurable diseases. In the battlefield, having an Ice Cleric freeze your wounds may seem more practical than seeking out a regular cleric.*',
          },
          { name: 'Constitution', value: '```5```', inline: true },
          { name: 'Magic', value: '```10```', inline: true },
          { name: 'Intellect', value: '```35```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/870370162728140820/Icecleric.jpg',
        );

      message.channel.send(ericaEmbed);

      break;
    }

    case 'stefan':
    case 'Stefan': {
      const stefanImbed = new Discord.MessageEmbed()
        .setColor('#FFFFF0')
        .setTitle('The Chivalrous')
        .setDescription(
          `Considerate, honorable, and gallant; a completely genuine and authentic individual. Accepting but critical.
            
            Someone who I would consider to be one of the hardest workers I've ever met, in fact, he tries hard in everything he does. An individual with massive amounts of internal motivation.`,
        )
        .addFields(
          {
            name: 'Name',
            value:
              "```Prince Bozic``` - *A character with his own principles and ideals. A quirky mindset never before seen in an assassin. He's been known to charge jobs for millions of dollars, but it was also known that he had accepted a job from a little girl...for only a penny.*",
          },
          {
            name: 'Class',
            value:
              '```Crowned Assassin``` - *A self-proclaimed kingly class, looking down at all things with the valour of a royal. A character only known, but never seen.*',
          },
          { name: 'Strength', value: '```10```', inline: true },
          { name: 'Dexterity', value: '```25```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/831741204013121556/Webp.net-resizeimage_2.png',
        )
        .setFooter("He thinks he's funny but he's not.");
      message.channel.send(stefanImbed);

      break;
    }

    case 'Landers':
    case 'landers': {
      const landersImbed = new Discord.MessageEmbed()
        .setColor('#000001')
        .setTitle('The Hidden')
        .setDescription(
          'Never once has he shown cam except for a rare split second. Was it a fake? Was it real? We will never know, for he is one that stays hidden. A pragmatic intellectual, destined to stay behind the scenes. Anonymous?',
        )
        .addFields(
          {
            name: 'Name',
            value:
              '```Landers``` - *Through a series of mischievous and borderline evil tactics, he was crowned as the lord of the night. None can best him, for he is a ruler.*',
          },
          {
            name: 'Class',
            value:
              '```Night Lord``` - *Cast away from the light of the sun, those who train in the arts of night thrive in the mysterious unknown. For what you can not see; you can not defend.*',
          },
          { name: 'Strength', value: '```30```', inline: true },
          { name: 'Dexterity', value: '```5```', inline: true },
          { name: 'Intellect', value: '```15```', inline: true },
        )
        .setImage(
          'https://cdn.discordapp.com/attachments/793302883511959613/874039828751208468/nightLord.jpg',
        )
        .setFooter("He thinks he's funny but he's not.");
      message.channel.send(landersImbed);

      break;
    }

    case 'time to grind':
    case 'grind time':
    case "let's grind": {
      computerOptions = [
        'Did someone say grind? :eyes:',
        'For every task, there is a Grinder...',
        "YESSIR, LET'S GO!",
        'Traffic lights say GO! https://cdn.discordapp.com/attachments/787654137352683521/787901140641120286/Traffic_Lights_Study_Time.png',
      ];
      const computerNumber = Math.floor(Math.random() * 4);
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'time to wake up':
    case 'get off your lazy ass':
    case 'get out of bed':
    case 'wake up': {
      message.channel.send(
        'Yea, you should get off your lazy ass :alarm_clock:',
      );

      break;
    }

    case 'time to sleep': {
      message.channel.send(randomObject.Wake);

      break;
    }

    case 'I need some motivation':
    case 'motivation':
    case 'MOTIVATION': {
      computerOptions = [
        'You have a bright future ahead of you: https://careers.mcdonalds.com/main/jobs/51F5D22A-3CF7-4DF9-8C72-A6BB0179D88D?lang=en-us.',
        'Hehe...https://youtu.be/Fdzs1dKkUHg.',
        'https://www.youtube.com/watch?v=dvFFb65pWnU',
        `HAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
            https://www.youtube.com/watch?v=C46kW_1rIO4`,
        `WHERE THE FK IS YOUR PASSION HUH? THERE IS NOTHING!
            https://youtu.be/X_vHaURM4sg`,
        // Cow tips?
        `**Cow Tip #1**: **Just get started**. I'm not going to say **Just Do it!** (*we have a command for that btw*), but I will say that you should just start whatever aversive task or project you have in wait for you. Just start with 5 minutes of work or even less and if you feel like continuing then continue, otherwise, just drop it and do something else. But the best way to tackle these aversive tasks in my opinion is to just begin!
            https://www.lifehack.org/articles/productivity/5-tips-get-started-working-now.html`,
        '**Cow Tip #2**: **The Rule of 3**. Try to envision yourself in the future. What do you want to get done by the end of the day that would make you say to yourself, "Man, I was productive!". Now, I want you to pick the **top 3** tasks out of those and write it down. FOCUS ON THOSE AND FINISH IT. Most of the time, we can procrastinate on the lower-tier productive things when in reality, we should be focusing on the high-impact productive things. Getting these things sorted and written out may boost your motivation for the future!',
        "**Cow Tip #3**: **Don't Manage Your Time**. This may seem a bit controversial at first but hear me out. Managing time was the rage back in the day, that was because in the industrial era, we did jobs that were mostly designed for machines now. In that sense, it made sense for us to get payed by the hour because of our autonomous work. Going on autopilot was essentially good back then. Now however, we live in a knowledge-based era. Instead of time equating to money; we get paid more for the quality and value we are able to provide others. Therefore, you should **manage and record the times in the day that you have the most focus and attention and work around that to tackle your most high-impact tasks!**",
        "**Cow Tip #4**: **Reward Yourself**. Okay, I'm pretty sure what I'm thinking is entirely different then what your thinking so hold on. Have you ever played a game? Whenever you level up or beat an achievement, you get rewarded with something that will make you more powerful, something like a more powerful sword or higher stats. Now, think about how you reward yourself now. I feel like nowadays people reward themselves the wrong way. We reward ourselves with fast food, alcohol, or binging your favourite show...but it's not improving our stats or giving us better equipment at all! In essence, when we beat an achievement in real life, we literally reward ourselves by decreasing our stats! Does that make any sense? I propose we **reward ourselves with things that will improve our stats**. After a stressful and long day of work, go for a walk to improve your mind, read a book for enjoyment, or work on your hobby/passion project. That way you reward yourself with a boost in stats. You would be *levelling up* instead!",
      ];
      const computerNumber = Math.floor(Math.random() * 9);
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'gandoo': {
      computerOptions = [
        'https://www.urbandictionary.com/define.php?term=gandoo',
        'WHAT DID YOU JUST SAY?',
        `
            The above comment is referring to Sadeed and Jay`,
        'The above comment is referring to Sadeed and Jay',
      ];
      const computerNumber = Math.floor(Math.random() * 4);
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'panjot':
    case 'Panjot':
    case 'PANJOT': {
      computerOptions = [
        'GO ThE HiLL aNd GO DOwN!',
        '“Don’t talk about Jay like that!”',
      ];
      const computerNumber = Math.floor(Math.floor(Math.random() * 2));
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'anki':
    case 'Anki': {
      message.channel.send(
        'DID SOmEONe SAY ANKI? https://www.youtube.com/watch?v=gYBYyg3fGRQ&t=1s',
      );

      break;
    }

    case 'brb':
    case 'gonna go eat':
    case 'ima go eat':
    case 'done for the day': {
      computerOptions = ['ight sounds good', 'ight cya later', 'pce bro'];
      const computerNumber = Math.floor(Math.random() * 3);
      message.channel.send(computerOptions[computerNumber]);

      break;
    }

    case 'What time is it?':
    case 'what time is it?':
    case 'WHAT TIME IS IT?':
    case 'what time is it':
    case 'WHAT TIME IS IT': {
      message.channel.send("IT'S GRIND TIME BABY!! 🔥🔥");

      break;
    }

    case 'just do it':
    case 'JUST DO IT':
    case 'JUST DO IT!':
    case 'just do it!': {
      const justDoItEmbed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setImage(
          'https://cdn.discordapp.com/attachments/793302938453803008/804210408268759050/JustDoIt.jpg',
        );
      message.channel.send(justDoItEmbed);

      break;
    }

    case 'workout':
    case 'WORKOUT': {
      const workoutEmbed = new Discord.MessageEmbed()
        .setColor('#FFC0CB')
        .setImage(
          'https://cdn.discordapp.com/attachments/787654137352683521/804211471776612362/c750a57eae01571996b538b584a166b5.png',
        );
      message.channel.send(workoutEmbed);

      break;
    }

    case 'ayy': {
      message.channel.send('stfu Announcer');

      break;
    }
    // No default
  }
});

// Comands (switch statements)
client.on('message', (message) => {
  switch (message.content) {
    case 'grind features':
    case 'Grind features':
      message.channel.send(`
                **These are the basic featurers of Grind Time!**
    
                **1. Leveling System**
                To give you more incentive to do work, we have a system in which the longer you stay in a certain voice channel (Grind Time; forces mute), the more EXP you gain allowing you to level up. At certain level thresholds you upgrade your rank (Eg: Slacker --> Baby Grinder (10hrs)) and may unlock new things!
        
                **2. Group Study Timer**
                If you haven't heard of it before, we have a **Pomodoro** group timer that allows multiple people to have group study sessions. Pomodoro is basically a technique that sets a timer for intense focus time followed by a small breaks. The study timer we have implemented at the moment is a 50/10 timer (50 min study and 10 min break). It's just a feature so you don't have to follow it.
            
                **3. Grind Streaks**
                To keep you coming back and grinding, we have a **streaks** system where you must log in what you plan on doing; are doing; or going to do each day. Each day all active streaks will be displayed. How high can you get your streak?
            
                **4. Notes/Resources**
                Since I'm in Kinesiology, alot of the notes that I have posted is pertaining to that subject. However, feel free to browse through them if you want to learn more about Kinesiology. You are also free to post your own notes or resources. All welcome!
            
                *These are the basic and major features we have, however keep note that I'm implementing new things each day. Make sure to send something to the **suggestions** if you have an idea to be added to the server*`);
      break;
    case 'grind help':
    case 'Grind help':
    case 'Grind Help':
      message.channel.send(
        `**Someone called for help? The Real Grinder is here for the rescue!** 
        
                Have you checked the <#792800377292455946> or <#792802652702113822>? Both these channels have commons questions and commands that may answer your questions. If none of these answers your question then please @Cow`,
      );
      break;
    case 'grind tutorial':
    case 'Grind tutorial':
    case 'Grind Tutorial':
      message.channel.send(
        `As a beginner Grinder, there are a few things you should know before entering the server. 

                First of all, this server is meant for "Grinding"; this means that online work, studying, business, working out, and/or anything that you feel passionate about and can be done while in a voice channel can be counted as Grinding.
    
                *Don't mistake this as an only studying channel because it's much more than that!*
    
                Once you start the Grind, please go on the **Grind Time** voice channel. Going in the channel will automatically change your status to *Currently Grinding* and give you access to the <#787883845239570452> chat. You will also be **automatically muted**. 
    
                As a beginner Grinder, it is possible to rise up the ranks and evolve to a higher status Grinder. You can level up and compete with others to reach the rank of the seemingly untouchable @𝐆𝐫𝐢𝐧𝐝𝐦𝐚𝐬𝐭𝐞𝐫 𝐒𝐮𝐩𝐫𝐞𝐦𝐞 (𝟗𝟐𝟎𝐡𝐫𝐬)! However, first, I challenge you to try to get the @𝐁𝐚𝐛𝐲 𝐆𝐫𝐢𝐧𝐝𝐞𝐫 (𝟏𝟎𝐡𝐫𝐬) rank!
    
                The only way for you to gain EXP and level up is to Grind in the **Grind Time** voice channel. One minute in there is equivalent to one EXP. For more information about the leveling system please refer to #𝐫𝐮𝐥𝐞𝐬 once you unlock the server.
                
                If you just want to hang out and talk, you can join the **Lounge** voice channel. If I'm not Grinding then I'm camping there :wink: .
    
                Finally, I want to let you know that your starting rank is @𝐒𝐥𝐚𝐜𝐤𝐞𝐫𝐬. This means that what you see at the moment is merely the bare bones of what can be unlocked. Remember, the more you rise in rank, the more you unlock! Be prepared!
    
                If you ever forget about what you've learned in this tutorial or want more information; please refer to the :books: Information category.`,
      );
      break;
    case 'grind ranks':
    case 'grind ranks':
    case 'Grind Ranks':
      message.channel.send(
        `Hey! I don't know why you called me to tell you the ranks because all that can be found in <#787354978166898710> but oh well. Here are the ranks: 
            
                Level 5: **Baby Grinder (10hrs)**
                Level 10: **Novice Grinder (30hrs)**
                Level 20: **Apprentice Grinder (95hrs)**
                Level 30: **Adept Grinder (193hrs)**
                Level 40: **Rune Grinder (325hrs)**
                Level 50: **Master Grinder (490hrs)**
                Level 60: **Grandmaster Grinder (688hrs)**
                Level 70: **Grindmaster Supreme (920hrs)**
                
                *Okay, since you called this command I'll give you a little spoiler...there's a class change in one of the ranks.*`,
      );
      break;
    case 'grind tutorial video':
    case 'grind Tutorial video':
      message.channel.send(
        `Looks like you obviously haven't read the prologue...smh.
                https://www.youtube.com/watch?v=FRBrVgeM1d8`,
      );
      break;
    case 'flip a coin':
      computerOptions = ['Heads', 'Tails'];
      const computerNumber2 = Math.floor(Math.random() * 2);
      message.channel.send(computerOptions[computerNumber2]);
      break;
    case 'roll':
      computerOptions = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ];
      computerNumber6 = Math.floor(Math.random() * 20);
      message.channel.send(computerOptions[computerNumber6]);
      break;
    case 'typeracer':
    case 'Typeracer':
      message.channel.send("It's time to duel! https://play.typeracer.com/");
      break;
    case 'rock':
    case 'Rock':
    case 'ROCK':
    case 'paper':
    case 'Paper':
    case 'PAPER':
    case 'scissors':
    case 'Scissors':
    case 'SCISSORS':
      computerOptions = ['Rock!', 'Paper!', 'Scissors!'];
      const computerNumber3 = Math.floor(Math.random() * 3);
      message.channel.send(computerOptions[computerNumber3]);
  }
});
