import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const {store} = useContext(Context)

  return (
    <div>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
        placeholder={'Введите e-mail'}
      />
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
        placeholder={'Введите пароль'}
      />
      <button
        onClick={() => store.registration(email, password)}
      >
        Зарегистрироваться
      </button>
    </div>
  );
};

export default observer(RegistrationForm);