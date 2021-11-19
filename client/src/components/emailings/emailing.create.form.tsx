import React, {Dispatch, FC, SetStateAction, useCallback, useEffect, useState} from 'react';
import {IEmailList} from "../../api/models/IEmailList";
import EmailListService from "../../api/services/emailList.service";
import {IEmailTemplate} from "../../api/models/IEmailTemplate";
import EmailTemplateService from "../../api/services/emailTemplate.service";
import EmailingService from "../../api/services/emailing.service";
import "./emailing.css"

interface EmailingCreateFormProps {
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

const EmailingCreateForm: FC<EmailingCreateFormProps> =
  ({
    active,
    setActive
   }) => {
    const [name, setName] = useState<string>("")
    const [emailLists, setEmailLists] = useState<IEmailList[]>([])
    const [selectedEmailListId, setSelectedEmailListId] = useState<string>("")
    const [emailTemplates, setEmailTemplates] = useState<IEmailTemplate[]>([])
    const [selectedEmailTemplateId, setSelectedEmailTemplateId] = useState<string>("")

    const fetchEmailLists = useCallback(() => {
      EmailListService.getEmailLists().then(resp => {
        setEmailLists(resp.data)
      })
    }, [])

    const fetchEmailTemplates = useCallback(() => {
      EmailTemplateService.getEmailTemplates()
        .then(resp => setEmailTemplates(resp.data))
    }, [])

    useEffect(() => {
      fetchEmailLists()
      fetchEmailTemplates()
        if (!active) {
            setName('')
        }
    }, [fetchEmailLists, fetchEmailTemplates, active])

    return (
      <div >

        <div id = "main_emailings_create">
        <input id = "emailing_names"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={'Введите название рассылки'}
        />
        <br/>

        <div id = "new_indent">
        <select id = "select_template"
          // value={selectedEmailListId}
          onChange={event => setSelectedEmailListId(event.target.value)}
        >
          <option disabled={true}  selected={true}>Выберите категорию пользователей</option>
          {emailLists.map(emailList =>
              <option key={emailList.id}
                      value={emailList.id}
              >
                {emailList.name}
              </option>
          )}
        </select>
        <select id = "select_template"
          // value={selectedEmailTemplateId}
          onChange={event => setSelectedEmailTemplateId(event.target.value)}
        >
          <option disabled={true} selected={true}>Выберите шаблон e-mail</option>
          {emailTemplates.map(emailTemplate =>
            <option
              key={emailTemplate.id}
              value={emailTemplate.id}
            >
              {emailTemplate.title}
            </option>
          )}
        </select>
        <button id = "create_emailing_table"
          onClick={() => {
            console.log([selectedEmailListId, selectedEmailTemplateId])
            EmailingService.makeEmailing(name, selectedEmailListId, selectedEmailTemplateId)
              .then(() => {
                setActive(false)
              })
          }}
        >
          Создать
        </button>
        </div>
        </div>
      </div>
    );
};

export default EmailingCreateForm;