import React, {useContext, useEffect} from 'react';
import './App.css';
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import StartPageUnauthorized from "./pages/UnauthorizedUser/Start.page.unauthorized";
import StartPageAuthorized from "./pages/AuthorizedUser/Start.page.authorized";

function App() {
  const {store} = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      console.log('something')
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    return (
      <div>
        Загрузка...
      </div>
    )
  }

  if (!store.isAuth) {
    return (
      
           <StartPageUnauthorized />
    )
  }

  return (
    <div className="App">

     <div id = "top">
          
          <p id = "sender" >MailSender</p> 

          <a className  = "logout"
       
       onClick={() => store.logout()}
     >
       выйти
     </a>
           

    </div>

    <div className = "site">
        <StartPageAuthorized />
       

    </div>



    
    </div>
  );
}

export default observer(App);
