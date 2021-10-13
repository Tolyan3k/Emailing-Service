import React from 'react';
import {useParams} from "react-router-dom";

interface EmailTemplatesIdProps {
  id: string
}

const EmailTemplatesIdPage = () => {
  const {id} = useParams<EmailTemplatesIdProps>()

  return (
    <div>
      Здесь будет находится шаблона письма с id = {id}
    </div>
  );
};

export default EmailTemplatesIdPage;