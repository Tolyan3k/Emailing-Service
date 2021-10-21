import React, {useCallback, useEffect, useState} from 'react';
import {IEmailing} from "../../../api/models/IEmailing";
import EmailingService from "../../../api/services/emailing.service";
import Modal from "../../../components/modal/Modal";
import EmailingCreateForm from "../../../components/emailings/emailing.create.form";
import {useHistory} from "react-router-dom";
import {IEmailList} from "../../../api/models/IEmailList";
import EmailListService from "../../../api/services/emailList.service";

const EmailingsPage = () => {
  const history = useHistory()
  const [emailings, setEmailings] = useState<IEmailing[]>([])
  const [showEmailingCreate, setShowEmailingCreate] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const fetchEmailings = useCallback(() => {
    EmailingService.getEmailings()
      .then((resp) => {
        setEmailings(resp.data)
      })
  }, [])

  // fetchEmailings()

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmailings()
    }, 1000)

    return () => clearTimeout(timer)
  }, [emailings])

  const loadingScreen = (
    <div>
      Загрузка...
    </div>
  )

  const mainScreen = (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <table>
        <caption>Рассылки</caption>
        <thead>
          <tr>
            <th>Название</th>
            <th>Кол-во получателей</th>
            <th>Отправлено</th>
            <th>Не удалось отправить</th>
            <th>Ожидает отправки</th>
            <th>
              <button
                onClick={() => {
                  setShowEmailingCreate(true)
                }}
              >
                Создать рассылку
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
        {emailings.map(emailing =>
          <tr>
            <td>{emailing.name}</td>
            <td>{emailing.emailsStatus.length}</td>
            <td>{emailing.emailsStatus.filter(emailStatus => emailStatus.status === 'Отправлено').length}</td>
            <td>{emailing.emailsStatus.filter(emailStatus => emailStatus.status === 'Ошибка во время отправки').length}</td>
            <td>{emailing.emailsStatus.filter(emailStatus => emailStatus.status === 'Готовится к отправке').length}</td>
            <td>{emailing.inProcess
              ? "Запущена"
              : <button
                onClick={() => {
                  EmailingService.startEmailing(emailing.id)
                    .then(fetchEmailings)
                }}
              >
                Запустить
              </button>
            }</td>
            <td>
              <button
                onClick={() => {history.push(`/emailings/${emailing.id}`)}}
              >
                Подробнее
              </button>
            </td>
            <td>{
              !emailing.inProcess
                && <button
                onClick={() => {
                  setLoading(true)
                  EmailingService.deleteEmailing(emailing.id)
                    .then(fetchEmailings)
                }}
              >
                X
              </button>
            }</td>
          </tr>
        )}
        </tbody>
      </table>

      <Modal active={showEmailingCreate} setActive={setShowEmailingCreate}>
        <EmailingCreateForm active={showEmailingCreate} setActive={setShowEmailingCreate}/>
      </Modal>
    </div>
  )

  return (
    isLoading
      ? loadingScreen
      : mainScreen
  );
};

export default EmailingsPage;