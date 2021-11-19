import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
// import "./Login.form.css"

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <div id = "reg">
                  {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link> */}
        <h1 id = "send">Логин</h1>
        <div id = "block_">
            <input className={'input_reg'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder={'Введите e-mail'}
            />
            <input className={'input_reg'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder={'Введите пароль'}
            />
            <button id = "btn"
              onClick={() => store.login(email, password)}
            >
              Войти
            </button>
            </div>
        </div>
    );
};

export default observer(LoginForm);