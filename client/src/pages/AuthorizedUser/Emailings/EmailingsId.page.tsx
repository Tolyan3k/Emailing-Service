import React from 'react';
import {useParams} from "react-router-dom";

interface EmailingsIdProps {
  id: string
}

const EmailingsIdPage = () => {
  const {id} = useParams<EmailingsIdProps>()

  return (
    <div>
      Здесь будет находится страница рассылки с id = {id}
    </div>
  );
};

export default EmailingsIdPage;
