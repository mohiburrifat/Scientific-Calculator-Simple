let display = document.getElementById('display');
let currentInput = ''; // Track the current input for the calculator

// Append numbers and other characters to the display
function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

// Append operators (+, -, *, /, etc.)
function appendOperator(operator) {
    if (currentInput === '') return;
    currentInput += operator;
    display.value = currentInput;
}

// Append scientific functions (sin, cos, etc.)
function appendFunction(func) {
    currentInput += func + '(';
    display.value = currentInput;
}

// Clear the display
function clearDisplay() {
    currentInput = '';
    display.value = '';
}

// Delete the last character from the display
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

// Convert degrees to radians
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Main calculate function for evaluating expressions
function calculate() {
    try {
        let result = currentInput;

        // Replace scientific functions with proper JavaScript Math functions
        result = result.replace(/sin\((.*?)\)/g, 'Math.sin(degreesToRadians($1))');
        result = result.replace(/cos\((.*?)\)/g, 'Math.cos(degreesToRadians($1))');
        result = result.replace(/tan\((.*?)\)/g, 'Math.tan(degreesToRadians($1))');
        result = result.replace(/log\((.*?)\)/g, 'Math.log10($1)'); // log base 10
        result = result.replace(/sqrt\((.*?)\)/g, 'Math.sqrt($1)'); // sqrt

        // Replace power operation with Math.pow (e.g., 2^3 -> Math.pow(2, 3))
        result = result.replace(/(\d+)\^(\d+)/g, 'Math.pow($1, $2)');

        // Evaluate the final expression
        currentInput = eval(result).toString();
        display.value = currentInput;
    } catch (error) {
        display.value = 'Error';
        currentInput = '';
    }
}
