import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {IEmailTemplate} from "../../../api/models/IEmailTemplate";
import EmailTemplateService from "../../../api/services/emailTemplate.service";
import {useHistory} from "react-router-dom";
import Modal from "../../../components/modal/Modal";
import EmailTemplateCreateForm from "../../../components/email template/emailTemplate.create.form";
import {observer} from "mobx-react-lite";
 import './Templates.css';

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

            <div id = "div_contact">
            <h1 id = "nametag">Шаблоны писем</h1>

            <div id = "div_con"> 
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}

      <table id = "style_table_template_of_email"
      >
        
        <thead>
          <tr>
            <th>Название</th>
            <th></th>
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
                <i >X</i>
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
    </div>
    </div>
  )

  return (
    isLoading
      ? loadingScreen
      : mainScreen
  );
};

export default EmailTemplatesPage;