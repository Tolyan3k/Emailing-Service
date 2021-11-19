import React, {Dispatch, FC, useState} from 'react';
import EmailService from "../../api/services/email.service";
import './Contact.css';


interface ContactFormProps {
  setModalActive: Dispatch<React.SetStateAction<boolean>> | null
}

const ContactForm: FC<ContactFormProps> =
  ({
    setModalActive= null
   }) => {
  const [email, setEmail] = useState<string>('')
  // const [tags, setTags] = useState<string[]>([])

  return (
    <div id = "div__contact">

      <div id = "contact_block">
      <h1 id = "add_contact">Добавить контакт</h1>

      <input id = "input_contact"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder={'Введите e-mail'}
      />
      {/*<input*/}
      {/*  value={tags}*/}
      {/*  onChange={(e) => setTags([e.target.value])}*/}
      {/*  type="text"*/} 
      {/*  placeholder={'Добавьте тег для e-mail'}*/}
      {/*/>*/}
      <button id = "input_button"
        onClick={() => {
          EmailService.addEmail(email, [])
            .finally(() => {
              if (setModalActive) {
                setModalActive(false)
              }
            })
          setEmail('')
        }}
      >
        Завершить редактирование
      </button>
  
      </div>
      
    </div>
  );
};

export default ContactForm;