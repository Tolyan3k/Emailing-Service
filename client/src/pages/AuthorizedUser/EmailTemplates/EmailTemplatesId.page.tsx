import React, {useCallback, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import EmailTemplateService from "../../../api/services/emailTemplate.service";
import {IEmailTemplate} from "../../../api/models/IEmailTemplate";
import Modal from "../../../components/modal/Modal";
import EmailTemplateEditForm from "../../../components/email template/emailTemplate.edit.form";
// import './Templates.css';


interface EmailTemplatesIdProps {
  id: string
}

const EmailTemplatesIdPage = () => {
  const {id} = useParams<EmailTemplatesIdProps>()
  const [emailTemplate, setEmailTemplate] = useState<IEmailTemplate>({} as IEmailTemplate)
  const [showEmailTemplateEdit, setShowEmailTemplateEdit] = useState<boolean>(false)

  const fetchEmailTemplate = useCallback(() => {
    EmailTemplateService.getEmailTemplate(id)
      .then((resp) => {
        setEmailTemplate(resp.data)
      })
  }, [])

  useEffect(() => {
    fetchEmailTemplate()
  }, [fetchEmailTemplate, showEmailTemplateEdit])

  return (
    <div>
      <table className = "style_table"
      >
        <thead>
          <tr>
            <td>
              <button id = "create_btn"
                onClick={() => {
                  setShowEmailTemplateEdit(true)
                }}
              >
                Редактировать
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
        <tr>
          <th>Название:</th>
          <td>{emailTemplate.title}</td>
        </tr>
        <tr>
          <th>Заголовок письма:</th>
          <td
              style={{
                width: "400px"
              }}
          >{emailTemplate.header}</td>
        </tr>
        <tr>
          <th>Тело письма:</th>
          <td>{emailTemplate.body}</td>
        </tr>
        <tr>
          <th>Подпись:</th>
          <td>{emailTemplate.footer}</td>
        </tr>
        </tbody>
      </table>

      <Modal active={showEmailTemplateEdit} setActive={setShowEmailTemplateEdit}>
        <EmailTemplateEditForm emailTemplateId={id} modalActive={showEmailTemplateEdit} setModalActive={setShowEmailTemplateEdit}/>
      </Modal>
    </div>
  );
};

export default EmailTemplatesIdPage;