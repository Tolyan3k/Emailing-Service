import React, {FC} from 'react';
import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
import ContactsPage from "../../pages/AuthorizedUser/contacts/Contacts.page";
import StartPageAuthorized from "../../pages/AuthorizedUser/Start.page.authorized";
import ContactsIdPage from "../../pages/AuthorizedUser/contacts/ContactsId.page";
import EmailListsPage from "../../pages/AuthorizedUser/email lists/EmailLists.page";
import EmailListsIdPage from "../../pages/AuthorizedUser/email lists/EmailListsId.page";
import EmailTemplatesPage from "../../pages/AuthorizedUser/EmailTemplates.page/EmailTemplates.page";
import EmailTemplatesIdPage from "../../pages/AuthorizedUser/EmailTemplates.page/EmailTemplatesId.page";
import EmailingsPage from "../../pages/AuthorizedUser/Emailings/Emailings.page";
import EmailingsIdPage from "../../pages/AuthorizedUser/Emailings/EmailingsId.page";

const AppRouter: FC = () => {
  return (
    <Switch>
      <Route exact path={'/contacts'} component={ContactsPage}/>
      <Route exact path={'/contacts/:id'} component={ContactsIdPage}/>

      <Route exact path={'/email_lists'} component={EmailListsPage}/>
      <Route exact path={'/email_lists/:id'} component={EmailListsIdPage}/>

      <Route exact path={'/email_templates'} component={EmailTemplatesPage}/>
      <Route exact path={'/email_templates/:id'} component={EmailTemplatesIdPage}/>

      <Route exact path={'/emailings'} component={EmailingsPage}/>
      <Route exact path={'/emailings/:id'} component={EmailingsIdPage}/>

      {/*<Route path={'/'} component={StartPageAuthorized}/>*/}
    </Switch>


  );
};

export default AppRouter;