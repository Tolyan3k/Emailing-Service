import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {IEmailing} from "../../../api/models/IEmailing";
import EmailingService from "../../../api/services/emailing.service";
import {IEmailList} from "../../../api/models/IEmailList";
import {IEmailTemplate} from "../../../api/models/IEmailTemplate";
import EmailListService from "../../../api/services/emailList.service";
import EmailTemplateService from "../../../api/services/emailTemplate.service";
import Modal from "../../../components/modal/Modal";

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
      })
  }, [emailing, emailList])

  const fetchEmailTemplate = useCallback(() => {
    emailing.emailTemplateId && EmailTemplateService.getEmailTemplate(emailing.emailTemplateId)
      .then(resp => {
        setEmailTemplate(resp.data)
      })
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
      Загрузка...
    </div>
  )

  const mainScreen = (
    <div>
      <table
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <tbody>
        <tr>
          <th>Название:</th>
          <td>{emailing.name}</td>
        </tr>
        <tr>
          <th>Список рассылки:</th>
          <td>
            <button
              onClick={() => setShowEmailListModal(true)}
            >
              Подробнее
            </button>
          </td>
        </tr>
        <tr>
          <th>Шаблон письма:</th>
          <td>
            <button
              onClick={() => setShowEmailTemplateModal(true)}
            >
              Подробнее
            </button>
          </td>
        </tr>
        </tbody>
      </table>
      <table
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <caption>
          Статусы доставки
        </caption>
        <thead>
        <tr>
          <th>Email</th>
          <th>Статус доставки</th>
          <th>Последнее изменение статуса</th>
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
          <table>
            <caption>Список рассылки</caption>
            <tbody>
            <tr>
              <th>Название:</th>
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
            <caption>Шаблон письма</caption>
            <tbody>
            <tr>
              <th>Название:</th>
              <td>{emailTemplate.title}</td>
            </tr>
            <tr>
              <th>Заголовок письма:</th>
              <td>{emailTemplate.header}</td>
            </tr>
            <tr>
              <th>Основная часть письма:</th>
              <td>{emailTemplate.body}</td>
            </tr>
            <tr>
              <th>Подпись письма:</th>
              <td>{emailTemplate.footer}</td>
            </tr>
            </tbody>
          </table>
        </div>
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
