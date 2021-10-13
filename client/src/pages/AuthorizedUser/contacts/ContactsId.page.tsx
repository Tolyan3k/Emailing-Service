import React from 'react';
import {useParams} from "react-router-dom";

interface ContactsIdPageProps {
  id: string
}

const ContactsIdPage = () => {
  const {id} = useParams<ContactsIdPageProps>()


  return (
    <div>
      Пост с параметром id = {id}
    </div>
  );
};

export default ContactsIdPage;