import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import {IEmail} from "../../../api/models/IEmail";
import EmailService from "../../../api/services/email.service";
import Modal from "../../../components/modal/Modal";
import ContactForm from "../../../components/contacts/contact.form";
import {observer} from "mobx-react-lite";
 import './Contacts.css';



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
    <div id = "div_conteact" >

      
      {isLoading
        ? "Загрузка..."
        :
        <div id = "div_contact">
            <h1 id = "nametag">Контакты</h1>

          <div id = "div_con">

          
        <table id = "table_of_contacts">
          
          <thead>
          <tr>
            <th id = "contact_name_table">Контакт</th>
            <th>
              <button id = "create_btn"
                onClick={() => setModalVisible(true)}
              >
                Добавить контакт
              </button>
            </th>
          </tr>
          </thead>
          <tbody id = "" >
          {emails.map(email =>
            <tr  key={email.email}>
              <td id="contact_name_table_list">{email.email}</td>
              {/*<td>{email.tags.join(', ')}</td>*/}
              <td id = "delete_contact_button_table">
                <button onClick={() => {
                  EmailService.deleteEmail(email.email)
                    .then(() => fetchEmails())
                }}><i className="">X</i>
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
        </div>
        </div>
        }

      <Modal active={modalVisible} setActive={setModalVisible}>
        <ContactForm setModalActive={setModalVisible}/>
      </Modal>
      
    </div>

  );
};

export default observer(ContactsPage);