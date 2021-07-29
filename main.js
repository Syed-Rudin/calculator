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
            ans = false;
            errorOccured = false;
        } else {
            display.textContent += e.target.textContent;
        }
    }
});


// Define functions for operator keys
function addition() {
    if (ans) {
        display.textContent = `${ans}+`;
        ans = false;
    } else if (errorOccured) {
        display.textContent = '+';
        errorOccured = false;
    }
    else {
        display.textContent += '+';
    }
};

function subtraction() {
    if (ans) {
        display.textContent = `${ans}-`;
        ans = false;
    } else if (errorOccured) {
        display.textContent = '-';
        errorOccured = false;
    } else {
        display.textContent += '-';
    }
};

function multiplication() {
    if (ans) {
        display.textContent = `${ans}x`;
        ans = false;
    } else if (errorOccured) {
        display.textContent = 'x';
        errorOccured = false;
    } else {
        display.textContent += 'x';
    }
};

function division() {
    if (ans) {
        display.textContent = `${ans}÷`;
        ans = false;
    } else if  (errorOccured) {
        display.textContent = '÷';
        errorOccured = false;
    } else {
        display.textContent += '÷';
    }
};

function decimal() {
    if (ans) {
        display.textContent = '.';
        ans = false;
    } else if (errorOccured) {
        display.textContent = '.';
        errorOccured = false;
    } else {
        display.textContent += '.'
    }
}

function equals() {
    try {
        display.textContent = display.textContent.replace(/÷/g, "/");
        display.textContent = display.textContent.replace(/x/g, "*");
        display.textContent = eval(display.textContent);
        ans = display.textContent;
    } catch(error) {
        // If error, log the error and display an error 
        console.error(error);
        display.textContent = 'Error!';
        errorOccured = true;
        console.log(errorOccured);
        // // Reset back to default after 1 second
        // setTimeout(function () {
        //     display.textContent = '0';
        // }, 1000);
    }  
}

// TODO
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
});