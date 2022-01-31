const fs = require('fs');

const fileName = 'largeQuotes.txt';
const saveFileName = `new_${fileName}`;
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

if (fs.existsSync(fileName)) {
  const dataString = fs.readFileSync(fileName, 'utf8');

  const readLines = dataString.split('\n');

  let newLine = '';
  const arrayLines = [];
  readLines.forEach((line) => {
    if (line !== '----') {
      newLine += ` ${line}`;
    } else {
      arrayLines.push(newLine);
      newLine = '';
    }
  });

  const _arrayLines = [];
  arrayLines.forEach((line) => {
    const trimmed = line.substring(1);
    _arrayLines.push(trimmed);
  });

  // array of strings
  let newArray = [];
  _arrayLines.forEach((string) => {
    const splitString = string.split('    ').join(' ~');
    newArray.push(splitString);
  });

  newArray = newArray.join('\n');
  fs.writeFileSync(saveFileName, newArray);
}
