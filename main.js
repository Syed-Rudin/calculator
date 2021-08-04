// Select display and buttons
let display = document.querySelector('.display')
let keys = document.querySelector('.keys');
let AC = document.querySelector('[data-action=clear]');
let addBtn = document.querySelector('[data-action=add]');
let subtractBtn = document.querySelector('[data-action=subtract]');
let multiplyBtn = document.querySelector('[data-action=multiply]');
let divideBtn = document.querySelector('[data-action=divide]');
let equalsBtn = document.querySelector('[data-action=calculate]')
let decimalBtn = document.querySelector('[data-action=decimal]');
let signBtn = document.querySelector('[data-action=signchange]');
let percentBtn = document.querySelector('[data-action=percentage]');

// Variables to keep track of calculator state
let equation = '';
let ans = false;
let errorOccured = false;

// Add numbers to display when clicked on
keys.addEventListener('click', function(e) {
    // If clicked button is a number or equal to 0
    if ((Number(e.target.textContent)) || (Number(e.target.textContent) === 0)) {
        // If display is just 0 or there's a previous answer or an error is occuring
        if (display.textContent === '0' || ans || errorOccured) {
            // Set the display equal to the number pressed
            display.textContent = e.target.textContent;
            equation = e.target.textContent
            // Set ans and errorOccured variable to false
            ans = false;
            errorOccured = false;
        } else {
            // Add number onto display and equation
            display.textContent += e.target.textContent;
            equation += e.target.textContent
        }
    }
});


// Define functions for operator keys

// Functionality for addition key
function addition() {
    if (ans) {
        display.textContent = `${ans}+`;
        equation = `${ans} + `;
        ans = false;
    } else if ((display.textContent.slice(-1) === ')') || (display.textContent.slice(-1) === '%')) {
        display.textContent += '+';
        equation += ' + ';
    } 
    else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    } else {
        display.textContent += '+';
        equation += ' + ';
    }
};

// Functionality for subtraction key
function subtraction() {
    if (ans) {
        display.textContent = `${ans}-`;
        equation = `${ans} - `;
        ans = false;
    } else if ((display.textContent.slice(-1) === ')') || (display.textContent.slice(-1) === '%')) {
        display.textContent += '-';
        equation += ' - ';
    } 
    else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    } else {
        display.textContent += '-';
        equation += ' - ';
    }
};

// Functionality for multiplication key
function multiplication() {
    if (ans) {
        display.textContent = `${ans}x`;
        equation = `${ans} * `;
        ans = false;
    } else if ((display.textContent.slice(-1) === ')') || (display.textContent.slice(-1) === '%')) {
        display.textContent += 'x';
        equation += ' * ';
    } 
    else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    }else {
        display.textContent += 'x';
        equation += ' * ';
    }
};

// Functionality for division key
function division() {
    if (ans) {
        display.textContent = `${ans}÷`;
        equation = `${ans} / `;
        ans = false;
    } else if ((display.textContent.slice(-1) === ')') || (display.textContent.slice(-1) === '%')) {
        display.textContent += '÷';
        equation += ' / ';
    } 
    else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    }
    else {
        display.textContent += '÷';
        equation += ' / ';
    }
};

// Functionality for decimal key
function decimal() {
    if (ans) {
        display.textContent = '0.';
        equation = '0.';
        ans = false;
    } else if (display.textContent.slice(-1) === '0') {
        display.textContent += '.';
        equation += '.';
    } else if (!Number(display.textContent.slice(-1)) || (display.textContent.slice(-1) === '.') || (errorOccured)) {
        return;
    } else {
        display.textContent += '.'
        equation += '.';
    }
}

// Functionality for signchange key
function signChange() {
    ans = false;
    let liEquation = equation.split(' ');
    let lastDigit = (liEquation.length-1);

    // Check if last digit is a number or equal to 0
    if (!Number(liEquation[lastDigit]) || (liEquation[lastDigit] === '0')) {
        // If it is, do nothing
        return;
    }  else {
        // Check if last digit is a negative number
        if (Number(liEquation[lastDigit]) < 0) {
            // If it is, append the negative sign outside of brackets to make it positive
            liEquation.splice(lastDigit, 0, '-(');
        } else {
            // If not, append negative sign within brackets
            liEquation.splice(lastDigit, 0, '(-');
        }
    }

    // Add closing bracket and join back equation
    liEquation.push(')');
    let newEquation = liEquation.join(' ');
    let newDisplay = liEquation.join('');
    
    equation = newEquation;
    // Replace all instances of * with x for consistency
    display.textContent = newDisplay.replace(/[*]/g, 'x');
}

// Functionality for percentage key
function percentage() {
    ans = false;
    let liEquation = equation.split(' ');
    let lastDigit = (liEquation.length-1);

    // Check if last digit is not anumber or equal to 0
    if (!Number(liEquation[lastDigit]) || (liEquation[lastDigit] === '0')) {
        // If true, do nothing
        return;
    }  

    liEquation.splice(lastDigit, 0, '(')

    // Add closing bracket and divide number by 100 then
    // join back equation
    liEquation.push('/ 100 )');
    let newEquation = liEquation.join(' ');
    equation = newEquation;

    // Add percentage sign next to number     
    display.textContent += '%';
}

// Functionality for equals key
function equals() {
    try {
        display.textContent = Number(+eval(equation).toFixed(9));
        ans = display.textContent;
        equation = ans;
    } catch(error) {
        // If error, log the error and display an error 
        console.error(error);
        display.textContent = 'Error!';
        errorOccured = true;
        equation = '';
    }  
}

// Add functions to appropriate buttons
addBtn.addEventListener('click', addition);
subtractBtn.addEventListener('click', subtraction);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division);
decimalBtn.addEventListener('click', decimal);
signBtn.addEventListener('click', signChange);
percentBtn.addEventListener('click', percentage);
equalsBtn.addEventListener('click', equals);

// Allow AC button to clear display and
// reset all variables
AC.addEventListener('click', function() {
    display.textContent = '0';
    ans = false;
    errorOccured = false;
    equation = '';
});