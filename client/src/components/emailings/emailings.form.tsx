import React, {FC, useState} from 'react';
import {IEmailing} from "../../api/models/IEmailing";
import EmailingService from "../../api/services/emailing.service";
import Modal from "../modal/Modal";
import EmailingCreateForm from "./emailing.create.form";
import {observer} from "mobx-react-lite";
import {IEmailList} from "../../api/models/IEmailList";
import EmailingForm from "./emailing.form";

const EmailingsForm: FC = () => {
  const [emailings, setEmailings] = useState<IEmailing[]>([])

  const [createEmailingVisible, setCreateEmailingVisible] = useState<boolean>(false)
  const [emailingInfoVisible, setEmailingInfoVisible] = useState<boolean>(false)

  EmailingService.getEmailings().then(response => {
    setEmailings(response.data)
  })

  return (
    <table>
      <caption>Список рассылки</caption>
      <thead>
        <tr>
          <td>
            <button onClick={() => setCreateEmailingVisible(true)}>
              Создать рассылку
            </button>
            <Modal active={createEmailingVisible} setActive={setCreateEmailingVisible}>
              <EmailingCreateForm active={createEmailingVisible} setActive={setCreateEmailingVisible}/>
            </Modal>
          </td>
        </tr>
      <tr>
        <th>Название рассылки</th>
      </tr>
      </thead>
        <tbody>
          {emailings.map(emailing =>
            <tr>
              <th>{emailing.name}</th>
              <td>
                <button onClick={() => setEmailingInfoVisible(true)}>
                  Просмотреть детали
                </button>
                <Modal active={emailingInfoVisible} setActive={setEmailingInfoVisible}>
                  <EmailingForm emailingId={emailing.id}/>
                </Modal>
              </td>
            </tr>
      )}
      </tbody>
    </table>
  );
};

export default observer(EmailingsForm);