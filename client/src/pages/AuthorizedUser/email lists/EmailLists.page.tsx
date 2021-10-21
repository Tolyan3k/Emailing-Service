import React, {useCallback, useEffect, useState} from 'react';
import Modal from "../../../components/modal/Modal";
import EmailListCreateForm from "../../../components/email list/emailList.create.form";
import EmailListForm from "../../../components/email list/emailList.form";
import {IEmailList} from "../../../api/models/IEmailList";
import EmailListService from "../../../api/services/emailList.service";
import {useHistory} from "react-router-dom";

const EmailListsPage = () => {
  const history = useHistory()
  const [emailLists, setEmailLists] = useState<IEmailList[]>([])
  // const [emailListActive, setEmailListActive] = useState<boolean>(false)
  const [makeEmailListActive, setMakeEmailListActive] = useState<boolean>(false)

  const fetchEmailLists = useCallback(() => {
    EmailListService.getEmailLists()
      .then(resp => {
        setEmailLists(resp.data)
      })
  }, [])

  useEffect(() => {
    fetchEmailLists()
  }, [fetchEmailLists, makeEmailListActive])

  return (
    <div>
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
                  // onClick={() => setEmailListActive(true)}
                  onClick={() => history.push(`/email_lists/${emailList.id}`)}
                >
                  Подробнее
                </button>
                {/*<Modal active={emailListActive} setActive={setEmailListActive}>*/}
                {/*  <EmailListForm emailList={emailList}*/}
                {/*                 settings={*/}
                {/*                   {more:*/}
                {/*                       {showButton: true,*/}
                {/*                         showAddEmailButton: true,*/}
                {/*                         showDeleteEmailButton: true*/}
                {/*                       }}}*/}
                {/*  />*/}
                {/*</Modal>*/}
              </td>
              <td>
                <button
                  onClick={() => {
                    EmailListService.deleteEmailList(emailList.id)
                      .then(fetchEmailLists)
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          )
        }
        </tbody>
      </table>
    </div>
  );
};

export default EmailListsPage;