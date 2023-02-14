import { useState } from "react";

function AddUserData({ value, getUsersData }) {

    const [form, setForm] = useState({ name: '', email: '' });
    const [errors, setErrors] = useState({
        name: {
            message: "",
            dirty: false
        },
        email: {
            message: "",
            dirty: false
        }
    });

    getUsersData(form.name, form.email, value - 1);

    function checkValidation() {
        let err = JSON.parse(JSON.stringify(errors));
        const emailCond = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/;

        if (!form.name.trim()) {
            err.name.message = "Name is required";
        } else {
            err.name.message = "";
        }

        if (!form.email.trim()) {
            err.email.message = "Email is required";
        } else if (!form.email.match(emailCond)) {
            err.email.message = "Please ingress a valid email address";
        } else {
            err.email.message = "";
        }

        setErrors(err);
    }

    function onBlur(e) {
        const { name } = e.target;
        if (errors[name].dirty) {
            checkValidation();
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: { ...errors[name], dirty: true } });
        if (errors[name].dirty) {
            checkValidation();
        }
    }


    return (
        <div className="addUserData">
            <h4>Користувач {value}</h4>
            <form id={`form${value}`} className={"contentRegistrationPage"}>
                <div>
                    <label htmlFor={'username'}>Ім'я </label>
                    <input className={"textInput"} type={'text'} name={'name'} placeholder={"Введіть ім'я учасника"} value={form.name} onChange={handleChange} onBlur={onBlur} />
                </div>
                {errors.name.dirty && errors.name.message ? <p>{errors.name.message}</p> : null}
                <div>
                    <label htmlFor={'username'}>Е-пошта </label>
                    <input className={"textInput"} type={'text'} name={'email'} placeholder={"Введіть email учасника"} value={form.email} onChange={handleChange} onBlur={onBlur} />
                </div>
                {errors.email.dirty && errors.email.message ? <p>{errors.email.message}</p> : null}
            </form>
        </div>
    );
}

export default AddUserData;