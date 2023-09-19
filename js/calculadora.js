var operacionActual = '';
var resultado = 0;
var operadorAnterior = '';
var decimalFlag = false;

function actualizarDisplay() {
    var display = document.getElementById('display');
    display.value = operacionActual;
}

function agregarNumero(numero) {
    operacionActual += numero;
    actualizarDisplay();
}

function agregarOperador(operador) {
    if (operadorAnterior !== '') {
        calcularResultado();
    }
    operadorAnterior = operador;
    operacionActual += operador;
    actualizarDisplay();
    decimalFlag = false;
}

function agregarDecimal() {
    if (!decimalFlag) {
        operacionActual += '.';
        actualizarDisplay();
        decimalFlag = true;
    }
}

function calcularResultado() {
    resultado = eval(operacionActual);
    operacionActual = resultado.toString();
    operadorAnterior = '';
    actualizarDisplay();
    decimalFlag = false;
}

function limpiarDisplay() {
    operacionActual = '';
    resultado = 0;
    operadorAnterior = '';
    actualizarDisplay();
    decimalFlag = false;
}

function borrarUltimoDigito() {
    operacionActual = operacionActual.slice(0, -1);
    actualizarDisplay();
}

document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            agregarNumero(parseInt(event.key));
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            agregarOperador(event.key);
            break;
        case '.':
            agregarDecimal();
            break;
        case 'Enter':
            calcularResultado();
            break;
        case 'Delete':
            limpiarDisplay();
            break;
        case 'Backspace':
            borrarUltimoDigito();
            break;
    }
});
