import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {IEmailList} from "../../api/models/IEmailList";
import EmailListService from "../../api/services/emailList.service";
import {IEmailTemplate} from "../../api/models/IEmailTemplate";
import {observer} from "mobx-react-lite";

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

    EmailListService.getEmailLists().then(resp => {
      setEmailLists(resp.data)
    })

    return (
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder={'Введите название рассылки'}
        />
        <select
          value={selectedEmailListId}
          onChange={event => setSelectedEmailListId(event.target.value)}
          name="select-email-list"
          id=""
        >
          <option disabled={true}>Выберите категорию пользователей</option>
          {emailLists.map(emailList =>
              <option key={emailList.id} value={emailList.id}>{emailList.name}</option>
          )}
        </select>
        <select
          value={selectedEmailTemplateId}
          onChange={event => setSelectedEmailTemplateId(event.target.value)}
          name="select-email-template"
          id=""
        >
          <option disabled={true}>Выберите шаблон e-mail</option>
          {
            emailTemplates.map(emailTemplate =>
              <option value=""></option>
            )
          }
        </select>
      </div>
    );
};

export default observer(EmailingCreateForm);