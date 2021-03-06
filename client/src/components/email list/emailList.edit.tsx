import React, {Dispatch, FC, useCallback, useEffect, useState} from 'react';
import EmailService from "../../api/services/email.service";
import EmailListService from "../../api/services/emailList.service";
import {IEmailList} from "../../api/models/IEmailList";

interface EmailListEditProps {
  emailListId: string
  modalActive: boolean | null
  setModalActive: Dispatch<React.SetStateAction<boolean>> | null
}

const EmailListEdit: FC<EmailListEditProps> =
  ({
    emailListId,
    modalActive= null,
    setModalActive= null
   }) => {
    const [emailList, setEmailList] = useState<IEmailList>({} as IEmailList)
    const [newEmailListEmails, setNewEmailListEmails] = useState<string[]>([])
    const [emails, setEmails] = useState<string[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)

    const fetchEmails = useCallback(() => {
      EmailService.getEmails()
        .then(resp => {
          setEmails(resp.data.map(email => email.email))
        })
    }, [])

    const fetchEmailList = useCallback(() => {
      EmailListService.getEmailList(emailListId)
        .then(resp => {
          setEmailList(resp.data)
          setNewEmailListEmails(resp.data.emails)
        })
    }, [])

    const setEmailsToEmailList = () => {
      const newEmailListEmailsSet = new Set(newEmailListEmails)
      const emailsToDelete = emailList.emails.filter(email => !newEmailListEmailsSet.has(email))

      const emailListEmailsSet = new Set(emailList.emails)
      const emailsToAdd = newEmailListEmails.filter(email => !emailListEmailsSet.has(email))

      if (emailsToDelete.length) {
        EmailListService.deleteEmailsFromEmailList(emailList.id, emailsToDelete)
        console.log("emailsToDelete")
        console.log(emailsToDelete)
      }
      if (emailsToAdd.length) {
        EmailListService.addEmailsToEmailList(emailList.id, emailsToAdd)
        console.log("emailsToAdd")
        console.log(emailsToAdd)
      }
    }

    useEffect(() => {
      setLoading(true)
      fetchEmails()
      fetchEmailList()

      setLoading(false)
    }, [fetchEmails, modalActive, /*setEmailsToEmailList*/])

    const loadingScreen = (
      <div>????????????????...</div>
    )

    const emailListEditScreen = (
      <div>
        <h1>???????????????????????????? ???????????? ????????????????</h1>
        <button
          onClick={() => {
            setEmailsToEmailList()
            if (setModalActive) {
              setModalActive(false)
            }
          }}
        >
          ????????????
        </button>
        <table>
          <caption>???????????????? e-mail ?????? ????????????????</caption>
          <tbody>
          {emails && emails.map(email =>
            <tr key={email}>
              <td>{email}</td>
              <td>
                <button
                  onClick={() => {
                    newEmailListEmails && newEmailListEmails.includes(email)
                      ? setNewEmailListEmails(newEmailListEmails.filter(e => e !== email))
                      : setNewEmailListEmails([...newEmailListEmails, email])
                  }}
                >
                  {
                    newEmailListEmails && newEmailListEmails.includes(email)
                      ? '??????????????'
                      : '????????????????'
                  }
                </button>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    )

  return (
    isLoading
      ? loadingScreen
      : emailListEditScreen
  );
};

export default EmailListEdit;