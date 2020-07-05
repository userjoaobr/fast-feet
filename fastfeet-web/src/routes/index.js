import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Packages from '../pages/Packages';
import Problems from '../pages/Problems';
import Recipients from '../pages/Recipients';
import AddRecipient from '../pages/Recipients/AddRecipient';
import EditRecipient from '../pages/Recipients/EditRecipient';
import Deliverers from '../pages/Deliverers';
import AddDeliverer from '../pages/Deliverers/AddDeliverer';
import EditDeliverer from '../pages/Deliverers/EditDeliverer';
import AddPackage from '../pages/Packages/AddPackage';
import EditPackage from '../pages/Packages/EditPackage';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/packages" exact isPrivate component={Packages} />
      <Route path="/packages/addPackage" isPrivate component={AddPackage} />
      <Route
        path="/packages/editPackage/:id"
        isPrivate
        component={EditPackage}
      />
      <Route path="/problems" isPrivate component={Problems} />
      <Route path="/recipients" exact isPrivate component={Recipients} />
      <Route
        path="/recipients/addRecipient"
        isPrivate
        component={AddRecipient}
      />
      <Route
        path="/recipients/editRecipient/:id"
        isPrivate
        component={EditRecipient}
      />
      <Route path="/deliverers" exact isPrivate component={Deliverers} />
      <Route
        path="/deliverers/addDeliverer"
        isPrivate
        component={AddDeliverer}
      />
      <Route
        path="/deliverers/editDeliverer/:id"
        isPrivate
        component={EditDeliverer}
      />
    </Switch>
  );
}
