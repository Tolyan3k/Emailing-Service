import React, {Dispatch, FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import EmailTemplateService from "../../api/services/emailTemplate.service";
import "./emailTemplateCreate.css"

interface EmailTemplateCreateProps {
  setModalActive: Dispatch<React.SetStateAction<boolean>> | null
}

const EmailTemplateCreateForm: FC<EmailTemplateCreateProps> =
  ({
    setModalActive
   }) => {
  const [title, setTitle] = useState<string>('')
  const [header, setHeader] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [footer, setFooter] = useState<string>('')

    const clearFields = () => {
      setTitle('')
      setHeader('')
      setBody('')
      setFooter('')
    }
  
  return (
    <form id = "template_creation_form">
      <h1 id = "make_template">Создать шаблон рассылки</h1>
      <div>

      <div id = "make_form">
      <input id = "template_name"
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder={'Введите тему письма'}
        type="text"
      />
      <br/>
      <textarea
        onChange={event => setHeader(event.target.value)}
        placeholder={'Введите заголовок письма'}
        name="header"
        id="header"
        cols={30}
        rows={10}
      />
      <textarea
        onChange={event => setBody(event.target.value)}
        placeholder={'Введите текст письма'}
        name="body"
        id="body"
        cols={30}
        rows={10}
      />
      <textarea
        onChange={event => setFooter(event.target.value)}
        placeholder={'Введите подпись письма'}
        name="footer"
        id="footer"
        cols={30}
        rows={10}
      />
      </div>
      </div>
      <button id = "create_Tbutton"
        onClick={() => {
          EmailTemplateService.makeEmailTemplate(title, header, body, footer)
            .then(() => {
              if (setModalActive) {
                setModalActive(false)
              }
            })
            .finally(() => {
              clearFields()
            })
        }}
      >
        Готово
      </button>
    </form>
  );
};

export default EmailTemplateCreateForm;