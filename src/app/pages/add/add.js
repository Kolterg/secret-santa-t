import { useState } from 'react';
import './add.css'
import AddUserData from './component/addUsersDataComponent';
import emailjs from '@emailjs/browser';

export default function Add() {

    let [usersCount, setUsersCount] = useState(3);
    let [usersAreDefined, setUsersAreDefined] = useState(false);

    let santaList = [];
    let users = [];

    let getUsersData = (userName, userEmail, index) => {
        users[index] = { name: userName, email: userEmail }
    }

    function add() {
        return <div className='contentAddPage'>
            <h3>Задайте кількість учасників</h3>
            <input type={'number'} name={'inputUsersCount'} min={'2'} placeholder={'Введить кілкість учасників'} value={usersCount} onChange={e => setUsersCount(e.target.value)} />
            <button onClick={() => setUsersAreDefined(true)}>OK</button>
        </div>
    }

    let countArr = [];
    for (let i = 0; i < usersCount; i++) {
        countArr[i] = i + 1;
    }

    function usersRegistration() {
        return <div className='contentRegistrationPage'>
            <h3>Введіть дані учасників</h3>
            {
                countArr.map((value, index) => <AddUserData
                    key={index}
                    value={value}
                    getUsersData={getUsersData}
                />)
            }
            <div className='buttonBox'>
                <button onClick={() => setUsersAreDefined(false)}>Назад</button>
                <button onClick={() => {
                    randomUsers();
                    createSantaList();
                    // santaList.map(value => sendEmail(value))
                    popupOpen('popup')
                }}>Підтвердити</button>
            </div>
        </div>
    }

    // function getRandom(length, exclusion) {
    //     let rand;
    //     while (true) {
    //         let flag = true;
    //         console.log("Rand-----------------------------------------Rand");
    //         let randomValue = Math.floor(Math.random() * length);
    //         console.log("ex: " + exclusion);
    //         console.log("Random value " + randomValue);
    //         for (let ex of exclusion) {
    //             if (ex === randomValue) {
    //                 console.log(`ex: ${ex} === randVal: ${randomValue}`);
    //                 flag = false;
    //                 break;
    //             }
    //             console.log(`ex: ${ex} !== randVal: ${randomValue}`);

    //         }
    //         if (flag) {
    //             rand = randomValue;
    //             console.log("Break");
    //             break;
    //         }
    //     }
    //     console.log("-Rand-----------------------------------------Rand-");
    //     return rand;
    // }


    // function randomUsers(santas) {
    //     let receivers = [...santas];
    //     let exclusions = [];
    //     console.log("-----------------------------------------");

    //     for (let i = 0; i < santas.length; i++) {
    //         let exclusionsInCicle = [...exclusions];
    //         exclusionsInCicle.push(i);
    //         let receiversNum = getRandom(santas.length, exclusionsInCicle);
    //         console.log("Num of reciver " + receiversNum);
    //         console.log(santas[i].name + " дарує подарунок " + receivers[receiversNum].name);
    //         exclusions.push(receiversNum);
    //         console.log("exclusions: " + exclusions);
    //     }
    // }

    function randomUsers() {

        for (let i = 0; i < users.length; i++) {
            const j = Math.floor(Math.random() * users.length);
            [users[i], users[j]] = [users[j], users[i]];
        }
        console.log(users);
    }

    function createSantaList() {

        for (let i = 0; i < users.length; i++) {
            let sender = users[i];
            let receiver = users[(i + 1) % users.length];
            santaList[i] = { receiver_name: receiver.name, receiver_email: receiver.email, sender_name: sender.name, sender_email: sender.email }
            console.log(santaList[i]);
            // console.log('sender: ', users[i].user_name);
            // console.log('receiver: ', users[(i + 1) % users.length].user_name);
        }
    }

    const sendEmail = (user) => {
        emailjs.send('first_test_service', 'test_santa_form', user, '6vqiGixDTsx54CNCQ')
            .then((result) => {
                console.log(result.text);
                popupOpen('popup_ok')
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
    document.addEventListener('keydown', function ({which}) {
        if (which === 27) {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });

    //-----------------------------------------------------------------------------------------------------------------

    return (
        <div className='add'>
            {usersAreDefined ? usersRegistration() : add()}
            {/* {ContactUs()} */}
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
                            santaList.map(value => sendEmail(value))
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
                        <p className="popup_close" onClick={() => popupCloseOne('popup_ok')}>X</p>
                        <h3>Все гаразд</h3>
                        <div className={"popup_text"}>Листи вдало відправлені</div> 
                        <button onClick={() => popupCloseOne('popup_ok')}>Повернутись</button>
                    </div>
                </div>
            </div>
        </div>
    );
}