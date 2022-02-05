/*
Displays the question of the day and quote at 6am every morning
*/
const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../../config.json');

const saveFileName = '/home/milk/personalBot/Personal-Bot/scheduled/QOTD/QOTDData.json';
const quoteFile = '/home/milk/personalBot/Personal-Bot/scheduled/QOTD/quotes.txt';
const questionFile = '/home/milk/personalBot/Personal-Bot/scheduled/QOTD/questions.txt';
// const saveFileName = 'QOTDData.json';
// const quoteFile = 'quotes.txt';
// const questionFile = 'questions.txt';

const saveData = (userData) => {
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
  console.log('QOTD Scheduler is ready');
  const guild = client.guilds.cache.get('787354978166898708');
  const channel = client.channels.cache.get('813852697462833173'); // real
  // const channel = client.channels.cache.get('793302938453803008'); // test

  // Grab from text files
  const textQuotes = fs
    .readFileSync(quoteFile, 'utf8')
    .split('\n')
    .filter((quote) => quote);
  const textQuestions = fs
    .readFileSync(questionFile, 'utf8')
    .split('\n')
    .filter((question) => question);

  if (guild && channel) {
    let QOTDData = {};
    // Read JSON file
    if (fs.existsSync(saveFileName)) {
      const dataString = fs.readFileSync(saveFileName, 'utf8');
      QOTDData = JSON.parse(dataString);
    } else {
      // if file doesn't exist, then make default from this
      QOTDData = {
        quoteNumber: Math.floor(Math.random() * textQuotes.length),
        questionNumber: Math.floor(Math.random() * textQuestions.length),
        quotes: textQuotes,
        questions: textQuestions,
      };
    }
    // If the files have changed, change it.
    if (QOTDData.quotes !== textQuotes) QOTDData.quotes = textQuotes;
    if (QOTDData.questions !== textQuestions) QOTDData.questions = textQuestions;

    const {
      quoteNumber, questionNumber, quotes, questions,
    } = QOTDData; // destructure

    // find text from random number
    let currentQuote = quotes.filter((quote, index) => quoteNumber === index);
    [currentQuote] = currentQuote;
    let currentQuestion = questions.filter(
      (question, index) => questionNumber === index,
    );
    [currentQuestion] = currentQuestion;

    // Update QOTD
    QOTDData.quoteNumber = Math.floor(Math.random() * quotes.length);
    QOTDData.questionNumber = Math.floor(Math.random() * questions.length);

    // Save data to JSON file
    saveData(QOTDData);

    // Display QOTD embed
    const QOTDMessage = new Discord.MessageEmbed()
      .setColor('#70483c')
      .setTitle(
        ':brain: :question:  Quote/Question of the Day  :question: :brain:  ',
      )
      .addFields(
        {
          name: 'Quote',
          value: `\`\`\`${currentQuote}\`\`\``,
          inline: false,
        },
        {
          name: 'Question',
          value: `\`\`\`${currentQuestion}\`\`\``,
          inline: false,
        },
      );

    channel.send(QOTDMessage).then(() => client.destroy());
  } else {
    channel.send('Something went wrong!').then(() => client.destroy());
  }
});
