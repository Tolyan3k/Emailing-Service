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
        <h1>Сервис по рассылке e-mail сообщений</h1>
        <button onClick={() => setModalRegActive(true)}>
          Зарегистрироваться
        </button>

        <button onClick={() => setModalLoginActive(true)}>
          Войти
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