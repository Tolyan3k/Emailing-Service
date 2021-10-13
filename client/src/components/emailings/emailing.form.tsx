import React, {FC} from 'react';
import EmailingService from "../../api/services/emailing.service";
import {IEmailing} from "../../api/models/IEmailing";
import EmailListService from "../../api/services/emailList.service";
import {observer} from "mobx-react-lite";

interface EmailingProps {
  emailingId: string
}

const EmailingForm: FC<EmailingProps> =
  ({
    emailingId
   }) => {

    let emailing = {} as IEmailing
    let emailListName = ""

    EmailingService.getEmailing(emailingId).then(response => {
      emailing = response.data
    })

    EmailListService.getEmailList(emailing.emailListId).then(response => {
      emailListName = response.data.name
    })

    return (
      <div>
        <h1>{emailing.name}</h1>
        <p>Список рассылки: {emailListName}</p>
        <p>ID Шаблона: {emailing.emailTemplateId}</p>
        <table>
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Статус рассылки</th>
              <th>Время последнего изменения статуса</th>
            </tr>
          </thead>
          <tbody>
            {emailing.emailsStatus.map(emailStatus =>
              <tr>
                <td>{emailStatus.email}</td>
                <td>{emailStatus.status}</td>
                <td>{emailStatus.statusDate}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
};

export default observer(EmailingForm);