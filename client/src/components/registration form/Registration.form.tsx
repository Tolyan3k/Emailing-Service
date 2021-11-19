import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import "./registration.css"

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {store} = useContext(Context)
  
  return (
    <div id = "reg">
          {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" /> */}
      <h1 id = "send">Регистрация</h1>

      <div id = "block_">
      <input 
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder={'Введите e-mail'}
        className = "input_reg"
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder={'Введите пароль'}
        className = "input_reg"

      />
      <button id = "btn"
        onClick={() =>
          store.registration(email, password)}
      >
        зарегистрироваться
      </button>

      </div>

    </div>
  );
};

export default observer(RegistrationForm);