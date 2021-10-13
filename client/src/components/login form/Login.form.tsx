import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import "./Login.form.css"

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const {store} = useContext(Context)

    return (
        <div className={'login-form'}>
            <input className={'login-input'}
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder={'Введите e-mail'}
            />
            <input className={'login-input'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                placeholder={'Введите пароль'}
            />
            <button className={'login-btn'}
              onClick={() => store.login(email, password)}
            >
              Войти
            </button>
        </div>
    );
};

export default observer(LoginForm);