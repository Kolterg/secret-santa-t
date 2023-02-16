const body = document.body;     // querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timout = 800;     //Час блокування під час анімації відкриття модального вікна. Має співпадати з часом анімації!!!

//Opens a modal window      //Відкриває модальне вікно та запитує закриття відкритих
export function popupOpen(id) {
    const currentPopup = document.getElementById(id);
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else {
            bodyLock();
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener('click', function (e) {
            if (!e.target.closest('.popup_content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

//Closes the modal window for ID        //Закриває модальне вікно за ID
export function popupCloseOne(id) {
    const currentPopup = document.getElementById(id);
    popupClose(currentPopup);
}

//Closes the modal window for the element       //Закриває модальне вікно по елементу
export function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

//Locks the page when a modal window is open        //Блокує сторінку при відкритті модального вікна
function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
            const el = lockPadding[i];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timout);
}

//Unlocks the page when the modal window is closed      //Розблоковує сторінку коли модальне вікно закривається.
function bodyUnLock() {
    setTimeout(function () {
        if (lockPadding.length > 0) {
            for (let i = 0; i < lockPadding.length; i++) {
                const el = lockPadding[i];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timout);
}

//Closes the modal window with escape       //Закриває модальне вікно за ESC-ейпом
document.addEventListener('keydown', function ({ which }) {
    if (which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});