let display = document.querySelector('.display')
let keys = document.querySelector('.keys');
let AC = document.querySelector('[data-action=clear]');
let addBtn = document.querySelector('[data-action=add]');
let subtractBtn = document.querySelector('[data-action=subtract]');
let multiplyBtn = document.querySelector('[data-action=multiply]');
let divideBtn = document.querySelector('[data-action=divide]');
let equalsBtn = document.querySelector('[data-action=calculate]')
let signBtn = document.querySelector('.signchange');
let decimalBtn = document.querySelector('[data-action=decimal]');
let equation = '';
let ans = false;
let errorOccured = false;

// Add numbers to display when clicked on
keys.addEventListener('click', function(e) {
    if ((Number(e.target.textContent)) || (Number(e.target.textContent) === 0)) {
        if (display.textContent === '0' || ans || errorOccured) {
            display.textContent = e.target.textContent;
            equation = e.target.textContent
            ans = false;
            errorOccured = false;
        } else {
            display.textContent += e.target.textContent;
            equation += e.target.textContent
        }
    }
});


// Define functions for operator keys
function addition() {
    if (ans) {
        display.textContent = `${ans}+`;
        equation = `${ans} + `;
        ans = false;
    } else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    } else {
        display.textContent += '+';
        equation += ' + ';
    }
};
 
function subtraction() {
    if (ans) {
        display.textContent = `${ans}-`;
        equation = `${ans} - `;
        ans = false;
    } else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    } else {
        display.textContent += '-';
        equation += ' - ';
    }
};

function multiplication() {
    if (ans) {
        display.textContent = `${ans}x`;
        equation = `${ans} * `;
        ans = false;
    } else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    }else {
        display.textContent += 'x';
        equation += ' * ';
    }
};

function division() {
    if (ans) {
        display.textContent = `${ans}÷`;
        equation = `${ans} / `;
        ans = false;
    } else if (!Number(display.textContent.slice(-1)) || (errorOccured)) {
        return;
    }
    else {
        display.textContent += '÷';
        equation += ' / ';
    }
};

function decimal() {
    if (ans) {
        display.textContent = '0.';
        equation = '0.';
        ans = false;
    } else if (display.textContent.slice(-1) === '0') {
        display.textContent += '.';
        equation += '.';
    }
    else if (!Number(display.textContent.slice(-1)) || (display.textContent.slice(-1) === '.') || (errorOccured)) {
        return;
    } else {
        display.textContent += '.'
        equation += '.';
    }
}

function equals() {
    try {
        display.textContent = eval(equation);
        ans = display.textContent;
    } catch(error) {
        // If error, log the error and display an error 
        console.error(error);
        display.textContent = 'Error!';
        errorOccured = true;
        equation = '0';
    }  
}

// TODO
// 1. Count from right to left
// 2. Stop when it reaches the end of a number
// 3. Add brackets around it

function signChange() {
    
}


// Add functions to appropriate buttons
addBtn.addEventListener('click', addition);
subtractBtn.addEventListener('click', subtraction);
multiplyBtn.addEventListener('click', multiplication);
divideBtn.addEventListener('click', division);
decimalBtn.addEventListener('click', decimal);
equalsBtn.addEventListener('click', equals);



// Allow AC button to clear display
AC.addEventListener('click', function() {
    display.textContent = '0';
    ans = false;
    errorOccured = false;
    equation = '';
});