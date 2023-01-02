// Assignment Code
var generateBtn = document.querySelector("#generate");

// Create the generatePassword() funciton//

function generatePassword() {
// create an object to hold the user input data
  var passwordComplexityObj = {
    passwordLength: " ",
    lowerCaseCharacters: " ",
    upperCaseCharacters: " ",
    numericalCharacters: " ",
    specialCharacters: " "
  }
// asks the user how long of a password they want
  var passwordLengthInput = prompt("Please input the desired password length from 8 to 128 characters");
  if (passwordLengthInput < 8 || passwordLengthInput > 128) {
    window.alert("You need to select a number between 8 and 128. \n Please Try Again");
    passwordLengthInput = null;
    passwordComplexityObj.passwordLength = passwordLengthInput
    return "Try Again"
  } else {
    passwordComplexityObj.passwordLength = passwordLengthInput
  }
  console.log(passwordComplexityObj)
// create a reference object for interpolation for the next 4 questions
  const questionInput = {
    lowerCaseCharacters: 'lowercase letters',
    upperCaseCharacters: 'uppercase letters',
    specialCharacters: 'special characters',
    numericalCharacters: 'numerical characters'
  }

  const inputKeys = Object.keys(questionInput)
  const inputValues = Object.values(questionInput)
// loop through the questionInputs and prompts the user for the respective information
// wrties the answers back into the passwordComplexityObj
  for (let i = 0; i < inputKeys.length; i++) {
    let currentKey = inputKeys[i]
    userInput = prompt(`Would you like to include ${inputValues[i]}`);
    userInput = userInput.toLowerCase();
    if (userInput != "yes" && userInput != "no") {
      window.alert("Please Type 'yes' or 'no'");
      userInput = null;
      passwordComplexityObj[currentKey] = userInput
      return "Try Again"
    } else {
      passwordComplexityObj[currentKey] = userInput
    } 
    console.log(passwordComplexityObj)
  }
//creates all the character libraries necessary
  var password = [];
  password.length = passwordComplexityObj.passwordLength;
  const upperAlpha = Array.from(Array(26)).map((e, i) => i + 65);
  const upperCaseAlphabet = upperAlpha.map((x) => String.fromCharCode(x));
  const lowerAlpha = Array.from(Array(26)).map((e, i) => i + 97);
  const lowerCaseAlphabet = lowerAlpha.map((x) => String.fromCharCode(x));
  const numberArray = Array.from(Array(10).keys())

//Drops a portion of the ASCII table into an array to be sliced for the special characters.
  const fullAsciiTable = [];
  for (let i = 0; i < 94; i++) {
    fullAsciiTable[i] = String.fromCharCode(i+33)  
  }

  let specialCharactersArray = []
  specialCharactersArray = specialCharactersArray.concat(fullAsciiTable.slice(0,15),fullAsciiTable.slice(25,32),fullAsciiTable.slice(58,64),fullAsciiTable.slice(90,94))
  console.log(specialCharactersArray)

// Create a reference object that stores all the character libraries to be easily refernced by common keys
  const passwordCharacterObj = {
    fullTable: fullAsciiTable,
    lowerCaseCharacters: lowerCaseAlphabet,
    upperCaseCharacters: upperCaseAlphabet,
    numericalCharacters: numberArray,
    specialCharacters: specialCharactersArray
}
// funciton to generate a random number that takes maximum as an argument
  function generateRandomNumber(max) {
    return Math.floor(Math.random()*max)
  }
// Create an object to store the character options that the user has requested
  let passwordCharacterOptions = []
  const my_values = Object.values(passwordComplexityObj)
  const my_keys = Object.keys(passwordComplexityObj)

// iterates through the 4 yes or no questions to add the correct characters to the options
  for (let i = 0; i < my_values.length; i++) {
    if (my_values[i] == 'yes') {
      let currentKey2 = my_keys[i];
      var additionalArray = passwordCharacterObj[currentKey2];
      passwordCharacterOptions = passwordCharacterOptions.concat(additionalArray);
    } 
  }
  console.log(passwordCharacterOptions)
// if check to make sure the user selected some rules
if (passwordCharacterOptions.length == 0) {
  return "Please Try Again and select valid character parameters"
}
// calls for the password length from the user input then generates random numbers
// where the length of the character options is the maximum possible random number
  for (let i = 0; i < password.length; i++) {
  var randomNumber = generateRandomNumber(passwordCharacterOptions.length);
  password[i] = passwordCharacterOptions[randomNumber];
  console.log(randomNumber)
  }
//remove commas and stringify the password for presentation
  password = password.join('')
  password = password.toString()
  console.log(password)
  return password 
}


// Write password to the #password input
function writePassword() {

  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
