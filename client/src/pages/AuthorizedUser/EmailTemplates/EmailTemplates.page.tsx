import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {IEmailTemplate} from "../../../api/models/IEmailTemplate";
import EmailTemplateService from "../../../api/services/emailTemplate.service";
import {useHistory} from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import EmailTemplateCreateForm from "../../../components/email template/emailTemplate.create.form";
import {observer} from "mobx-react-lite";

const EmailTemplatesPage = () => {
  const history = useHistory()
  const [emailTemplates, setEmailTemplates] = useState<IEmailTemplate[]>([] as IEmailTemplate[])
  const [isLoading, setLoading] = useState<boolean>(true)
  const [showCreateEmailTemplate, setShowCreateEmailTemplate] = useState<boolean>(false)

  const fetchEmailTemplates = useCallback(() => {
    EmailTemplateService.getEmailTemplates()
      .then(resp => {
        setEmailTemplates(resp.data)
      })
  }, [])

  useEffect(() => {
    setLoading(true)
    fetchEmailTemplates()
    setLoading(false)
  }, [fetchEmailTemplates, showCreateEmailTemplate])

  const loadingScreen = (
    <div>
      Загрузка...
    </div>
  )

  const mainScreen = (
    <div>
      <table>
        <caption>Шаблоны писем</caption>
        <thead>
          <tr>
            <th>Название</th>
            <th>
              <button
                onClick={() => setShowCreateEmailTemplate(true)}
              >
                Создать новый шаблон
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(emailTemplates) && emailTemplates.map(emailTemplate =>
          <tr key={emailTemplate.id}>
            <td>{emailTemplate.title}</td>
            <td>
              <button
                onClick={() => history.push(`/email_templates/${emailTemplate.id}`)}
              >
                Подробнее
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  setLoading(true)
                  EmailTemplateService.deleteEmailTemplate(emailTemplate.id)
                    .then(() => {
                      fetchEmailTemplates()
                    })
                    .finally(() => setLoading(false))
                }}
              >
                X
              </button>
            </td>
          </tr>
        )}
        </tbody>
      </table>

      <Modal  active={showCreateEmailTemplate} setActive={setShowCreateEmailTemplate}>
        <EmailTemplateCreateForm setModalActive={setShowCreateEmailTemplate}/>
      </Modal>
    </div>
  )

  return (
    isLoading
      ? loadingScreen
      : mainScreen
  );
};

export default EmailTemplatesPage;