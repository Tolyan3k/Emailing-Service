import React, {useCallback, useEffect, useState} from 'react';
import {IEmailing} from "../../../api/models/IEmailing";
import EmailingService from "../../../api/services/emailing.service";
import Modal from "../../../components/modal/Modal";
import EmailingCreateForm from "../../../components/emailings/emailing.create.form";
import {useHistory} from "react-router-dom";
import {IEmailList} from "../../../api/models/IEmailList";
import EmailListService from "../../../api/services/emailList.service";
import './Emailing.css';




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
    <div>
            {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}


            <div id = "div_contact">
            <h1 id = "nametag">Рассылки</h1>

            <div id = "div_con"> 
      {/* <table id = "style_table" className = "fl-table">
        <thead>
          <tr>
            <th>Название</th>
            <th>Кол-во получателей</th>
            <th>Отправлено</th>
            <th>Не удалось отправить</th>
            <th>Ожидает отправки</th>
            <th></th>
            <th></th>
            
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
          <tr key={emailing.id}>
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
              запустить
              </button>
            }</td>
            <td>
              <button
                onClick={() => {history.push(`/emailings/${emailing.id}`)}}
              >
                подробнее
              </button>
            </td>
            <td>{
              !emailing.inProcess
                && <button
                onClick={() => {
                  setLoading(true)
                  EmailingService.deleteEmailing(emailing.id)
                    .then(() => {
                      fetchEmailings()
                    })
                      .finally(() => {
                        setLoading(false)
                      })
                }}
              >
                <i className="">удалить</i>
              </button>
            }</td>
          </tr>
        )}
        </tbody>
      </table> */}


<div className="tbl-header">
    <table cellPadding="0" cellSpacing="0" >
      <thead>
        <tr>
        <th id = "name_of_emailing">Название</th>
            <th id = "count_of_emailing">Кол-во получателей</th>
            <th>Отправлено</th>
            <th>Не удалось отправить</th>
            <th>Ожидает отправки</th>
            <th id = "indent_for_email"> </th>
            <th> </th>
            
            <th>
              <button id="btn_emailing"
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
          <tr key={emailing.id}>
            <td id = "emailing_name">{emailing.name}</td>
            <td id = "emailing_length">{emailing.emailsStatus.length}</td>
            <td id = "sent">{emailing.emailsStatus.filter(emailStatus => emailStatus.status === 'Отправлено').length}</td>
            <td id = "mistake">{emailing.emailsStatus.filter(emailStatus => emailStatus.status === 'Ошибка во время отправки').length}</td>
            <td id = "preready">{emailing.emailsStatus.filter(emailStatus => emailStatus.status === 'Готовится к отправке').length}</td>
            <td>{emailing.inProcess
              ? "Запущена"
              : <button id = "startEmailing"
                onClick={() => {
                  EmailingService.startEmailing(emailing.id)
                    .then(fetchEmailings)
                }}
              >
              запустить
              </button>
            }</td>
            <td>
              <button id = "more_info"
                onClick={() => {history.push(`/emailings/${emailing.id}`)}}
              >
                подробнее
              </button>
            </td>
            <td>{
              !emailing.inProcess
                && <button id = "delete_button"
                onClick={() => {
                  setLoading(true)
                  EmailingService.deleteEmailing(emailing.id)
                    .then(() => {
                      fetchEmailings()
                    })
                      .finally(() => {
                        setLoading(false)
                      })
                }}
              >
                <i>удалить</i>
              </button>
            }</td>
          </tr>
        )}
      
      </tbody>
    </table>
  </div>


      <Modal active={showEmailingCreate} setActive={setShowEmailingCreate}>
        <EmailingCreateForm active={showEmailingCreate} setActive={setShowEmailingCreate}/>
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

export default EmailingsPage;