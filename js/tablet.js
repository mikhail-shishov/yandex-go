document.addEventListener('DOMContentLoaded', function () {
    // step navigation
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.step .btn');

    nextButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            const currentStep = document.querySelector('.step.is-active');
            const currentIndex = Array.from(steps).indexOf(currentStep);
            const nextIndex = currentIndex + 1;

            if (steps[nextIndex]) {
                currentStep.classList.remove('is-active');
                steps[nextIndex].classList.add('is-active');
            }
        });
    });

    const input = document.querySelector('.code__input');
    const keyboard = document.querySelector('.keyboard');
    const keys = keyboard.querySelectorAll('.key');
    const maxLength = 4;

    input.addEventListener('click', () => {
        keyboard.classList.remove('is-hidden');
    });

    document.addEventListener('click', (e) => {
        if (!keyboard.contains(e.target) && e.target !== input) {
            keyboard.classList.add('is-hidden');
        }
    });

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const value = key.textContent;

            if (key.classList.contains('key--backspace')) {
                input.value = input.value.slice(0, -1);
            } else if (key.classList.contains('key--submit')) {
                keyboard.classList.add('is-hidden');

                const currentStep = document.querySelector('.step.is-active');
                const stepsArray = Array.from(document.querySelectorAll('.step'));
                const currentIndex = stepsArray.indexOf(currentStep);

                if (input.value.length < maxLength) {
                    const lockedStep = document.querySelector('.step--locked');
                    if (lockedStep) {
                        currentStep.classList.remove('is-active');
                        lockedStep.classList.add('is-active');
                    }
                } else {
                    const nextStep = stepsArray[currentIndex + 1];
                    if (nextStep) {
                        currentStep.classList.remove('is-active');
                        nextStep.classList.add('is-active');
                    }
                }
            } else {
                if (input.value.length < maxLength) {
                    input.value += value;
                }
            }
        });
    });

    input.addEventListener('input', () => {
        const value = input.value.padEnd(4, 'X');
        input.setAttribute('placeholder', value);
    });
});