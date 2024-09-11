// Função para limpar o visor da calculadora
function clearDisplay() {
    document.getElementById('display').value = ''; // Define o valor do visor como vazio
}

// Função para apagar o último caractere digitado
function deleteLast() {
    let display = document.getElementById('display'); // Pega o elemento do visor
    display.value = display.value.slice(0, -1); // Remove o último caractere do valor do visor
}

// Função para adicionar um número ao visor
function appendNumber(number) {
    let display = document.getElementById('display'); // Pega o elemento do visor
    display.value += number; // Adiciona o número clicado ao valor atual do visor
}

// Função para adicionar um operador ao visor
function appendOperator(operator) {
    let display = document.getElementById('display'); // Pega o elemento do visor
    let lastChar = display.value[display.value.length - 1]; // Obtém o último caractere no visor

    // Verifica se o último caractere é um operador
    if (['+', '-', '*', '/'].includes(lastChar)) {
        // Se for, substitui o operador anterior pelo novo operador
        display.value = display.value.slice(0, -1) + operator;
    } else {
        // Se não for, adiciona o operador ao valor atual do visor
        display.value += operator;
    }
}

// Função para calcular o resultado da expressão no visor
function calculate() {
    let display = document.getElementById('display'); // Pega o elemento do visor
    try {
        // Tenta calcular a expressão no visor usando a função eval()
        display.value = eval(display.value);
    } catch {
        // Se ocorrer um erro na expressão, exibe 'Erro' no visor
        display.value = 'Erro';
    }
}