/*
Displays the question of the day and quote at 6am every morning
*/
const Discord = require('discord.js');

const client = new Discord.Client();

const fs = require('fs');
const config = require('../../config.json');

const saveFileName = './QOTDData.json';
const quoteFile = './combined_quotes.txt';
const questionFile = './raw_questions.txt';

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
  const channel = client.channels.cache.get('793302938453803008');

  if (guild && channel) {
    // Display a question of the day
    // Increase JSON by 1
    let QOTDData = {};
    // Read JSON file
    if (fs.existsSync(saveFileName)) {
      const dataString = fs.readFileSync(saveFileName, 'utf8');
      QOTDData = JSON.parse(dataString);
    } else {
      // if file doesn't exist, then make default from this
      const textQuotes = fs.readFileSync(quoteFile, 'utf8').split('\n');
      const textQuestions = fs.readFileSync(questionFile, 'utf8').split('\n');
      QOTDData = {
        quoteNumber: 0,
        questionNumber: 0,
        quotes: textQuotes,
        questions: textQuestions,
      };
    }
    // if we reach the end
    if (QOTDData.quoteNumber >= QOTDData.quotes.length) {
      QOTDData.quoteNumber = 0;
    }
    if (QOTDData.questionNumber >= QOTDData.questions.length) {
      QOTDData.questionNumber = 0;
    }

    const {
      quoteNumber, questionNumber, quotes, questions,
    } = QOTDData; // destructure
    let currentQuote = quotes.filter((quote, index) => quoteNumber === index);
    [currentQuote] = currentQuote;

    let currentQuestion = questions.filter(
      (question, index) => questionNumber === index,
    );
    [currentQuestion] = currentQuestion;

    // Update QOTD
    QOTDData.quoteNumber += 1;
    QOTDData.questionNumber += 1;
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
