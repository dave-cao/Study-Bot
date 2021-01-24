const Discord = require('discord.js');
const client = new Discord.Client();

//send a message when a role is added
exports.run = async (client, oldMember, newMember) => {
    const messagechannel = msg.guild.channels.find('name', 'bot-tests');
    if (oldMember.roles.size < newMember.roles.size) {
        const embed = new Discord.RichEmbed()
            .setColor('#FE2E2E')
            .setTimestamp()
            .setAuthor('Role added!')
            .addField(`Member:`, `${oldMember.user.tag} (${oldMember.id})`);
        for (const role of newMember.roles.map(x => x.id)) {
            if (!oldMember.roles.has(role)) {
                embed.addField(`Role:`, `${oldMember.guild.roles.get(role).name}`);
            }
        }
        messagechannel.send({
            embed
        });
    }
}


client.once('ready', () => {
	console.log('Real Grinder is Online!');
});

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
            "There is a time to be a gandoo, and there is a time to a hero. Who are you?",
            "https://www.youtube.com/watch?v=dvFFb65pWnU"
        ];
        const computerNumber = Math.floor(Math.random() * 4);
        message.channel.send(computerOptions[computerNumber])
       
    }
})



//People comments
client.on('message', message => {
    if (message.content === 'Christina' || message.content === 'christina' || message.content === 'CHRISTINA') {
        computerOptions = ['A creature known to occupy the habitat known as the "Bedroom". This fascinating creature does not set a foot off the bed; in a perpetual state of lying down. This creature is known to have found a loop hole to the Grinding arithmetic. Able to gain levels while doing nothing. Essentially a bug in the system!'];
        const computerNumber = Math.floor(Math.random() * 1);
        message.channel.send(computerOptions[computerNumber])
    } else if (message.content === `Nolan` || message.content === `nolan` || message.content === 'Lord Nolan' || message.content === 'NOLAN') {
        computerOptions = [
            `A deep and philosophical creature once you get get to know it. A people pleaser, sometimes a pushover, but one of the **kindest and compassionate creatures known in existence**. Do not be afraid to share your stories with it, for this creature is understanding. 
        
            It can be found either on a red chair or the couch, where it is usually seen with a book in hand or a game controller. For reference, a snapshot of this creature can be found in <#793591458656813066> where you may witness it on the hunt for better grades (red sweater).
        
            *Note: An **Honorary Member** of the Grind Time server.*`
        ];
        const computerNumber = Math.floor(Math.random() * 1);
        message.channel.send(computerOptions[computerNumber]);
    } else if (message.content === `Rodeem` || message.content === `rodeem` || message.content === `ro` || message.content === `Ro` || message.content === 'RO' || message.content === 'RODEEM') {
        computerOptions = [
            `A gigantic monstrous beast of a creature. The only word that can be used to describe it is **"deezed"**. Passionate and kind, there is basically no way for anyone to dislike it. One of the most supportive creatures I've ever met in my life, nothing can go wrong with befriending this one. 
            
            It can usually be found grinding a shit game online (DOTA 2) or a shit game in real life (Football (jk, I love Football)). If not, then it is banging its head on its keyboard trying to figure out discord code.
            
            For reference, a snapshot of this creature can be found in <#793591458656813066>. Whether the creature is sleeping or studying...we have yet to find out (yellow sweater). 
            
            *Note: An **Honorary Member** of the Grind Time server.*`

        ];
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
            
            A creature known to value its friendships and relationships very much. Solid in its core values and beliefs, it is the type of creature to straight forwardly tell you what it's thinking with no strings attached. If I would ever need someone to rely on for something, I would glady put my life in its hands.
            
            *Masha'Allah my friend.*`
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
    } else if (message.content === `David` || message.content === `david` || message.content === 'Cow' || message.content === 'KingCao' || message.content === 'DAVID') {
        computerOptions = [
            `Owner of the server...also not a bitch.`,
            `If this man is not Grinding then call him out. Don't let him be a bitch`,
            `Stats:
                Physical Capability: **Caveman**
                Intellect: **0 IQ**
                Hard Work: **110%**
              `
        ];
        const computerNumber = Math.floor(Math.random()*3); 
        message.channel.send(computerOptions[computerNumber]);
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
    }
})













client.login('Nzk0MzE3MTUxMDYyMDY1MTky.X-5Dfg.Eg9J4kiiz4fEiqECdatSimOxis0');