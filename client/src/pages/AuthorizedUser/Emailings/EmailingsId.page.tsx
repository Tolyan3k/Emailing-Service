import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IEmailing} from "../../../api/models/IEmailing";
import EmailingService from "../../../api/services/emailing.service";
import {IEmailList} from "../../../api/models/IEmailList";
import {IEmailTemplate} from "../../../api/models/IEmailTemplate";
import EmailListService from "../../../api/services/emailList.service";
import EmailTemplateService from "../../../api/services/emailTemplate.service";
import Modal from "../../../components/modal/Modal";
import EmailingEditForm from "../../../components/emailings/emailing.edit.form";
// import './Emailing.css';

interface EmailingsIdProps {
  id: string
}

const EmailingsIdPage = () => {
  const {id} = useParams<EmailingsIdProps>()

  const [isLoading, setLoading] = useState<boolean>(false)
  const [emailing, setEmailing] = useState<IEmailing>({} as IEmailing)
  const [emailList, setEmailList] = useState<IEmailList>({} as IEmailList)
  const [emailTemplate, setEmailTemplate] = useState<IEmailTemplate>({} as IEmailTemplate)

  const [showEmailListModal, setShowEmailListModal] = useState<boolean>(false)
  const [showEmailTemplateModal, setShowEmailTemplateModal] = useState<boolean>(false)
  const [showEmailingEdit, setShowEmailingEdit] = useState<boolean>(false)

  const [showEmailListAboutButton, setShowEmailListAboutButton] = useState<boolean>(false)
  const [showEmailTemplateAboutButton, setShowEmailTemplateAboutButton] = useState<boolean>(false)

  const fetchEmailing = useCallback(() => {
    // setLoading(true)
    EmailingService.getEmailing(id)
      .then(resp => {
        setEmailing(resp.data)
      })
      // .finally(() => setLoading(false))
  }, [emailing])

  const fetchEmailList = useCallback(() => {
    emailing.emailListId && EmailListService.getEmailList(emailing.emailListId)
      .then(resp => {
        setEmailList(resp.data)
        setShowEmailListAboutButton(true)
      })
      .catch(() => setShowEmailListAboutButton(false))
  }, [emailing, emailList])

  const fetchEmailTemplate = useCallback(() => {
    emailing.emailTemplateId && EmailTemplateService.getEmailTemplate(emailing.emailTemplateId)
      .then(resp => {
        setEmailTemplate(resp.data)
        setShowEmailTemplateAboutButton(true)
      })
      .catch(() => setShowEmailTemplateAboutButton(false))
  }, [emailing, emailTemplate])

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmailing()
      fetchEmailList()
      fetchEmailTemplate()
    }, 1000)

    return () => clearTimeout(timer)
  }, [emailing, emailList, emailTemplate])

  const loadingScreen = (
    <div>
      ????????????????...
    </div>
  )

  const mainScreen = (
    <div>
      <table className = "style_table"
      >
        <tbody>
        <tr>
          <th>????????????????:</th>
          <td>{emailing.name}</td>
        </tr>
        <tr>
          <th>???????????? ????????????????:</th>
          <td>
            {showEmailListAboutButton
              ? <button
                onClick={() => setShowEmailListModal(true)}
              >
                ??????????????????
              </button>
              : "???? ?????????????? ?????????? ???????????? ????????????????"
            }
          </td>
        </tr>
        <tr>
          <th>???????????? ????????????:</th>
          <td>
            {showEmailTemplateAboutButton
              ? <button
                onClick={() => setShowEmailTemplateModal(true)}
              >
                ??????????????????
              </button>
              : "???? ?????????????? ?????????? ???????????? ????????????"
            }
          </td>
        </tr>
        <tr>
          <td>
            <button
              onClick={() => setShowEmailingEdit(true)}
            >
              ??????????????????????????
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <table className = "style_table"
      >
        <caption>
          ?????????????? ????????????????
        </caption>
        <thead>
        <tr>
          <th>Email</th>
          <th>???????????? ????????????????</th>
          <th>?????????????????? ?????????????????? ??????????????</th>
        </tr>
        </thead>
        <tbody>
        {emailing.emailsStatus && emailing.emailsStatus.map(emailStatus =>
          <tr key={emailStatus.email}>
            <td>{emailStatus.email}</td>
            <td>{emailStatus.status}</td>
            <td>{emailStatus.statusDate}</td>
          </tr>
        )}
        </tbody>
      </table>

      <Modal active={showEmailListModal} setActive={setShowEmailListModal}>
        <div>
          <table className = "style_table">
            <caption>???????????? ????????????????</caption>
            <tbody>
            <tr>
              <th>????????????????:</th>
              <td>{emailList.name}</td>
            </tr>
            </tbody>
          </table>
          <table>
            <tbody>
            {emailList.emails && emailList.emails.map(email =>
              <tr key={email}>
                <td>{email}</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal active={showEmailTemplateModal} setActive={setShowEmailTemplateModal}>
        <div>
          <table>
            <caption>???????????? ????????????</caption>
            <tbody>
            <tr>
              <th>????????????????:</th>
              <td>{emailTemplate.title}</td>
            </tr>
            <tr>
              <th>?????????????????? ????????????:</th>
              <td>{emailTemplate.header}</td>
            </tr>
            <tr>
              <th>???????????????? ?????????? ????????????:</th>
              <td>{emailTemplate.body}</td>
            </tr>
            <tr>
              <th>?????????????? ????????????:</th>
              <td>{emailTemplate.footer}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </Modal>

      <Modal active={showEmailingEdit} setActive={setShowEmailingEdit}>
        <EmailingEditForm emailingId={id} active={showEmailingEdit} setActive={setShowEmailingEdit}/>
      </Modal>
    </div>
  )

  return (
    isLoading
      ? loadingScreen
      : mainScreen
  );
};

export default EmailingsIdPage;
