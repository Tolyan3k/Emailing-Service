import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {IEmail} from "../../../api/models/IEmail";
import EmailService from "../../../api/services/email.service";
import Modal from "../../../components/modal/Modal";
import ContactForm from "../../../components/contacts/contact.form";
import {observer} from "mobx-react-lite";

const ContactsPage: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [emails, setEmails] = useState<IEmail[]>([])

  const fetchEmails = useCallback(() => {
    EmailService.getEmails()
      .then(resp => {
        setEmails(resp.data)
      })
  }, [])

  // useEffect(() => {
  //   EmailService.getEmails()
  //     .then(res => {
  //       setEmails([...res.data])
  //     })
  //     .finally(() => setLoading(false))
  // }, [modalVisible])

  useEffect(() => {
    setLoading(true)
    fetchEmails()
    setLoading(false)
  }, [fetchEmails, modalVisible])

  return (
    <div>
      {isLoading
        ? "Загрузка..."
        : <table>
          <caption>
            Список контактов
          </caption>
          <thead>
          <tr>
            <th>Контакт</th>
            <th>
              <button
                onClick={() => setModalVisible(true)}
              >
                Добавить контакт
              </button>
            </th>
          </tr>
          </thead>
          <tbody>
          {emails.map(email =>
            <tr key={email.email}>
              <td>{email.email}</td>
              {/*<td>{email.tags.join(', ')}</td>*/}
              <td>
                <button onClick={() => {
                  EmailService.deleteEmail(email.email)
                    .then(() => fetchEmails())
                }}>X</button>
              </td>
            </tr>
          )}
          </tbody>
        </table>}

      <Modal active={modalVisible} setActive={setModalVisible}>
        <ContactForm setModalActive={setModalVisible}/>
      </Modal>
    </div>

  );
};

export default observer(ContactsPage);