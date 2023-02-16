import './add.css';

import { useEffect, useState } from 'react';
import AddUserData from './component/addUsersDataComponent';
import emailjs from '@emailjs/browser';
import CryptoJS from "crypto-js";
import { popupOpen, popupClose, popupCloseOne } from '../../modules/popup';

export default function Add() {

    const [usersCount, setUsersCount] = useState(3);
    const [usersAreDefined, setUsersAreDefined] = useState(false);
    // const [isValid, setIsValid] = useState();

    let santaList = [];
    let users = [];

    const secretPass = "XkhZG4fW2t2W";

    const getUsersData = (userName, userEmail, index) => {
        users[index] = { name: userName, email: userEmail };
    }

    function add() {
        return <div className='contentAddPage'>
            <h3>Задайте кількість учасників</h3>
            <input type={'number'} name={'inputUsersCount'} min={'3'} placeholder={'Введить кілкість учасників'} value={usersCount} onChange={e => setUsersCount(e.target.value)} />
            <button id={'usCountBtn'} onClick={() => setUsersAreDefined(true)}>OK</button>
        </div>
    }

    useEffect(() => { usersCount > 2 ? document.getElementById('usCountBtn').disabled = false : document.getElementById('usCountBtn').disabled = true }, [usersCount]);

    let countArr = [];

    for (let i = 0; i < usersCount; i++) {
        countArr[i] = i + 1;
    }

    function usersRegistration() {
        return <div className='contentRegistrationPage'>
            <button className='buttonBack' onClick={() => setUsersAreDefined(false)}>Назад</button>
            <h3>Введіть дані учасників</h3>
            {
                countArr.map((value, index) => <AddUserData
                    key={index}
                    value={value}
                    getUsersData={getUsersData}
                />)
            }
            <div className='buttonBox'>
                <button className='submitBtn' onClick={() => {
                    randomUsers();
                    createSantaList();
                    popupOpen('popup');
                }}>Підтвердити</button>
            </div>
        </div>
    }

    function randomUsers() {
        for (let i = 0; i < users.length; i++) {
            const j = Math.floor(Math.random() * users.length);
            [users[i], users[j]] = [users[j], users[i]];
        }
    }

    function createSantaList() {
        for (let i = 0; i < users.length; i++) {
            const sender = users[i];
            let receiver = users[(i + 1) % users.length];
            santaList[i] = { receiver_name: receiver.name, receiver_email: receiver.email, sender_name: sender.name, sender_email: encryptData(sender.email), massage: '' };
            console.log(santaList[i]);
        }
    }

    const sendEmail = (user) => {
        emailjs.send('first_test_service', 'test_santa_form', user, '6vqiGixDTsx54CNCQ')
            .then((result) => {
                console.log(result.text);
                popupOpen('popup_ok');
            }, (error) => {
                console.log(error.text);
            });
    };

    const encryptData = (value) => {
        const data = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            secretPass
        ).toString();

        return data;
    };

    //Closes the modal window with escape       //Закриває модальне вікно за ESC-ейпом
    document.addEventListener('keydown', function ({ which }) {
        if (which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
        
        if (which === 13 && usersCount > 2) setUsersAreDefined(true);
    });

    return (
        <div className='add'>
            {usersAreDefined ? usersRegistration() : add()}

            <div id={"popup"} className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        <p className="popup_close" onClick={() => popupCloseOne('popup')}>X</p>
                        <h3>Popup 1</h3>
                        <div className={"popup_text"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet
                            corporis, dolore earum illum maxime nesciunt obcaecati odit placeat provident quia quod
                            reiciendis repellendus sed tenetur!
                        </div>
                        <p>Бажаєте підтвердити дані?</p>
                        <button onClick={() => {
                            santaList.map(value => sendEmail(value));
                            users = [];
                            santaList = [];
                            setUsersAreDefined(false)
                            popupCloseOne('popup')
                        }}>Підтвердити</button>
                        <button onClick={() => popupCloseOne('popup')}>Повернутись</button>
                    </div>
                </div>
            </div>
            <div id={"popup_ok"} className="popup">
                <div className="popup_body">
                    <div className="popup_content">
                        <button className="popup_close" onClick={() => popupCloseOne('popup_ok')}>X</button>
                        <h3>Все гаразд</h3>
                        <div className={"popup_text"}>Листи вдало відправлені</div>
                        <button onClick={() => popupCloseOne('popup_ok')}>Ок</button>
                    </div>
                </div>
            </div>
        </div>
    );
}