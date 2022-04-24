const Discord = require('discord.js');

module.exports = {
  slackerMessage(userName, userID) {
    return 'You are a mther yking Slacker';
  },
  babyMessage(userName, userID) {
    const babyEmbed = new Discord.MessageEmbed()
      .setColor('#e8bdf7')
      .setTitle(`${userName} has turned into a Baby Grinder!`)
      .setDescription(
        `The Grinder who **will be**. You don't really know what's happening or how you're doing it. But you've taken the first steps to becoming a Grinder. Congratulations <@${userID}>!`,
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/789331759572713522/792971937650311208/Untitled_design_11.png',
      )
      .setFooter("Don't get too arrogant, you've just started your journey!");

    return babyEmbed;
  },
  noviceMessage(userName, userID) {
    const noviceEmbed = new Discord.MessageEmbed()
      .setColor('#acdbff')
      .setTitle(`${userName} has turned into a Novice Grinder!`)
      .setDescription(
        `You are the **future** of our world. You don't have much experience, but you make up for it with optimism and positivity. You contain immense potential. You're on the road to greatness; perhaps a little lost, but on the right path.\n\nI expect great things from you <@${userID}>`,
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/789331759572713522/792982294125084703/Untitled_design_13.png',
      )
      .setFooter(
        'The world is abundant with Novice Grinders, it is incredibly hard to proceed past this point!',
      );

    return noviceEmbed;
  },
  apprenticeMessage(userName, userID) {
    const apprenticeEmbed = new Discord.MessageEmbed()
      .setColor('#2388b8')
      .setTitle(`${userName} has turned into a Apprentice Grinder!`)
      .setDescription(
        `Nothing speaks more about a Grinder then their journey to become an Apprentice. You are arguably the **most volatile** of all the Grinders, however you show immense bursts of growth in short amounts of time.\n\nDon't give up! Keep going <@${userID}>`,
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302938453803008/793342405596151848/Untitled_design_31.png',
      )
      .setFooter('A path is chosen...I just wonder what it is?');

    return apprenticeEmbed;
  },
  adeptMessage(userName, userID) {
    const adeptEmbed = new Discord.MessageEmbed()
      .setColor('#228d11')
      .setTitle(`${userName} has turned into a Adept Grinder!`)
      .setDescription(
        "You have found your path, techniques, and strategies. Now you're on a journey to test your skills and try your mettle. Now, it's just a matter of moving forward. The journey keeps getting longer from here. ",
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302883511959613/793351609639764008/Untitled_design_38.png',
      )
      .setFooter(
        'Carving your own path and witnessing the peak of a bright future...or is it?',
      );

    return adeptEmbed;
  },
  runeMessage(userName, userID) {
    const runeEmbed = new Discord.MessageEmbed()
      .setColor('#68f700')
      .setTitle(`${userName} has turned into a Rune Grinder!`)
      .setDescription(
        'The Grinder who **teaches**. You have tested your techniques and have found success. You must pass down your knowledge to the unsuccessful, for you must hold up the world where others have failed.',
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302883511959613/793345785077039124/Untitled_design_33.png',
      )
      .setFooter(
        'To be qualified to teach, you must have spent hours mastering your craft!',
      );

    return runeEmbed;
  },
  masterMessage(userName, userID) {
    const masterEmbed = new Discord.MessageEmbed()
      .setColor('#e1ff00')
      .setTitle(`${userName} has turned into a Master Grinder!`)
      .setDescription(
        'The Grinder who has reached the **limits**. What must you do to improve your skill? You do not know, for you have seemingly reached the pinnacle of what is possible. Constantly on a search for more, you number only the few and far between',
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302883511959613/793347232383631363/Untitled_design_34.png',
      )
      .setFooter(
        'The infinitely long pathway as well as the deadend. When will you reach the peak?',
      );

    return masterEmbed;
  },
  grandmasterMessage(userName, userID) {
    const grandmasterEmbed = new Discord.MessageEmbed()
      .setColor('#ffa700')
      .setTitle(`${userName} has turned into a Grandmaster Grinder!`)
      .setDescription(
        'You now number the few who have climbed their mountain and have reached the **peak**. Nothing is left to be said here. Reaching this rank means that you have pushed past all the obstacles that stood in your way. Being at the top; only a handful have joined you. Are you lonely, or accomplished?',
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302938453803008/793349063318700072/Untitled_design_35.png',
      )
      .setFooter(
        'Having reached the peak, what other obstacles could you possibly have? Unstoppable!',
      );

    return grandmasterEmbed;
  },
  grindmasterMessage(userName, userID) {
    const grindmasterEmbed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle(`${userName} has turned into a Grindmaster Supreme!`)
      .setDescription(
        'Only **one** has stood here. And there will be noone else. The ultimate rank. You have climbed your mountain, but also multiple other mountains as well. However...you realize that this is not the end. It seems that from here...the journey has just begun again. An everlasting adventure, towards the continuous unknowns.',
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302938453803008/793350597856329728/Untitled_design_37.png',
      )
      .setFooter(
        'Do you think this is the end? There is still another rank above this!',
      );

    return grindmasterEmbed;
  },
  mythicalMessage(userName, userID) {
    const mythicalEmbed = new Discord.MessageEmbed()
      .setColor('#b026ff')
      .setTitle(`${userName} has turned into a Mythical Grindmaster!`)
      .setDescription(
        "A myth. A legend. A story. A concept if you will. Noone knows if they are real, maybe it was just a figment of someone's imagination. You who have reached here. You my friend...**have no life**.",
      )
      .setThumbnail(
        'https://cdn.discordapp.com/attachments/793302938453803008/967617732608675860/circle-wallpaper-fire-alarm-f0a2ddd8da2a71fa8ab929221af69796.png',
      )
      .setFooter('Stop. Just take a break. Seriously.');

    return mythicalEmbed;
  },
};
