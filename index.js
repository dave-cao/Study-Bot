const Discord = require('discord.js');
const client = new Discord.Client();

const config = require('./config.json')
const command = require('./command')
const firstMessage = require('./first-message')

client.once('ready', () => {
	console.log('Real Grinder is Online!');

    command(client, ['ping', 'test'], message => {
        message.channel.send('Pong!')
    });

//list servers 
    command(client, 'servers', (message) =>  {
        client.guilds.cache.forEach((guild) => {
            message.channel.send(
                `${guild.name} has a total of ${guild.memberCount} members`)
        })
    })
//delete messages
    command(client, ['cc', 'clearchannel'], (message) => {
        if (message.member.hasPermission('ADMINISTRATOR')) {
            message.channel.messages.fetch().then((results) => {
                message.channel.bulkDelete(results)
            })
        }
    })

//update bot status
    command(client, 'status', message => {
        const content = message.content.replace('grind status', '')

        client.user.setPresence({
            activity: {
                name: content,
                type: 0
            }
        })
    })
//send first message
    //Not working = firstMessage(client, '817984922262306857', 'Nani the fk this dont', [`🔥`])

    
});


/*client.on('message', async message =>{
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

client.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.channelID;
    let oldUserChannel = oldMember.channelID;
    const textChannel = client.channels.cache.get(`821951428717183006`)
 
    if(newUserChannel === "787354978523545634") //don't remove ""
    { 
        // User Joins a voice channel
        textChannel.send(`<@${newMember.id}> has just started Grinding!`)
    }
    else if (oldUserChannel === '787354978523545634' && newUserChannel !== '787354978523545634') {
        // User leaves a voice channel
        textChannel.send(`<@${newMember.id}> has left Grind Time to go slack off.`)
    }
 });


client.login(config.token)













/*
//just testing objects
let computerOptions = [];
let randomObject = {
    Wake: "Imagine not sleeping LULW"
}
//time to: statements (time to grind/wakeup/sleep)
client.on('message', message => {
	if (message.content === 'time to grind' || message.content === 'grind time' || message.content === "let's grind") {
        computerOptions = [
            "Did someone say grind? :eyes:", 
            "For every task, there is a Grinder...", 
            "YESSIR, LET'S GO!", 
            'Traffic lights say GO! https://cdn.discordapp.com/attachments/787654137352683521/787901140641120286/Traffic_Lights_Study_Time.png'];
        const computerNumber = Math.floor(Math.random() * 4);
        message.channel.send(computerOptions[computerNumber])
    } else if (message.content === 'time to wake up' || message.content === 'get off your lazy ass' || message.content === 'get out of bed' || message.content === 'wake up') {
        message.channel.send('Yea, you should get off your lazy ass :alarm_clock:');

    //testing objects here
    } else if (message.content === 'time to sleep') {
        message.channel.send(randomObject.Wake)
    }
});

//I need: statements
client.on('message', message => {
    if (message.content === 'I need some motivation' || message.content === 'motivation' || message.content === 'MOTIVATION') {
        computerOptions = [
            'You have a bright future ahead of you: https://careers.mcdonalds.com/main/jobs/51F5D22A-3CF7-4DF9-8C72-A6BB0179D88D?lang=en-us.',
            "Hehe...https://youtu.be/Fdzs1dKkUHg.",
            "https://www.youtube.com/watch?v=dvFFb65pWnU",
            `HAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
            https://www.youtube.com/watch?v=C46kW_1rIO4`,
            `WHERE THE FK IS YOUR PASSION HUH? THERE IS NOTHING!
            https://youtu.be/X_vHaURM4sg`
        ];
        const computerNumber = Math.floor(Math.random() * 5);
        message.channel.send(computerOptions[computerNumber])
       
    }
})



//People comments
client.on('message', message => {
    if (message.content === 'Christina' || message.content === 'christina' || message.content === 'CHRISTINA') {

        const christinaEmbed = new Discord.MessageEmbed()
        .setColor(`#90ee90`)
        .setTitle(`The Bedbug`)
        .setDescription(`A creature known to occupy the habitat known as the "Bedroom". This fascinating creature does not set a foot off the bed; in a perpetual state of lying down. This creature is known to have found a loop hole to the Grinding arithmetic. Able to gain levels while doing nothing. Essentially a bug in the system!`)
        .addFields(
            { name: `Name`, value: `\`\`\`Christeenie\`\`\` - *princess of the Fragul Tribe, in the world of Tona*` },
            { name: `Class`, value: `\`\`\`Forest Fairy (Healer)\`\`\` - *Escaped from her own realm to explore the mysteries of our world. Resilient and sharp, with a mind that can pierce through problems, and a tongue that can cut through people.*` },
            { name: `Strength`, value: `\`\`\`5\`\`\``, inline: true },
            { name: `Magic`, value: `\`\`\`30\`\`\``, inline: true },
            { name: `Intellect`, value: `\`\`\`15\`\`\``, inline: true },
        )
        .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/804095808634355762/forestFairy.jpg`)
        computerOptions = [christinaEmbed];
        const computerNumber = Math.floor(Math.random() * 1);
        message.channel.send(computerOptions[computerNumber])
    } else if (message.content === `Nolan` || message.content === `nolan` || message.content === 'Lord Nolan' || message.content === 'NOLAN') {
        const nolanImbed = new Discord.MessageEmbed()
            .setColor(`#C0C0C0`)
            .setTitle(`The Silent Sky`)
            .setDescription(`Open and all encompassing. A being that can accomodate many things and people. Throw a rock at the sky and there is no ripples. Though there may be long nights and rainy days, the sun will always rise up again.

            A deep and philosophical creature once you get get to know it. A people pleaser, sometimes a pushover, but one of the **kindest and compassionate creatures known in existence**. Do not be afraid to share your stories with it, for this creature is understanding. 
        
            It can be found either on a red chair or the couch, where it is usually seen with a book in hand or a game controller. For reference, a snapshot of this creature can be found in <#793591458656813066> where you may witness it on the hunt for better grades (red sweater)`)
            .addFields(
                { name: `Name`, value: `\`\`\`Null\`\`\` - *Travelling through many worlds and many millenia. He has already forgotten his name...his past. His only purpose is to continue to raise the dead. For what? Even he doesn't know...*`},
                { name: 'Class', value: `\`\`\`Abyssal Necromancer\`\`\` - *Allies rise up and join you again to celebrate a new day, only to stab you in the back and drag you down...down back into the abyss.*`},
                { name: `Strength`, value: '\`\`\`10\`\`\`', inline: true },
                { name: `Darkness`, value: '\`\`\`30\`\`\`', inline: true },
                { name: `Wisdom`, value: '\`\`\`10\`\`\`', inline: true },
                
            )
            .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/804518654917214278/37182850275_63c04ccc22_c.jpg`)
            .setFooter(`An Honorary Member of the Grind Time server`)
        computerOptions = [nolanImbed];
        const computerNumber = Math.floor(Math.random() * 1);
        message.channel.send(computerOptions[computerNumber]);
    } else if (message.content === `Rodeem` || message.content === `rodeem` || message.content === `ro` || message.content === `Ro` || message.content === 'RO' || message.content === 'RODEEM') {
        const rodeemEmbed = new Discord.MessageEmbed()
        .setColor(`#000000`)
        .setTitle(`The Gentle Giant`)
        .setDescription(`A gigantic monstrous beast of a creature. The only word that can be used to describe it is **"deezed"**. Passionate and kind, there is basically no way for anyone to dislike it. One of the most supportive creatures I've ever met in my life, nothing can go wrong with befriending this one. 
            
        It can usually be found grinding a shit game online (DOTA 2) or a shit game in real life (Football (jk, I love Football)). If not, then it is banging its head on its keyboard trying to figure out discord code.
        
        For reference, a snapshot of this creature can be found in <#793591458656813066>. Whether the creature is sleeping or studying...we have yet to find out (yellow sweater)`)
        .addFields(
            { name: `Name`, value: `\`\`\`Rodelius the Damned\`\`\` - *soul-bound...formless...from the depths...and the darkness*` },
            { name: `Class`, value: `\`\`\`Dark Knight\`\`\` - *A tanky spell caster, able to handle hits and deal devastating damage*` },
            { name: `Strength`, value: `\`\`\`15\`\`\``, inline: true },
            { name: `Magic`, value: `\`\`\`20\`\`\``, inline: true },
            { name: `Intellect`, value: `\`\`\`15\`\`\``, inline: true },
        )
        .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/804100247734583307/rsz_21rsz_dark_knight.png`)
        .setFooter(`An Honorary Member of the Grind Timer server.`)

        computerOptions = [rodeemEmbed];
        const computerNumber = Math.floor(Math.random()*1);
        message.channel.send(computerOptions[computerNumber]);
        
    } else if (message.content === `Sadeed` || message.content === `sadeed` || message.content === `ilmun` || message.content === `Ilmun` || message.content === 'DetectiveBongHits') {
        computerOptions = [
            `**The following excerpt is quoted from Jay**: "*When he spends time with us, he's hella interesting, genuine, and funny person"*
            
            This creature is known to be fighting crime late in the depths of the night...unable to answer phone calls or text messages. Sometimes going so far as to ask something and then never respond to the reply. In essence, a big gawd dam gandoo. 

            Known to be very passive in every situation. If you bug it, it will actually blame itself for allowing you to do it! However, this creature is a real hero. The first one to come over when there is a cry for help. You can be sure that when you need something, this creature will help you no matter what. With a heart made of gold. 
            
            *Masha'Allah my friend.*`
        ];
        const computerNumber = Math.floor(Math.random()*1);
        message.channel.send(computerOptions[computerNumber]);
    } else if (message.content === 'Miran' || message.content === 'miran') {
        computerOptions = [
            `**The following excerpt is quoted from Jay**: "*Miran is literally a father figure to me but will straight up tell a girl he’s talking to that he would want to marry a female version of me 💀 so he’s also a little Alabama"*
            
            A creature known to value its friendships and relationships very much. Solid in its core values and beliefs, it is the type of creature to straight forwardly tell you what it's thinking with no strings attached. If I would ever need someone to rely on for something, I would gladly put my life in its hands.
            
            *Masha'Allah my friend.*
            
            RPG Character: **Archer** - *calculating firing distance with deadly accuracy*`


        ]
        const computerNumber = Math.floor(Math.random()*1);
        message.channel.send(computerOptions[computerNumber]);
    }   else if (message.content === 'Jay' || message.content === 'jay' || message.content === 'Jayant' || message.content === 'jayant' || message.content === 'MemeSupremeJay') {
        computerOptions = [
            `A creature with high self reflection, internal diolgue, and emotional quotient. A loving character; though at times a little slow (with eating), once you get to know it, it will be your life-long friend. It is very easy to build a connection with it.
            
            This creature is known to hop in and out of voice channels randomly. Look out, because you might be able to spot it one day!

            Background Info: This man once went to an IMAX theatre to watch a movie. He then went to one of the employees and asked them to turn down the volume weirdCHAMP
            
            *Though you may be a bitch, you are also one of the strongest people I know. All the best.*`
        ];
        const computerNumber = Math.floor(Math.random()*1);
        message.channel.send(computerOptions[computerNumber]) 
    } else if (message.content === 'Liam' || message.content === 'liam') {
        computerOptions = [
            `**Quote**: *If I could choose a world where pessimism doesn't exist, and the only thing that drives people is optimism; I would do it.*
            
            On the surface, this creature may seem like a **dumbass**, in fact, it may seem like it doesn't have a clue of what's going on. Happy go lucky so to speak. However, the deeper you get to know it, you find out that it is one of the most intellectually and emotionally aware creature there is. 
            
            Draws a clear line between work and play, it is one of the most hard working creatures there is to man. Though it may not know it; I have grown so much interacting with this creature. I am honestly grateful for having such a different a unique person in my life. I've never met anyone like you before.
            
            *You are one of the people I want to see become successful and achieve all your goals and dreams. All the best my friend.*`
        ];
        const computerNumber = Math.floor(Math.random()*1);
        message.channel.send(computerOptions[computerNumber])
    } else if (message.content === 'Noyan' || message.content === 'noyan' || message.content === 'Noyano') {
        computerOptions = [
            `**Quote**: *You gawd dam gandoo kid*
            
            One of the easiest creatures to talk and connect with. Intellectually adept and socially aware. Is able to detect if you don't want to talk and will give you space. You will have a natural tendency to help this creature because you know that in your time of need, it's got your back, no questions asked.
            
            Perhaps addicted to playing games, however once it gets to work and has its motivation, it can grind out long hours easily. Has a genetically gifted superior physique, but above all, a **high quality perseverence and ability to withstand punishment**.
            
            *Masha'Allah my friend.*`

            
        ];
        const computerNumber = Math.floor(Math.random()*1);
        message.channel.send(computerOptions[computerNumber]);
    } else if (message.content === `David` || message.content === `david` || message.content === 'Cow' || message.content === 'KingCao' || message.content === 'DAVID' || message.content === `cow`) {
        const davidEmbed = new Discord.MessageEmbed()
        .setColor(`#FFA500`)
        .setTitle(`Cow`)
        .setDescription(`Owner of the server...also not a bitch`)
        .addFields(
            { name: `Name`, value: `\`\`\`Sir Cownelius Maximus\`\`\` - *Wielder of Heaven's Shield, the divine artifact known to protect entire cities when imbued with holy energy*` },
            { name: `Class`, value: `\`\`\`Paladin\`\`\` - *A meatball of a man who primarily seeks to build up his allies*` },
            { name: `Strength`, value: `\`\`\`10\`\`\``, inline: true },
            { name: `Constitution`, value: `\`\`\`35\`\`\``, inline: true },
            { name: `Intellect`, value: `\`\`\`5\`\`\``, inline: true },
        )
        .setImage(`https://cdn.discordapp.com/attachments/787654137352683521/803413971146506260/9la3cag4i1n01.png`)
        .setFooter(`If this man is not Grinding then call him out. Don't let him be a bitch.`)
        computerOptions = [davidEmbed];
        const computerNumber = Math.floor(Math.random()*1); 
        message.channel.send(computerOptions[computerNumber]);
    } else if (message.content === 'William' || message.content === 'william' || message.content === 'will' || message.content === 'Will') {

        const williamEmbed = new Discord.MessageEmbed()
            .setColor(`#FF0000`)
            .setTitle(`The Harnesser`)
            .setDescription(`If you attend the Grind Time regularly, you may be able to see this creature bobbing and swaying to the beat of an epic orchestral song! Don't be fooled! This isn't a show of awkward dancing but a way for him to channel the forces of the world!
        
            A man able to harness the powers of music, art, spirit, and soul. An asset to any Grinder party, he has the ability to wipe out hordes of monsters!`)
            .addFields(
                { name: `Name`, value: `\`\`\`Red Will\`\`\` - *his body is a santuary, his home is his soul*` },
                { name: `Class`, value: `\`\`\`Dragon Knight\`\`\` - *The righteous knight with a dark past, seeking to regain his honour and reclaim his place among the sacred dragon knights faction.*` },
                { name: `Strength`, value: `\`\`\`25\`\`\``, inline: true },
                { name: `Constitution`, value: `\`\`\`10\`\`\``, inline: true },
                { name: `Intellect`, value: `\`\`\`15\`\`\``, inline: true },
            )
            .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/803476021629812746/1418db9e62adcf32fa0727c699bcdf98.png`)


        message.channel.send(williamEmbed)
    } else if (message.content === 'Suzy' || message.content === 'suzy') {
        const suzyEmbed = new Discord.MessageEmbed()
            .setColor(`#FFC0CB`)
            .setTitle(`The Rose`)
            .setDescription(`Thorny at first glance, it seems like she would be hard to touch. However peeling back the thorns reveal a beautiful rose. Sweet and gentle on the inside but tough and intimidating on the outside. Watch out, because if your not protected within her thorns, then your getting hit by it!
        
            Can usually be seen giving a disapproving gaze. She doesn't yet know it, but she's been secretly recruited into a cult that is impossible to leave...`)
            .addFields(
                { name: `Name`, value: `\`\`\`Professor Sprout\`\`\` - *Coming back to a home ransacked by monsters, she abandoned her job as a professor and took up her family trade as a huntress, vowing to seek veangance on any monster that she sees*` },
                { name: `Class`, value: `\`\`\`Tempest Ranger\`\`\` - *lithe and agile while dealing devastating piercing damage to her foes, charging through head on like a rampaging tornado*` },
                { name: `Strength`, value: `\`\`\`10\`\`\``, inline: true },
                { name: `Dexterity`, value: `\`\`\`20\`\`\``, inline: true },
                { name: `Intellect`, value: `\`\`\`20\`\`\``, inline: true },
            )
            .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/804093581995671582/epic_huntress.jpg`)


        message.channel.send(suzyEmbed)
    } else if (message.content === 'Justin' || message.content === 'justin') {

        const justinEmbed = new Discord.MessageEmbed()
            .setColor('#FFFF00')
            .setTitle(`:monkey: **I MUST RETURN TO MONKE** :monkey:`)
            .setDescription(` A rare phenomenon. Nothing can explain this rare breeded creature. An organism able to navigate the world through pure spinal cord interactions!
            
        `)
            .addFields(
                { name: `Name`, value: `\`\`\`BUNGA\`\`\` - *of Ungrunga; good at two hand hammer*` },
                { name: `Class`, value: `\`\`\`Large Ape Warrior\`\`\` - *Big Hammer*` },
                { name: `Strength`, value: `\`\`\`50\`\`\``, inline: true },
                { name: `Constitution`, value: `\`\`\`50\`\`\``, inline: true },
                { name: `Intellect`, value: `\`\`\`-50\`\`\``, inline: true },
            )
            .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/805145337428705280/Webp.net-resizeimage_6.png`)
            .setFooter(`Can often be seen travelling the jungles searching for banana's.`, `https://cdn.discordapp.com/attachments/793302938453803008/803842131310673940/Daco_518550.png`);


        message.channel.send(justinEmbed)
    } else if (message.content === 'Sahaj' || message.content === 'sahaj') {
        const sahajImbed = new Discord.MessageEmbed()
            .setColor(`#00FF00`)
            .setTitle(`The Philospher`)
            .setDescription(`A chemist, planter, and apothecary. An indispensable member in any Grinder expedition. He has the ability to give +5 intellect to everyone in his party. 
        
            Can usually be found brewing potions for the next party asking for assistance.`)
            .addFields(
                { name: `Name`, value: `\`\`\`Soulhaj\`\`\` - *stepped out of a hidden society with a millenia of accumulated wisdom. Determined that he could find more valuable information in the real world, he sets out seeking more knowledge*`},
                { name: 'Class', value: `\`\`\`Druid\`\`\` - *a plethora of skills under his arsenal, you don't know what he might throw at you next!*`},
                { name: `Strength`, value: '\`\`\`5\`\`\`', inline: true },
                { name: `Intellect`, value: '\`\`\`25\`\`\`', inline: true },
                { name: `Wisdom`, value: '\`\`\`20\`\`\`', inline: true },
                
            )
            .setImage(`https://cdn.discordapp.com/attachments/787654137352683521/803476053938143232/09e88e7eccec20737f8142683b4abd34.png`)
            


        message.channel.send(sahajImbed)
    } else if (message.content === 'Pauline' || message.content === 'pauline') {
        message.channel.send(`**The Silencer**

        Silent, but a hard worker. You may not notice, but she takes the top spots on the leaderboard without anyone noticing!`)
    } else if (message.content === 'Victor' || message.content === 'victor') {
        message.channel.send(`**The Weeb**

        ...but anime/manga is pretty lit tho :smiling_face_with_tear: `)
    } else if (message.content === 'erica' || message.content === 'Erica') {
        message.channel.send(`**The Night Owl**

        Can usually be found grinding in the depths of the night. Too shy to show cam, you really don't know what she's up to :eyes: `)
    } else if (message.content === 'Andrew' || message.content === 'andrew' || message.content === 'Woody' || message.content === 'woody') {
        const woodyImbed = new Discord.MessageEmbed()
            .setColor(`#0000FF`)
            .setTitle(`The Cyborg`)
            .setDescription(`Is he a man or machine? No one knows. I was able to capture a recording of a conversation from him...listen carefully:
        
            **Beep boop....beep boop 101001 1001 01 01 100 1010101**`)
            .addFields(
                { name: `Name`, value: `\`\`\`Woody\`\`\` - *A poor orphan captured by an evil organization. Brutally trained to become a tool for their use. However his potential was too high, wresting control away from his captors, he slayed them all and made his way in the world trying to find meaning in his life again.*`},
                { name: 'Class', value: `\`\`\`Faceless Assassin\`\`\` - *A universally feared profession, with strict requirements and even stricter abilities. So fast one might say you won't be able to catch a glimpse of its face. There's a saying that a job isn't done right if it isn't done by a Faceless Assassin.*`},
                { name: `Strength`, value: '\`\`\`10\`\`\`', inline: true },
                { name: `Dexterity`, value: '\`\`\`25\`\`\`', inline: true },
                { name: `Intellect`, value: '\`\`\`15\`\`\`', inline: true },
                
            )
            .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/804514688070582323/pngfind.com-assassins-creed-png-1261513.png`)
            .setFooter(`An OG Google Meets Grind Time member`)
        message.channel.send(woodyImbed)
    } else if (message.content === 'Renzi' || message.content === 'renzi' || message.content === 'renz' || message.content === 'Renz') {
        message.channel.send(`RPG Character: **Wizard** - *blasting fools with 8000 spells*`)
    }
})




//Swears
client.on('message', message => {
    if (message.content === 'gandoo') {
        computerOptions = [
            `https://www.urbandictionary.com/define.php?term=gandoo`, 
            `WHAT DID YOU JUST SAY?`, `
            The above comment is referring to Sadeed and Jay`,
            `The above comment is referring to Sadeed and Jay`];
        const computerNumber = Math.floor(Math.random() * 4);
        message.channel.send(computerOptions[computerNumber])
    } else if (message.content === 'panjot' || message.content === 'Panjot' || message.content === 'PANJOT') {
        computerOptions = [
            'GO ThE HiLL aNd GO DOwN!',
            `“Don’t talk about Jay like that!”`
        ];
        const computerNumber = Math.floor(Math.floor(Math.random()*2));
        message.channel.send(computerOptions[computerNumber]);
    }
})

//resource calls
client.on('message', message => {
    if (message.content === 'anki' || message.content === 'Anki') {
        message.channel.send('DID SOmEONe SAY ANKI? https://www.youtube.com/watch?v=gYBYyg3fGRQ&t=1s')
    }
})




//comands (switch statements)
client.on('message', message => {
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
            
                *These are the basic and major features we have, however keep note that I'm implementing new things each day. Make sure to send something to the **suggestions** if you have an idea to be added to the server*`)
            break;      
        case 'grind help':
        case 'Grind help':
        case 'Grind Help':
            message.channel.send(
                `**Someone called for help? The Real Grinder is here for the rescue!** 
        
                Have you checked the <#792800377292455946> or <#792802652702113822>? Both these channels have commons questions and commands that may answer your questions. If none of these answers your question then please @Cow`);
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
    
                If you ever forget about what you've learned in this tutorial or want more information; please refer to the :books: Information category.`
            );  break;
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
                
                *Okay, since you called this command I'll give you a little spoiler...there's a class change in one of the ranks.*`
            );  break;
        case 'grind tutorial video':
        case 'grind Tutorial video':
            message.channel.send(
                `Looks like you obviously haven't read the prologue...smh.
                https://www.youtube.com/watch?v=FRBrVgeM1d8`
            );   break;
    }
})

//flip a coin or roll a dice or tyracer or rock paper scissors(games)--> be careful of switch statements here!
client.on('message', message => {
    switch (message.content) {
        case 'flip a coin':
            computerOptions = [`Heads`, `Tails`];
            let computerNumber2 = Math.floor(Math.random()*2);
            message.channel.send(computerOptions[computerNumber2]);
            break;
        case `roll a dice`:
            computerOptions = [1, 2, 3, 4, 5, 6];
            computerNumber6 = Math.floor(Math.random()*6);
            message.channel.send(computerOptions[computerNumber6]);
            break;
        case 'typeracer':
        case 'Typeracer':
            message.channel.send(`It's time to duel! https://play.typeracer.com/`)
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
            const computerNumber3 = Math.floor(Math.random()*3);
            message.channel.send(computerOptions[computerNumber3])

    }   
})

//common phrases (brb + gonna go eat)
client.on('message', message => {
    if (message.content === 'brb' || message.content === 'gonna go eat' || message.content === `ima go eat` || message.content === `done for the day`) {
        computerOptions = [`ight sounds good`, `ight cya later`, `pce bro`]
        const computerNumber = Math.floor(Math.random()*3)
        message.channel.send(computerOptions[computerNumber])
    } else if (message.content === 'What time is it?' || message.content === 'what time is it?' || message.content === 'WHAT TIME IS IT?' || message.content === 'what time is it' || message.content === 'WHAT TIME IS IT') {
        message.channel.send(`IT'S GRIND TIME BABY!! 🔥🔥`)
    } else if (message.content === `just do it` || message.content === `JUST DO IT` || message.content === `JUST DO IT!` || message.content === `just do it!`) {

        const justDoItEmbed = new Discord.MessageEmbed()
            .setColor(`#00FF00`)
            .setImage(`https://cdn.discordapp.com/attachments/793302938453803008/804210408268759050/JustDoIt.jpg`)
        message.channel.send(justDoItEmbed)
    } else if (message.content === `workout` || message.content === `WORKOUT`) {
        const workoutEmbed = new Discord.MessageEmbed()
            .setColor(`#FFC0CB`)
            .setImage(`https://cdn.discordapp.com/attachments/787654137352683521/804211471776612362/c750a57eae01571996b538b584a166b5.png`)
            message.channel.send(workoutEmbed)
    } else if (message.content === `ayy`) {
        message.channel.send(`stfu Announcer`)
    }
})


client.on('message', message => {
    if (message.content === 'ping') {
        const testEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
	.setTitle('Some title')
	.setURL('https://discord.js.org/')
	.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
	.setDescription('Some description here')
	.setThumbnail('https://i.imgur.com/wSTFkRM.png')
	.addFields(
		{ name: 'Regular field title', value: 'Some value here' },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
		{ name: 'Inline field title', value: 'Some value here', inline: true },
	)
	.addField('Inline field title', 'Some value here', true)
	.setImage('https://i.imgur.com/wSTFkRM.png')
	.setTimestamp()
	.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');
        message.channel.send(testEmbed)
    }
})



*/







