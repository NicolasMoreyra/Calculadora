document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.getElementById('buttons');
    const clearButton = document.getElementById('clear');
    const saveButton = document.getElementById('save');

    let historial = JSON.parse(localStorage.getItem('historial')) || [];

    function updateDisplay(value) {
        display.value += value;
    }

    function clearDisplay() {
        display.value = '';
    }

    function saveToHistory(expression, result) {
        historial.push({ expression, result });
        localStorage.setItem('historial', JSON.stringify(historial));
    }

    function handleButtonClick(value) {
        if (value === '=') {
            try {
                const result = eval(display.value);
                updateDisplay(` = ${result}`);
                saveToHistory(display.value, result);
            } catch (error) {
                updateDisplay('Error');
            }
        } else if (value === 'C') {
            clearDisplay();
        } else {
            updateDisplay(value);
        }
    }

    function createButton(value) {
        const button = document.createElement('button');
        button.textContent = value;
        button.classList.add('btn', 'btn-secondary');
        button.addEventListener('click', function() {
            handleButtonClick(value);
        });
        return button;
    }

    function loadButtons() {
        const buttonValues = ['7', '8', '9', '/',
                              '4', '5', '6', '*',
                              '1', '2', '3', '-',
                              '0', '.', '=', '+'];

        buttonValues.forEach(value => {
            const button = createButton(value);
            buttons.appendChild(button);
        });
    }

    loadButtons();

    clearButton.addEventListener('click', function() {
        clearDisplay();
    });

    saveButton.addEventListener('click', function() {
        saveToHistory(display.value, eval(display.value));
        alert('Historial guardado');
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        const validKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '/',
                           '*', '-', '+', '=', '.', 'Enter', 'Backspace'];

        if (validKeys.includes(key)) {
            event.preventDefault();
            handleButtonClick(key);
        }
    });
});
