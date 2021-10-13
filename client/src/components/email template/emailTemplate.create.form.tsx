import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import EmailTemplateService from "../../api/services/emailTemplate.service";

const EmailTemplateCreateForm: FC = () => {
  const [title, setTitle] = useState<string>('')
  const [header, setHeader] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [footer, setFooter] = useState<string>('')
  
  return (
    <form>
      <h1>Создать шаблон рассылки</h1>
      <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder={'Введите тему письма'}
        type="text"
      />
      <br/>
      <textarea
        onChange={event => setHeader(event.target.value)}
        name="header"
        id="header"
        cols={30}
        rows={10}
      />
      <textarea
        onChange={event => setBody(event.target.value)}
        name="body"
        id="body"
        cols={30}
        rows={10}
      />
      <textarea
        onChange={event => setFooter(event.target.value)}
        name="footer"
        id="footer"
        cols={30}
        rows={10}
      />
      <button
        onClick={() => EmailTemplateService.makeEmailTemplate(title, header, body, footer)}
      >
        Готово
      </button>
    </form>
  );
};

export default observer(EmailTemplateCreateForm);