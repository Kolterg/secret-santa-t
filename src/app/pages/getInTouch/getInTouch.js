import './getInTouch.css';

import { useState } from 'react';
import CryptoJS from 'crypto-js';
import emailjs from '@emailjs/browser';

function GetInTouchPage() {

    const [encryptData, setEncryptData] = useState('');
    const [name, setName] = useState('');
    const [text, setText] = useState('');

    const secretPass = "XkhZG4fW2t2W";

    const decryptData = (value) => {
        const bytes = CryptoJS.AES.decrypt(value, secretPass);
        const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return data;
    };

    function createSendObj() {
        const user = { name: name, santa_email: decryptData(encryptData), massage: text }
        return user;
    }

    const sendEmail = (user) => {
        emailjs.send('first_test_service', 'letter_to_Santa_template', user, '6vqiGixDTsx54CNCQ')
            .then((result) => {
                console.log(result.text);
                popupOpen('popup_ok');
            }, (error) => {
                console.log(error.text);
            });
    };

    //---------------------------------------------------------------------------------------------------------------------

    const body = document.body;// querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');

    let unlock = true;

    const timout = 800;     //Час блокування під час анімації відкриття модального вікна. Має співпадати з часом анімації!!!

    //Opens a modal window      //Відкриває модальне вікно та запитує закриття відкритих
    function popupOpen(id) {
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
    function popupCloseOne(id) {
        const currentPopup = document.getElementById(id);
        popupClose(currentPopup);
    }

    //Closes the modal window for the element       //Закриває модальне вікно по елементу
    function popupClose(popupActive, doUnlock = true) {
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

    //-----------------------------------------------------------------------------------------------------------------

    return (
        <div className="getInTouch">
            <h3>Напиши які ти хочеш подарунки</h3>
            <p>Поле для твого ім'я</p>
            <input type={'text'} value={name} onChange={e => setName(e.target.value)} />
            <p>Поле для коду Санти</p>
            <input type={'text'} value={encryptData} onChange={e => setEncryptData(e.target.value)} />
            <p>Поле для листу бажань</p>
            <textarea value={text} onChange={e => setText(e.target.value)} />
            <button onClick={() => sendEmail(createSendObj())}>Відправити</button>

            <div id={"popup_ok"} className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        <p className="popup_close" onClick={() => popupCloseOne('popup_ok')}>X</p>
                        <h3>Все гаразд</h3>
                        <div className={"popup_text"}>Листи вдало відправлений</div>
                        <button onClick={() => document.location.reload()}>Ок</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetInTouchPage;