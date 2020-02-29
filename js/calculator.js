let calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    secondOperand: null,
};

const calcInit = { ...calculator}

window.onload = () => {

    function inputDigit(digit) {
        const {displayValue, firstOperand} = calculator;

        if (firstOperand === null) {
            calculator.displayValue = (displayValue === '0' || '' ) ? digit : displayValue + digit;
        }
        if (firstOperand !== null) {

            calculator.displayValue =  displayValue + digit;
        }
    }
    function updateDisplay() {
        const display = document.querySelector('.calculator-screen');
        display.value = calculator.displayValue;
    }

    updateDisplay();

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        if (calculator.operator === null ) {
            calculator.operator = target.value;
            calculator.firstOperand = calculator.displayValue;
            calculator.displayValue = '';
            console.log(calculator);
            console.log('operator', target.value);
            return;
        } else {
            let evalResult;
            console.log(calculator.operator)
            calculator.secondOperand = calculator.displayValue;
            evalResult = eval( `${calculator.firstOperand}  ${calculator.operator}  ${calculator.secondOperand}`)
            calculator.displayValue = evalResult;
            calculator.firstOperand = evalResult
            calculator.secondOperand = null;
            calculator.operator = target.value;
            updateDisplay();
            calculator.displayValue = '';
            return;
        }

    }

    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
        return;
    }

    if (target.classList.contains('equal-sign')) {
        let result;
        let secondOperand = calculator.displayValue;
        result = eval( `${calculator.firstOperand}  ${calculator.operator}  ${secondOperand}`);
        calculator.displayValue = result;
        updateDisplay();
        calculator.firstOperand =  result;
        calculator.secondOperand = null;
        calculator.operator = null;
        console.log('after equal sign:', calculator)
        return;
    }

    // if (target.classList.contains('number')) {
    //
    //     return;
    // }

    if (target.classList.contains('all-clear')) {
        calculator = { ...calcInit}
        updateDisplay();
        console.log('clear', target.value);
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

}

