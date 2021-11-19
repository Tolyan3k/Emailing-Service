import React, {FC, useState} from 'react';
import Modal from "../../components/modal/Modal";
import RegistrationForm from "../../components/registration form/Registration.form";
import LoginForm from "../../components/login form/Login.form";
import {observer} from "mobx-react-lite";

import "./css/unauthorized.css";
import business from "./css/bus.jpg";


const StartPageUnauthorized: FC = () => {
  const [modalRegActive, setModalRegActive] = useState<boolean>(false)
  const [modalLoginActive, setModalLoginActive] = useState<boolean>(false)

  return (
    <html className = "">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />

      <div id = "top">
          
            <p id = "sender" >MailSender</p> 

            <nav className = "nav_reg">
              <a  className = "log" onClick = { () => setModalLoginActive(true)} >войти</a>  
              <a  className = "log" onClick = { () => setModalRegActive(true)} >зарегистрироваться</a>
            </nav>                 
             

      </div>

      <div className = "site">

          <div>
            <p className = "txt">
              MailSender - сервис отправки email рассылок
            </p>

            <button className = "txt" onClick = { () => setModalRegActive(true)} >
                 Зарегистрироваться
            </button>
          </div>

            <div>
              <img  id = "man" src={business} alt="business" />
            </div>
  
      </div>




  <Modal active={modalRegActive} setActive={setModalRegActive}>
        <RegistrationForm/>
  </Modal>

  <Modal active={modalLoginActive} setActive={setModalLoginActive}>
        <LoginForm/>
  </Modal>


    </html>
  );
};

export default observer(StartPageUnauthorized);