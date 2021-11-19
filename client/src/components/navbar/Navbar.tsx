import React, {FC} from 'react';
import {useHistory} from 'react-router-dom'
import './Navbar.css';


const Navbar = () => {
  const history = useHistory()

  return (
    <div>
    <div id = "location_nav">
    <nav id = "navbar">

                <a className = "indent_a" onClick={() => history.push('/contacts')}>
                  Контакты
                </a>
             
        
            
                <a className = "indent_a"  onClick={() => history.push('/email_lists')}>
                  Списки рассылки
                </a>
          
          
           
                <a className = "indent_a" onClick={() => history.push('/email_templates')}>
                  Шаблоны писем
                </a>
             
         
            
                <a className = "indent_a" onClick={() => history.push('/emailings')}>
                  Рассылки
                </a>
              
      </nav>

      </div> 
    </div>
  );
};

export default Navbar;