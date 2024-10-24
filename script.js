document.addEventListener('DOMContentLoaded', () => {
    const ageSelect = document.getElementById('age');
    const weightSelect = document.getElementById('weight');
    const heightSelect = document.getElementById('height');
   
    for (let i = 1; i <= 100; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        ageSelect.appendChild(option);
    }

    for (let i = 30; i <= 200; i += 0.5) {
        const option = document.createElement('option');
        option.value = i.toFixed(1);
        option.textContent = i.toFixed(1);
        weightSelect.appendChild(option);
    }

    for (let i = 1.0; i <= 2.5; i += 0.01) {
        const option = document.createElement('option');
        option.value = i.toFixed(2);
        option.textContent = i.toFixed(2);
        heightSelect.appendChild(option);
    }

    const calculateButton = document.getElementById('calculateButton');
    const clearButton = document.getElementById('clearButton');
    const waterResultBox = document.getElementById('waterResultBox');
    const imcResultBox = document.getElementById('imcResultBox');
    const container = document.querySelector('.container');

    function calculate() {
        const age = parseFloat(document.getElementById('age').value);
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);

        if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
            alert('Por favor, selecione todos os campos com valores válidos.');
            return;
        }

        let waterIntake = 0;
        if (age <= 17) {
            waterIntake = weight * 40 / 1000;
        } else if (age <= 55) {
            waterIntake = weight * 35 / 1000;
        } else if (age <= 65) {
            waterIntake = weight * 30 / 1000;
        } else {
            waterIntake = weight * 25 / 1000;
        }
        document.getElementById('waterResult').textContent = `Você deve beber ${waterIntake.toFixed(2)} litros de água por dia.`;

        const imc = weight / (height * height);
        let imcResult = '';
        if (imc < 18.5) {
            imcResult = 'Abaixo do peso.';
        } else if (imc < 24.9) {
            imcResult = 'Peso normal.';
        } else if (imc < 29.9) {
            imcResult = 'Sobrepeso.';
        } else {
            imcResult = 'Obesidade.';
        }
        document.getElementById('imcResult').textContent = `Seu IMC é ${imc.toFixed(2)} (${imcResult}).`;

        container.classList.add('move-up');
        waterResultBox.classList.add('show');
        imcResultBox.classList.add('show');
    }

    calculateButton.addEventListener('click', calculate);

    clearButton.addEventListener('click', () => {
        document.getElementById('age').value = '';
        document.getElementById('weight').value = '';
        document.getElementById('height').value = '';

        document.getElementById('waterResult').textContent = '';
        document.getElementById('imcResult').textContent = '';
        waterResultBox.classList.remove('show');
        imcResultBox.classList.remove('show');
        container.classList.remove('move-up');
    });

    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            calculate();
        }
    });
});