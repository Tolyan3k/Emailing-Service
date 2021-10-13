import React from 'react';
import {useParams} from "react-router-dom";

interface EmailListsIdProps {
  id: string
}

const EmailListsIdPage = () => {
  const {id} = useParams<EmailListsIdProps>()

  return (
    <div>
      Здесь будет находится список рассылки с id = {id}
    </div>
  );
};

export default EmailListsIdPage;