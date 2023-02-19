let mathematicalExpression = document.getElementById(`mathematical-expression`);
let newInsertion = document.getElementById(`new-insertion`)

function detectEquals() {
    if (newInsertion.innerText.includes(`=`)) {
        newInsertion.innerText = newInsertion.innerText.slice(2);
    }
}

function addNumber(selectedNumber) {
    detectEquals();
    newInsertion.innerText += selectedNumber;
}

function addToExpression(selectedExpression) {
    if (newInsertion.innerText.includes(`=`)) {
        newInsertion.innerText = newInsertion.innerText.slice(1);
    }
    if (newInsertion.innerText !== ``) {
        let numberWithoutSign = (newInsertion.innerText.includes(`-`)) ? newInsertion.innerText.slice(1) : newInsertion.innerText;
        mathematicalExpression.innerText +=  ` ` + newInsertion.innerText + ` ` + selectedExpression;
        newInsertion.innerText = ``;
    }
}

function execute() {
    if (mathematicalExpression.innerText.length > 0 && newInsertion.innerText.length > 0) {

        let expression = mathematicalExpression.innerText.concat(newInsertion.innerText);
        expression = expression.replace(`--`, `+`);

        let result = eval(expression);

        
        if (isNaN(result) || result == `Infinity`) {
            result = `undefined`;
        }

        newInsertion.innerText = `= ` + result;
        mathematicalExpression.innerText = ``;
    }
}

document.getElementById(`change-theme`).addEventListener(`click`, function () {
    document.getElementById(`body`).className = (document.getElementById(`body`).className == `light-theme`) ? `dark-theme` : `light-theme`;
    document.getElementById(`change-theme`).innerText = (document.getElementById(`body`).className == `light-theme`) ? `light_mode` : `dark_mode`;
});

let listOfNumbers = document.getElementsByClassName(`number`);

for (let index = 0; index < listOfNumbers.length; index++) {
    let currentItem = listOfNumbers[index];
    currentItem.addEventListener(`click`, () => addNumber(currentItem.innerText));
}

document.getElementById(`unsigned`).addEventListener(`click`, function () {
    detectEquals();
    newInsertion.innerText = (newInsertion.innerText.includes(`-`)) ? newInsertion.innerText.slice(1) : `-`.concat(newInsertion.innerText);
});

document.getElementById(`float-point`).addEventListener(`click`, function () {
    detectEquals();
    if (!(newInsertion.innerText.includes(`.`))) {
        addNumber(`.`);
    }
});

document.getElementById(`backspace`).addEventListener(`click`, function () {
    detectEquals();
    if (newInsertion.innerText.length > 0) {
        newInsertion.innerText = newInsertion.innerText.slice(0, newInsertion.innerText.length - 1);
    }
});

document.getElementById(`clear-entry`).addEventListener(`click`, () => newInsertion.innerText = ``);

document.getElementById(`clear`).addEventListener(`click`, function () {
    mathematicalExpression.innerText = ``;
    newInsertion.innerText = ``;
})

let listOfOperations = document.getElementsByClassName(`operation`);

for (let index = 0; index < listOfOperations.length; index++) {
    let currentItem = listOfOperations[index];
    currentItem.addEventListener(`click`, function () {
        
        if (newInsertion.innerText.includes(`undefined`)) {
            newInsertion.innerText = ``;
        }

        addToExpression(currentItem.innerHTML);

    });
}

document.getElementById(`equals`).addEventListener(`click`, execute);