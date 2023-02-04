import { useState } from "react";

function AddUserData({ value, getUsersData }) {

    let [userName, setUserName] = useState('');
    let [userEmail, setUserEmail] = useState('');

    getUsersData(userName, userEmail, value - 1)

    return (
        <div className="addUserData">
            <h4>Користувач {value}</h4>
            <form id={`form${value}`} className={"contentRegistrationPage"}>
                <input type={'text'} name={'userName'} placeholder={"Введіть ім'я учасника"} value={userName} onChange={e => setUserName(e.target.value)} />
                <input type={'text'} name={'userEmail'} placeholder={"Введіть email учасника"} value={userEmail} onChange={e => setUserEmail(e.target.value)} />
            </form>
        </div>
    );
}

export default AddUserData;