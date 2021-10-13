import React, {FC} from 'react';
import {useHistory} from 'react-router-dom'

const Navbar = () => {
  const history = useHistory()

  return (
    <nav className={'user-menu'}>
      <button onClick={() => history.push('/contacts')}>
        Контакты
      </button>
      <button
        onClick={() => history.push('/email_lists')}
      >
        Списки рассылки
      </button>
      <button
        onClick={() => history.push('/email_templates')}
      >
        Шаблоны писем
      </button>
      <button onClick={() => history.push('/emailings')}>
        Рассылки
      </button>
    </nav>
  );
};

export default Navbar;