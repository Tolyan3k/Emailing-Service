import React, {FC, useState} from 'react';
import {observer} from "mobx-react-lite";
import {IEmail} from "../../api/models/IEmail";
import EmailService from "../../api/services/email.service";
import ContactForm from "./contact.form";
import Modal from "../modal/Modal";

const ContactsForm: FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [emails, setEmails] = useState<IEmail[]>([])

  EmailService.getEmails()
    .then(res => {
      setEmails([...res.data])
    })

  return (
    <table>
      <thead>
      <tr>
        <th>Список контактов</th>
        <th>
          <button
            onClick={() => setModalVisible(true)}
          >
            Добавить контакт
          </button>
          <Modal active={modalVisible} setActive={setModalVisible}>
            <ContactForm/>
          </Modal>
        </th>
      </tr>
      </thead>
      <tbody>
        {emails.map(email =>
          <tr key={email.email}>
            <td>{email.email}</td>
            {/*<td>{email.tags.join(', ')}</td>*/}
            <td>
              <button onClick={() => EmailService.deleteEmail(email.email)}>X</button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default observer(ContactsForm);