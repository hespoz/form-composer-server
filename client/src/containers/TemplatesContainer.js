import React, { Component } from 'react';
import TemplatesAction from '../actions/TemplatesAction';
import TemplatesStore from '../stores/TemplatesStore';
import Templates from '../components/Templates';


export default class TemplatesContainer extends Component {

    state = {
        templates:[]
    }

    componentDidMount = () => {
        TemplatesStore.addChangeListener(this.onChange);
        TemplatesAction.getTemplatesList();
    }

    componentWillUnmount = () => {
        TemplatesStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            templates:TemplatesStore.getTemplatesList()
        });
    }

    render() {
        return (
            <Templates templatesList={this.state.templates}/>
        );
    }
}
