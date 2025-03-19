(function enforceRegexPuzzle() {
    document.body.classList.add('no-scroll');

    const overL = document.createElement('div');
    overL.classList.add('fullscreen-overlay');

    const patterns = [
        /^[A-Z]{3}\d{2}$/
    ];

    const rndReg = patterns[Math.floor(Math.random() * patterns.length)];

    const modal = document.createElement('div');
    modal.classList.add('modal-container');

    modal.innerHTML = `
        <h2>Ny sho ? Plaki Plaki ili normaldaki ?</h2>
        <p class="regex-display">${rndReg}</p>
        <input type="text" id="regexInput" placeholder="Enter a matching string">
        <button id="submitRegexBtn">Give up</button>
        <p id="errorMsg">Loser.</p>
    `;

    overL.appendChild(modal);
    document.body.appendChild(overL);

    const inputField = document.getElementById('regexInput');
    const submitBtn = document.getElementById('submitRegexBtn');
    const errorMsg = document.getElementById('errorMsg');

    inputField.focus();

    submitBtn.addEventListener('click', () => {
        const input = inputField.value;
        if (rndReg.test(input)) {
            document.body.classList.remove('no-scroll');
            overL.remove();
        } else {
            errorMsg.style.display = 'block';
            errorMsg.style.opacity = '1';
            inputField.value = '';
            inputField.focus();
        }
    });

    function isModalOpen() {
        return document.querySelector('.fullscreen-overlay') !== null;
    }

    // Block interactions 
    document.addEventListener('click', (e) => {
        if (!modal.contains(e.target)) e.stopPropagation();
    }, true);

    document.addEventListener("contextmenu", (e) => {
            if (isModalOpen()) {
                e.preventDefault();
            }
        },
        true);

    // Allow typing in input field
    document.addEventListener('keydown', (e) => {
        if (isModalOpen()) {
            if (
                e.key === 'Escape' ||
                e.key === 'F12' ||
                e.key === 'F5' ||
                (e.ctrlKey && (e.key === 'r' || e.key === "R")) ||
                (e.ctrlKey && (e.shiftKey && e.key === 'I'))
            ) {
                e.preventDefault();
            }
        }
    }, true);
})();
