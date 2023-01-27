import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = (userName, userEmail) => {
  
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
    <form ref={userForm} onSubmit={sendEmail} className={"contentRegistrationPage"}>
      <label>Name</label>
      <input type="text" name="user_name" value={userName} />
      <label>Email</label>
      <input type="email" name="user_email" value={userEmail} />
      {/* <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" /> */}
      {sendEmail()}
    </form>
  );
};