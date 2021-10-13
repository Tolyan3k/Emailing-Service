import React, {FC} from 'react';
import {IEmailTemplate} from "../../api/models/IEmailTemplate";

interface EmailTemplateFormProps {
  emailTemplate: IEmailTemplate
  settings: {

  }
}

const EmailTemplateForm: FC<EmailTemplateFormProps> =
  ({
    emailTemplate,
    settings
   }) => {

    return (
      <div>
        <h1>{emailTemplate.title}</h1>
        <p>{emailTemplate.header}</p>
        <p>{emailTemplate.body}</p>
        <p>{emailTemplate.footer}</p>
      </div>
    );
};

export default EmailTemplateForm;