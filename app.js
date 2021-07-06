const screen = document.querySelector('.screen');
let display = document.createElement('p');
display.setAttribute('class', 'display');
screen.appendChild(display);
display.textContent = '0'
let displayNumber;

const clearAll = document.querySelector('.clear-all');

const operators = document.querySelectorAll('.operator');

const digits = document.querySelectorAll('.digit');

const decimalPoint = document.querySelector('.decimal');

const equalsButton = document.querySelector('.equals-key');

const negator = document.querySelector('.negator');

const percentOperator = document.querySelector('.percentage');

const deleteKey = document.querySelector('.delete-key');

const allButtons = document.querySelector('.button');

let num1 = '';
let num2 = '';
let currentOperator = null;
let clearScreen = false;

clearAllScreen = () => {
    display.textContent = '0';
    clearScreen = true;
    num1 = '';
    num2 = '';
    currentOperator = null;
}

resetScreen = () => {
    display.textContent = '';
    clearScreen = false;
}

add = (num1, num2) => {
    let sum = num1 + num2;
    return sum;
}

subtract = (num1, num2) => {
    let difference = num1 - num2;
    return difference;
}

multiply = (num1, num2) => {
    let product = num1 * num2;
    return product;
}

let divide = (num1, num2) => {
    let quotient = num1 / num2;
    return quotient;
}

operate = (num1, num2, operator) => {
    // operator = document.querySelector('.operator')
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}

setOperator = (operator) => {
    if (currentOperator !== null) performCalculation();
    num1 = Number(display.textContent);
    currentOperator = operator;
    clearScreen = true;
}

function roundNumber(number) {
    return Math.round(number * 1000) / 1000;
}

function performCalculation() {
    if (currentOperator === null || clearScreen) return;
    num2 = Number(display.textContent);
    display.textContent = roundNumber(operate(num1, num2, currentOperator));
    currentOperator = null;
}

addNegation = () => {
    display.textContent = Number(-display.textContent);
}

calculatePercentage = (number) => {
    number = display.textContent
    let percentage = roundNumber(number / 100);
    display.textContent = percentage;
    return percentage;
}

addDecimal = () => {
    if (display.textContent === '') display.textContent = '0';
    if (display.textContent.includes('.')) return;
    display.textContent += '.';
    return parseFloat(display.textContent);
}

displayOnScreen = (e) => {
    let number = e.target.innerText;
    if (display.textContent === '0' || clearScreen) resetScreen();

    display.textContent += number;

}

deleteValues = () => {
    display.textContent = display.textContent.toString().slice(0, -1);
}

function addKeyboardSupport(e) {
    // console.log(e.key)
    digits.forEach(digit => {
        if (digit.innerText === e.key) {
            if (display.textContent === "0" || clearScreen) resetScreen();
            display.textContent = display.textContent + e.key;
        }
    })
    operators.forEach(operator => {
        if (operator.textContent == e.key) setOperator(operator.textContent);
    })
    switch (e.key) {
        case "Backspace":
            return deleteValues()
        break;
        case "%":
            return calculatePercentage();
        case "_":
            return addNegation();
        case "Escape":
            return clearAllScreen();
        case "Enter":
            return performCalculation();
        case ".":
            return addDecimal();
      default:
        break;
    }
}

for (let i = 0; i < digits.length; i++) {
  digits[i].addEventListener("click", displayOnScreen);
}

operators.forEach(operator => operator.addEventListener('click', () => setOperator(operator.textContent)))

equalsButton.addEventListener('click', performCalculation);
clearAll.addEventListener('click', clearAllScreen);
negator.addEventListener('click', addNegation);
percentOperator.addEventListener('click', calculatePercentage);
decimalPoint.addEventListener('click', addDecimal);
deleteKey.addEventListener('click', deleteValues);
window.addEventListener('keydown', addKeyboardSupport);

// Adding Gradient Background

randomNumber = (min, max) => {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}


