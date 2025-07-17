document.addEventListener('DOMContentLoaded', function () {
    // step navigation
    const steps = document.querySelectorAll('.step');
    const nextButtons = document.querySelectorAll('.step .btn');

    nextButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const currentStep = document.querySelector('.step.is-active');
            currentStep.classList.remove('is-active');

            const isRestart = btn.classList.contains('btn--restart');

            let nextIndex;
            if (isRestart) {
                nextIndex = 0;

                circleButtons.forEach(b => b.classList.remove('is-active'));
                localStorage.removeItem('activeCircleButtons');
            } else {
                const currentIndex = Array.from(steps).indexOf(currentStep);
                nextIndex = currentIndex + 1;
            }

            if (steps[nextIndex]) {
                steps[nextIndex].classList.add('is-active');

                // автопереход с step--3
                if (steps[nextIndex].classList.contains('step--3')) {
                    setTimeout(() => {
                        steps[nextIndex].classList.remove('is-active');
                        if (steps[nextIndex + 1]) {
                            steps[nextIndex + 1].classList.add('is-active');
                        }
                    }, 3000);
                }
            }
        });
    });

    // toggle logic for logo
    const circleButtons = document.querySelectorAll('.step__circle-button');

    circleButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('is-active');

            // save active to localStorage
            const activeIndexes = Array.from(circleButtons)
                .map((b, i) => b.classList.contains('is-active') ? i : null)
                .filter(i => i !== null);

            localStorage.setItem('activeCircleButtons', JSON.stringify(activeIndexes));
        });
    });

    // state from localStorage
    // const saved = JSON.parse(localStorage.getItem('activeCircleButtons') || '[]');
    // saved.forEach(i => {
    //     if (circleButtons[i]) {
    //         circleButtons[i].classList.add('is-active');
    //     }
    // });
});