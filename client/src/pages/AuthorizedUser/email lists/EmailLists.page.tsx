import React, {useCallback, useEffect, useState} from 'react';
import Modal from "../../../components/modal/Modal";
import EmailListCreateForm from "../../../components/email list/emailList.create.form";
import EmailListForm from "../../../components/email list/emailList.form";
import {IEmailList} from "../../../api/models/IEmailList";
import EmailListService from "../../../api/services/emailList.service";
import {useHistory} from "react-router-dom";
import './EmailList.page.css';

const EmailListsPage = () => {
  const history = useHistory()
  const [emailLists, setEmailLists] = useState<IEmailList[]>([])
  // const [emailListActive, setEmailListActive] = useState<boolean>(false)
  const [makeEmailListActive, setMakeEmailListActive] = useState<boolean>(false)

  const fetchEmailLists = useCallback(() => {
    EmailListService.getEmailLists()
      .then(resp => {
        setEmailLists(resp.data)
      })
  }, [])

  useEffect(() => {
    fetchEmailLists()
  }, [fetchEmailLists, makeEmailListActive])

  return (
    <div>
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}
      
      
      <div id = "div_contact">
            <h1 id = "nametag">Списки рассылки</h1>

            <div id = "div_con"> 
            
      <table id = "style_table_list_of_email"
     
      >
     
        <thead>
        <tr>
          <th id="table_lists_name">Название</th>
          <th id = "table_count_lists">Кол-во контактов</th>
          <th></th>
          <th>
            <button id = "create_btn"
              onClick={() => setMakeEmailListActive(true)}
            >
              Создать список рассылки
            </button>
            <Modal active={makeEmailListActive} setActive={setMakeEmailListActive}>
              <EmailListCreateForm modalActive={makeEmailListActive} setModalActive={setMakeEmailListActive}/>
            </Modal>
          </th>
        </tr>
        </thead>
        <tbody>
        {
          emailLists.map(emailList =>
            <tr key={emailList.id}>
              <td id= "email_list_name">{emailList.name}</td>
              <td>{emailList.emails.length}</td>
              
              <td>
                <button id = "about_emailLists"
                  // onClick={() => setEmailListActive(true)}
                  onClick={() => history.push(`/email_lists/${emailList.id}`)}
                >
                  Подробнее
                </button>
              </td>
              
              <td>
                
                <button
                  onClick={() => {
                    EmailListService.deleteEmailList(emailList.id)
                      .then(fetchEmailLists)
                  }}
                >

                  <i className="">X</i>
                
                </button>
              
              </td>
            </tr>
          )
        }
        </tbody>
      </table>

      </div>
      </div>
        
    </div>
  );
};

export default EmailListsPage;