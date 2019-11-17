// DOM elements
const resultEL = document.getElementById('result');
const lengthEL = document.getElementById('length');
const uppercaseEL = document.getElementById('uppercase');
const lowercaseEL = document.getElementById('lowercase');
const numbersEL = document.getElementById('numbers');
const symbolsEL = document.getElementById('symbols');
const generateEL = document.getElementById('generate');
const clipboardEL = document.getElementById('clipboard');

// Functions into object - randomFunc
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Event listener on click of the "Generate password" button
generateEL.addEventListener('click', () => {
    const length = +lengthEL.value;
    const hasLower = lowercaseEL.checked;
    const hasUpper = uppercaseEL.checked;
    const hasNumber = numbersEL.checked;
    const hasSymbol = symbols.checked;


    resultEL.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

// Copy password to clipboard
clipboardEL.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = resultEL.innerText;

    if(!password) {
        return;
    }

    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    textarea.remove();
    alert('Password copied to clipboard!');
})

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
    // 1. Init password variable
    // 2. Filter out unchecked types
    // 3. Loop over the length and call generator function for each type
    // 4. Add final password to the password variable and return it

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    //console.log('typesCount: ', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);

    //console.log('typesArr: ', typesArr);

    // if none checked
    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];

            //console.log('funcName: ', funcName);

            generatedPassword += randomFunc[funcName]();
        });
    }

    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Generator functions
// http://www.net-comber.com/charset.html

// Generate random lowercase letter from A - Z (26 characters)
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Generate random uppercase letter from A - Z (26 characters)
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Generate random number from 0 - 9 (10 numbers)
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Generate random symbol
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//console.log(getRandomLower());
//console.log(getRandomUpper());
//console.log(getRandomNumber());
//console.log(getRandomSymbol());