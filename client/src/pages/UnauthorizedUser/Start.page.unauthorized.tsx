import React, {FC, useState} from 'react';
import Modal from "../../components/modal/Modal";
import RegistrationForm from "../../components/registration form/Registration.form";
import LoginForm from "../../components/login form/Login.form";
import {observer} from "mobx-react-lite";

const StartPageUnauthorized: FC = () => {
  const [modalRegActive, setModalRegActive] = useState<boolean>(false)
  const [modalLoginActive, setModalLoginActive] = useState<boolean>(false)

  return (
    <div>
      <main>
        <h1>Начни пользоваться нашим сервисом рассылки прямо сейчас</h1>
        <button onClick={() => setModalRegActive(true)}>
          Я новенький
        </button>

        <button onClick={() => setModalLoginActive(true)}>
          Я уже смешарик
        </button>
      </main>

      <Modal active={modalRegActive} setActive={setModalRegActive}>
        <RegistrationForm/>
      </Modal>

      <Modal active={modalLoginActive} setActive={setModalLoginActive}>
        <LoginForm/>
      </Modal>
    </div>
  );
};

export default observer(StartPageUnauthorized);