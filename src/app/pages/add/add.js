import { useState } from 'react';
import './add.css'
import AddUserData from './component/addUsersDataComponent';
import { ContactUs } from './component/sendEmail'
import emailjs from '@emailjs/browser';

export default function Add() {

    let [usersCount, setUsersCount] = useState(3);
    let [usersAreDefined, setUsersAreDefined] = useState(false);

    let users = [];

    let getUsersData = (userName, userEmail, index) => {
        users[index] = { user_name: userName, user_email: userEmail }
    }

    function add() {
        return <div className='contentAddPage'>
            <h3>Задайте кількість учасників</h3>
            <input type={'number'} name={'inputUsersCount'} placeholder={'Введить кілкість учасників'} value={usersCount} onChange={e => setUsersCount(e.target.value)} />
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
                    // users.map(value => sendEmail(value))
                    randomUsers2(users);
                }}>Підтвердити</button>
            </div>
        </div>
    }

    function getRandom(length, exclusion) {
        let rand;
        while (true) {
            let flag = true;
            console.log("Rand-----------------------------------------Rand");
            let randomValue = Math.floor(Math.random() * length);
            console.log("ex: " + exclusion);
            console.log("Random value " + randomValue);
            for (let ex of exclusion) {
                if (ex === randomValue) {
                    console.log(`ex: ${ex} === randVal: ${randomValue}`);
                    flag = false;
                    break;
                }
                console.log(`ex: ${ex} !== randVal: ${randomValue}`);

            }
            if (flag) {
                rand = randomValue;
                console.log("Break");
                break;
            }
        }
        console.log("-Rand-----------------------------------------Rand-");
        return rand;
    }


    function randomUsers(santas) {
        let receivers = [...santas];
        let exclusions = [];
        console.log("-----------------------------------------");

        for (let i = 0; i < santas.length; i++) {
            let exclusionsInCicle = [...exclusions];
            exclusionsInCicle.push(i);
            let receiversNum = getRandom(santas.length, exclusionsInCicle);
            console.log("Num of reciver " + receiversNum);
            console.log(santas[i].name + " дарує подарунок " + receivers[receiversNum].name);
            exclusions.push(receiversNum);
            console.log("exclusions: " + exclusions);
        }
    }

    function randomUsers2(santas) {

        for (let i = 0; i < santas.length; i++) {
            const j = Math.floor(Math.random() * santas.length);
            [santas[i], santas[j]] = [santas[j], santas[i]];
        }

        for (let i = 0; i < santas.length; i++) {
            console.log('sender: ', santas[i].user_name);
            console.log('receiver: ', santas[(i + 1) % santas.length].user_name);
        }

    }

    const sendEmail = (user) => {
        emailjs.send('first_test_service', 'test_santa_form', user, '6vqiGixDTsx54CNCQ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className='add'>
            {usersAreDefined ? usersRegistration() : add()}
            {/* {ContactUs()} */}
        </div>
    );
}