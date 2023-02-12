import { useState, useEffect } from "react";

function AddUserData({ value, getUsersData }) {

    const [validation, setValidation] = useState({ name: '', email: '' });
    const [user, setUser] = useState({ name: '', email: '' });
    const [formErrors, setFormErrors] = useState({});

    getUsersData(user.name, user.email, value - 1);

    function checkValidation() {
        let errors = {};
        const emailCond = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

        if (!user.name.trim()) {
            errors.name = "Name is required";
        } else {
            errors.name = "";
        }

        if (!user.email.trim()) {
            errors.email = "Email is required";
        } else if (!user.email.match(emailCond)) {
            errors.email = "Please ingress a valid email address";
        } else {
            errors.email = "";
        }

        setValidation(errors);
    }

    useEffect(() => {
        checkValidation();
    }, [user]);

    function handleChange(e) {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }


    return (
        <div className="addUserData">
            <h4>Користувач {value}</h4>
            <form id={`form${value}`} className={"contentRegistrationPage"}>
                <div>
                    <label htmlFor={'username'}>Ім'я </label>
                    <input className={"textInput"} type={'text'} name={'name'} id={"username"} placeholder={"Введіть ім'я учасника"} value={user.name} onChange={handleChange} />
                    {JSON.stringify(validation.name)}
                </div>
                <div>
                    <label htmlFor={'username'}>Е-пошта </label>
                    <input className={"textInput"} type={'text'} name={'email'} placeholder={"Введіть email учасника"} value={user.email} onChange={handleChange} />
                    {JSON.stringify(validation.email)}

                </div>
            </form>
        </div>
    );
}

export default AddUserData;