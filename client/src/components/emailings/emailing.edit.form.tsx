import React, {Dispatch, FC, useCallback, useEffect, useState} from 'react';
import {IEmailing} from "../../api/models/IEmailing";
import EmailingService from "../../api/services/emailing.service";
import {IEmailList} from "../../api/models/IEmailList";
import {IEmailTemplate} from "../../api/models/IEmailTemplate";
import EmailListService from "../../api/services/emailList.service";
import EmailTemplateService from "../../api/services/emailTemplate.service";

interface EmailingEditFromProps {
  emailingId: string,
  active?: boolean,
  setActive?: Dispatch<React.SetStateAction<boolean>>
}

const EmailingEditForm: FC<EmailingEditFromProps> =
  ({
    emailingId,
    active,
    setActive
   }) => {
    const [emailing, setEmailing] = useState<IEmailing>({} as IEmailing)
    const [emailLists, setEmailLists] = useState<IEmailList[]>([] as IEmailList[])
    const [emailTemplates, setEmailTemplates] = useState<IEmailTemplate[]>([] as IEmailTemplate[])

    const [name, setName] = useState<string>('')
    const [emailListId, setEmailListId] = useState<string>('')
    const [emailTemplateId, setEmailTemplateId] = useState<string>('')

  const fetchEmailing = useCallback(() => {
    EmailingService.getEmailing(emailingId)
      .then((resp) => {
        setEmailing(resp.data)
        setName(resp.data.name)
        setEmailListId(resp.data.emailListId)
        setEmailTemplateId(resp.data.emailTemplateId)
      })
  }, [])

    const fetchEmailLists = useCallback(() => {
      EmailListService.getEmailLists()
        .then(resp => {
          setEmailLists(resp.data)
        })
    }, [])

    const fetchEmailTemplates = useCallback(() => {
      EmailTemplateService.getEmailTemplates()
        .then(resp => {
          setEmailTemplates(resp.data)
        })
    }, [])

    useEffect(() => {
      fetchEmailing()
      fetchEmailLists()
      fetchEmailTemplates()
    }, [active])

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder={'Введите название рассылки'}
      />
      <br/>
      <select
        // value={emailListId}
        onChange={event => setEmailListId(event.target.value)}
      >
        <option disabled={true}  selected={true}>Выберите категорию пользователей</option>
        {emailLists.map(emailList => {
          if (emailList.id === emailing.emailListId) {
            return (
              <option key={emailList.id}
                      value={emailList.id}
                      selected={true}
              >
                {emailList.name}
              </option>
            )
          } else {
            return (
              <option key={emailList.id}
                      value={emailList.id}
              >
                {emailList.name}
              </option>
            )
          }
        })}
      </select>
      <select
        // value={emailTemplateId}
        onChange={event => setEmailTemplateId(event.target.value)}
      >
        <option disabled={true} selected={true}>Выберите шаблон e-mail</option>
        {emailTemplates.map(emailTemplate => {
          if (emailTemplate.id === emailing.emailTemplateId) {
            return (
              <option
                key={emailTemplate.id}
                value={emailTemplate.id}
                selected={true}
              >
                {emailTemplate.title}
              </option>
            )
          } else {
            return (
              <option
                key={emailTemplate.id}
                value={emailTemplate.id}
              >
                {emailTemplate.title}
              </option>
            )
          }
        })}
      </select>
      <button
        onClick={() => {
          EmailingService.updateEmailing(emailingId, name, emailListId, emailTemplateId)
            .then(() => {
              if (setActive) {
                setActive(false)
              }
            })
        }}
      >
        Готово
      </button>
    </div>
  );
};

export default EmailingEditForm;