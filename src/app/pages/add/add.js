import { useState } from 'react';
import './add.css'
import AddUserData from './component/addUsersDataComponent';
import { ContactUs } from './component/sendEmail'

export default function Add() {

    let [usersCount, setUsersCount] = useState(3);
    let [usersAreDefined, setUsersAreDefined] = useState(false);

    let users = [];

    let getUsersData = (userName, userEmail, index) => {
        users[index] = { name: userName, email: userEmail }
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
                    users.map(value => ContactUs(value.name, value.email))
                    sendEmails();
                    // randomUsers2(users);
                }}>Підтвердити</button>
            </div>
        </div>
    }

    function getRandom(length, exclusion) {
        let rand;
        while (true) {
            let flag = true;
            let randomValue = Math.floor(Math.random() * length);
            for (let ex of exclusion) {
                if (ex === randomValue) {
                    flag = false;
                    break;
                }

            }
            if (flag) {
                rand = randomValue;
                break;
            }
        }
        
        return rand;
    }


    function randomUsers(santas) {
        let receivers = [...santas];
        let exclusions = [];

        for (let i = 0; i < santas.length; i++) {
            let exclusionsInCicle = [...exclusions];
            exclusionsInCicle.push(i);
            let receiversNum = getRandom(santas.length, exclusionsInCicle);
            console.log(santas[i].name + " дарує подарунок " + receivers[receiversNum].name);
            exclusions.push(receiversNum);
        }

        exclusions = [];
    }

    function randomUsers2(santas) {
        const santasClones = [...santas];
        const randIdx = Math.floor(Math.random() * santasClones.length);
        while(santasClones.length) {
            const [receiver] = santasClones.splice(randIdx, 1);
            console.log(receiver.name)
        }
    }

    function sendEmails() {
        for (let count of countArr) {
            setTimeout(() => {
                console.log("Pre send log");
                document.getElementById(`form${count}`).submit();
                console.log("After send log");
            }, 1100);
        }
    }

    return (
        <div className='add'>
            {usersAreDefined ? usersRegistration() : add()}
            {/* {ContactUs()} */}
        </div>
    );
}