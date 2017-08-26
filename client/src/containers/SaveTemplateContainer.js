import React, { Component } from 'react';
import TemplatesAction from '../actions/TemplatesAction';
import TemplatesStore from '../stores/TemplatesStore';
import EditTemplate from '../components/SaveTemplate';


export default class EditTemplateContainer extends Component {

    state = {
        template:{}
    }

    componentDidMount = () => {
        TemplatesStore.addChangeListener(this.onChange);
        TemplatesAction.getTemplateById(1);
    }

    componentWillUnmount = () => {
        TemplatesStore.removeChangeListener(this.onChange);
    }

    onChange = () => {
        this.setState({
            template:TemplatesStore.getTemplate()
        });
    }

    render() {
        return (
            <EditTemplate template={this.state.template}/>
        );
    }
}
