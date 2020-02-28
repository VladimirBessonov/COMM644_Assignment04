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
            calculator.displayValue = (displayValue === '0' ) ? digit : displayValue + digit;
        }
        if (firstOperand !== null) {

            calculator.displayValue =  displayValue + digit;
        }


        // // Overwrite `displayValue` if the current value is '0' otherwise append to it
        // if (displayValue === '0' && firstOperand === null) {
        //     calculator.displayValue = digit
        // } else if (displayValue !== '0' && firstOperand === null) {
        //     calculator.displayValue =  displayValue + digit;
        // } else if (firstOperand !== null) {
        //     calculator.displayValue =  displayValue + digit;
        // }

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
        const {firstOperand, secondOperand, operator, displayValue} = calculator;
        if (calculator.operator === null ) {
            calculator.operator = target.value;
            calculator.firstOperand = displayValue;
            calculator.displayValue = '';
            console.log(calculator);
        } else {
            calculator.secondOperand = displayValue;
            console.log('operator', operator)
            console.log('first',calculator.firstOperand)
            console.log('second',calculator.secondOperand)
            calculator.displayValue = eval( `${firstOperand} ${operator} ${secondOperand}`)
            console.log(eval( `${firstOperand} ${operator} ${secondOperand}`))
            console.log(calculator.displayValue)
            console.log(calculator)

        }
        console.log('operator', target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        console.log('decimal', target.value);
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