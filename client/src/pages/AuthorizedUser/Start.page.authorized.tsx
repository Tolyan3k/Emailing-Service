import Navbar from "../../components/navbar/Navbar";
import AppRouter from "../../components/app router/AppRouter";
import {observer} from "mobx-react-lite";
import {FC} from "react";
import {BrowserRouter} from "react-router-dom";

const StartPageAuthorized = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
};

export default StartPageAuthorized;