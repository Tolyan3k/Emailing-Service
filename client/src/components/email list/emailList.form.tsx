import React, {FC, useState} from 'react';
import {IEmailList} from "../../api/models/IEmailList";
import Modal from "../modal/Modal";
import EmailListService from "../../api/services/emailList.service";

interface EmailListFormProps {
  emailList: IEmailList
  settings: {
    more: {
      showButton: boolean
      showAddEmailButton: boolean
      showDeleteEmailButton: boolean
    }
  }
}

const EmailListForm: FC<EmailListFormProps> =
  ({
    emailList,
    settings = {more: {showButton: true, showAddEmailButton: true, showDeleteEmailButton: true}}
   }) => {
    const [aboutEmailListActive, setAboutEmailListActive] = useState<boolean>(false)
    const [addEmailActive, setAddEmailActive] = useState<boolean>(false)
    const [emailAdd, setEmailAdd] = useState<string>('')

    return (
      <div>
        <h1>{emailList.name}</h1>
        {settings.more.showButton
            ? <button
              onClick={() => setAboutEmailListActive(!aboutEmailListActive)}
              >
                {
                  aboutEmailListActive
                    ? "Скрыть"
                    : "Подробнее"
                }
              </button>
            : <></>
        }
        {aboutEmailListActive
          ? <table>
            <thead>
            <tr>
              <th>E-mail</th>
              <th>
                {settings.more.showAddEmailButton
                  ? <button
                    onClick={() => setAddEmailActive(true)}
                  >
                    Добавить E-mail
                    {<Modal active={addEmailActive} setActive={setAddEmailActive}>
                      <input
                        type="email"
                        value={emailAdd}
                        placeholder={'Введите e-mail'}
                        onChange={event => setEmailAdd(event.target.value)}
                      />
                      <button
                        onClick={() => EmailListService.addEmailsToEmailList(emailList.id, [emailAdd])}
                      >
                        Добавить
                      </button>
                    </Modal>}
                  </button>
                  : <></>
                }
              </th>
            </tr>
            </thead>
            <tbody>
            {emailList.emails.map(email =>
              <tr key={email}>
                <td>{email}</td>
                {settings.more.showDeleteEmailButton
                  ? <td>
                    <button
                      onClick={() => EmailListService.deleteEmailsFromEmailList(emailList.id, [email])}
                    >X</button>
                  </td>
                  : <></>
                }
              </tr>
            )}
            </tbody>
          </table>
          : <></>
        }

      </div>
    );
};

export default EmailListForm;