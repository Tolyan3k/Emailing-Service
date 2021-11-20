import React, {Dispatch, FC, useCallback, useEffect, useState} from 'react';
import EmailService from "../../api/services/email.service";
import EmailListService from "../../api/services/emailList.service";
import "./emailList.css"

interface EmailListCreateFormProps {
  modalActive: boolean | null
  setModalActive: Dispatch<React.SetStateAction<boolean>> | null
}

const EmailListCreateForm: FC<EmailListCreateFormProps> =
  ({
    modalActive = null,
    setModalActive = null
   }) => {
  const [name, setName] = useState<string>('')
  const [emails, setEmails] = useState<string[]>([])
  const [emailListEmails, setEmailListEmails] = useState<string[]>([])

  const fetchEmails = useCallback(() => {
    EmailService.getEmails().then(resp => {
      setEmails(resp.data.map(email => email.email))
    })
  }, [])

  useEffect(() => {
    fetchEmails()
    setName('')
    setEmailListEmails([])
  }, [fetchEmails, modalActive])

  return (
    <div className = "font">
      
      <h1>Создание нового списка рассылки</h1>

      <input  id = "list_name"
        value={name}
        onChange={event => setName(event.target.value)}
        placeholder={'Введите название списка рассылки'}
        type="text"
      />
      
      <table className = "table_list">
        <tbody>
          {emails.map(email =>
            <tr key={email}>
              <td>{email}</td>
              <td>
                <button
                  onClick={() => {
                    emailListEmails.includes(email)
                      ? setEmailListEmails(emailListEmails.filter(e => e !== email))
                      : setEmailListEmails([...emailListEmails, email])
                    console.log(emailListEmails)
                    console.log(email)
                    }
                  }
                >
                  {
                    emailListEmails.includes(email)
                      ? 'удалить'
                      : 'добавить'
                  }
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <button
        onClick={() => {
          EmailListService.makeEmailList(name, emailListEmails)
            .then(() => {
              if (setModalActive) {
                setModalActive(false)
              }
            })
        }}
      >
        Создать
      </button>


   
      

    </div>
  );
};

export default EmailListCreateForm;