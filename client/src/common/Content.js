import React from 'react';
import {  Switch, Route } from 'react-router-dom';

import TemplatesContainer from '../containers/TemplatesContainer';
import EditTemplateContainer from '../containers/SaveTemplateContainer';

const Content = () => {

    return (
        <Switch>
            <Route exact path="/" component={TemplatesContainer}/>
            <Route path="/template/:id" component={EditTemplateContainer}/>
            <Route path="/template/new" component={EditTemplateContainer}/>
        </Switch>
    );

};

export default Content;