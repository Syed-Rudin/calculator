let display = document.querySelector('.display')
let keys = document.querySelector('.keys');
let AC = document.querySelector('[data-action=clear');

keys.addEventListener('click', function(e) {
    if ((Number(e.target.textContent)) || (Number(e.target.textContent) === 0)) {
        if (display.textContent === '0') {
            display.textContent = e.target.textContent;
        } else {
            display.textContent += e.target.textContent;
        }
    }
});


function addition() {

};


AC.addEventListener('click', function() {
    display.textContent = '';
});