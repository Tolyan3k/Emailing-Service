import React, {Dispatch, FC, useState} from 'react';
import EmailService from "../../api/services/email.service";

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
    <div>
      <input
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
      <button
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
  );
};

export default ContactForm;