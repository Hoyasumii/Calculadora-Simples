let mathematicalExpression = document.getElementById(`mathematical-expression`);
let newInsertion = document.getElementById(`new-insertion`);

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

export {mathematicalExpression, newInsertion, detectEquals, addNumber, addToExpression, execute};
