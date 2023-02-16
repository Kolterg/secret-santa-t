import './getInTouch.css';

import { useState } from 'react';
import CryptoJS from 'crypto-js';
import emailjs from '@emailjs/browser';
import { popupOpen, popupClose, popupCloseOne } from '../../modules/popup'

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

    //Closes the modal window with escape       //Закриває модальне вікно за ESC-ейпом
    document.addEventListener('keydown', function ({ which }) {
        if (which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });

    return (
        <div className="getInTouch">
            <h3>Напиши які ти хочеш подарунки</h3>
            <p>Поле для твого ім'я</p>
            <input type={'text'} value={name} onChange={e => setName(e.target.value)} />
            <p>Поле для коду Санти</p>
            <input type={'text'} value={encryptData} onChange={e => setEncryptData(e.target.value)} />
            <p>Поле для листу бажань</p>
            <textarea value={text} onChange={e => setText(e.target.value)} />
            <button className='submitBtn' onClick={() => popupOpen('popup1')}>Відправити</button>


            <div id={"popup1"} className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        <p className="popup_close" onClick={() => popupCloseOne('popup1')}>X</p>
                        <h3>Ви точно хочете відправити лист?</h3>
                        <div className={"popup_text"}>Ваше ім'я {name}<br/>
                            Ваш лист:<br/>
                            {text}<br/>
                        </div>
                        <button onClick={() => popupCloseOne('popup1')}>Назад</button>
                        <button onClick={() => sendEmail(createSendObj())}>Ок</button>
                    </div>
                </div>
            </div>

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