import React, {FC, useState} from 'react';
import {IEmailList} from "../../api/models/IEmailList";
import EmailListService from "../../api/services/emailList.service";
import Modal from "../modal/Modal";
import EmailListForm from "./emailList.form";
import EmailListCreateForm from "./emailList.create.form";
import {observer} from "mobx-react-lite";
// import './emailLists.form.css';

const EmailListsForm: FC = () => {
  const [emailLists, setEmailLists] = useState<IEmailList[]>([])
  const [emailListActive, setEmailListActive] = useState<boolean>(false)
  const [makeEmailListActive, setMakeEmailListActive] = useState<boolean>(false)

  EmailListService.getEmailLists().then(resp => {
    setEmailLists(resp.data)
  })

  return (
    <table>
      <caption>Списки рассылки</caption>
      <thead>
        <tr>
          <th>Название</th>
          <th>Кол-во контактов</th>
          <th>
            <button
              onClick={() => setMakeEmailListActive(true)}
            >
              Создать список рассылки
            </button>
            <Modal active={makeEmailListActive} setActive={setMakeEmailListActive}>
              <EmailListCreateForm modalActive={makeEmailListActive} setModalActive={setMakeEmailListActive}/>
            </Modal>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          emailLists.map(emailList =>
            <tr key={emailList.id}>
              <td>{emailList.name}</td>
              <td>{emailList.emails.length}</td>
              <td>
                <button
                  onClick={() => setEmailListActive(true)}
                >
                  Подробнее
                </button>
                <Modal active={emailListActive} setActive={setEmailListActive}>
                  <EmailListForm emailList={emailList}
                                 settings={
                                   {more:
                                       {showButton: true,
                                         showAddEmailButton: true,
                                         showDeleteEmailButton: true
                                       }}}
                  />
                </Modal>
              </td>
            </tr>
          )
        }
      </tbody>
    </table>
  );
};

export default observer(EmailListsForm);