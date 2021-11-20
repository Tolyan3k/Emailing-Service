import React, {FC, useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IEmailList} from "../../../api/models/IEmailList";
import EmailListService from "../../../api/services/emailList.service";
import Modal from "../../../components/modal/Modal";
import EmailListEdit from "../../../components/email list/emailList.edit";
import "../unified.css"


interface EmailListsIdProps {
  id: string
}

const EmailListsIdPage: FC = () => {
  const {id} = useParams<EmailListsIdProps>()
  const [emailList, setEmailList] = useState<IEmailList>({} as IEmailList)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [editEmailListVisible, setEditEmailListVisible] = useState<boolean>(false)

  const fetchEmailList = useCallback(() => {
    EmailListService.getEmailList(id)
      .then(resp => {
        setEmailList(resp.data)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchEmailList()
    setLoading(false)
  }, [fetchEmailList, editEmailListVisible])

  const loadingScreen = (
    <div>
      Загрузка...
    </div>
  )

  const emailListScreen = (
    <div className = "display">
          <h1 id = "center">Список контактов   "{emailList.name}"</h1>
        <div className = "display_2">
      <table
      >
        <tbody>
        <tr>
          <th>Название:</th>
          <td>{emailList.name}</td>
        </tr>
        </tbody>
      </table>
      <table>
        <caption>
          Список контактов
        </caption>
        <thead>
          <tr>
            <th>Контакт</th>
            <th>
              <button
                onClick={() => setEditEmailListVisible(true)}
              >
                Редактировать контакты
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
        {emailList.emails && emailList.emails.map(email =>
          <tr key={email}>
            <td>{email}</td>
          </tr>
        )}
        </tbody>
      </table>

      </div>
      <Modal active={editEmailListVisible} setActive={setEditEmailListVisible}>
        <EmailListEdit emailListId={id} modalActive={editEmailListVisible} setModalActive={setEditEmailListVisible}/>
      </Modal>
    </div>
  )

  return (
    isLoading
      ? loadingScreen
      : emailListScreen
  );
};

export default EmailListsIdPage;