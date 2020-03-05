let calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
    secondOperand: null,
};

const worker = new Worker('js/calc-worker.js')

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
        let toDisplay = calculator.displayValue;
        display.value = parseFloat(toDisplay);
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
            return;
        } else {
            let evalResult;
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
        if (calculator.firstOperand === null || calculator.secondOperand === null) {
            calculator.displayValue = '0.'
            updateDisplay();
            return;
        }

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

    if (target.classList.contains('fib')) {
        if (calculator.displayValue) {
            worker.postMessage(calculator.displayValue)
            worker.onmessage = (e) => {
                alert(`result of Fibonacci calc is: ${e.data}`)
            }
        }
        console.log('fib is clicked', target.value);
        return;
    }




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

