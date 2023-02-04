import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';


function AddUserData({ value, getUsersData }) {

    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');

    getUsersData(userName, userEmail, value - 1)

    const userForm = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('first_test_service', 'test_santa_form', userForm.current, '6vqiGixDTsx54CNCQ')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <div className="addUserData">
            <h4>Користувач {value}</h4>
            <form id={`form${value}`} ref={userForm} onSubmit={sendEmail} className={"contentRegistrationPage"}>
                <input type={'text'} name={'userName'} placeholder={"Введіть ім'я учасника"} value={userName} onChange={e => setUserName(e.target.value)} />
                <input type={'text'} name={'userEmail'} placeholder={"Введіть email учасника"} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
                <input type={'submit'} id={`send${value}`} className={'submitBtn'} />
            </form>
        </div>
    );
}

export default AddUserData;