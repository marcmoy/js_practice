const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter number:", (res) => {
      sum += parseInt(res);
      console.log(`Partial sum: ${sum}`);
      addNumbers(sum, --numsLeft, completionCallback);
    });
  } else {
    completionCallback(sum);
  }
}

addNumbers(0, 3, sum => {
  console.log(`Total Sum: ${sum}`);
  reader.close();
});
