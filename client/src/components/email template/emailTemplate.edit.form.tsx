import React, {Dispatch, FC, useCallback, useEffect, useState} from 'react';
import EmailTemplateService from "../../api/services/emailTemplate.service";

interface EmailTemplateEditProps {
  emailTemplateId: string
  modalActive: boolean | null
  setModalActive: Dispatch<React.SetStateAction<boolean>> | null
}

const EmailTemplateEditForm: FC<EmailTemplateEditProps> =
  ({
    emailTemplateId,
    modalActive,
    setModalActive
   }) => {

  const [title, setTitle] = useState<string>('')
  const [header, setHeader] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const [footer, setFooter] = useState<string>('')

    const fetchEmailList = useCallback(() => {
      EmailTemplateService.getEmailTemplate(emailTemplateId)
        .then((resp) => {
          setTitle(resp.data.title)
          setHeader(resp.data.header)
          setBody(resp.data.body)
          setFooter(resp.data.footer)
        })
    }, [])

    useEffect(() => {
      fetchEmailList()
    }, [fetchEmailList, modalActive])

  return (
    <div>
      <h1>Редактировать шаблон рассылки</h1>
      <input
        value={title}
        onChange={event => setTitle(event.target.value)}
        placeholder={'Введите тему письма'}
        type="text"
      />
      <br/>
      <textarea
        onChange={event => setHeader(event.target.value)}
        placeholder={'Введите заголовок письма'}
        value={header}
        name="header"
        id="header"
        cols={30}
        rows={10}
      />
      <textarea
        onChange={event => setBody(event.target.value)}
        placeholder={'Введите текст письма'}
        value={body}
        name="body"
        id="body"
        cols={30}
        rows={10}
      />
      <textarea
        onChange={event => setFooter(event.target.value)}
        placeholder={'Введите подпись письма'}
        value={footer}
        name="footer"
        id="footer"
        cols={30}
        rows={10}
      />
      <button
        onClick={() => {
          EmailTemplateService.updateEmailTemplate(emailTemplateId, title, header, body, footer)
            .then(() => {
              if (setModalActive) {
                setModalActive(false)
              }
            })
        }}
      >
        Готово
      </button>
    </div>
  );
};

export default EmailTemplateEditForm;