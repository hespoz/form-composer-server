import React, { Component } from 'react';

import ReactModal from 'react-modal';

import TemplatesAction from '../actions/TemplatesAction';
import TemplatesStore from '../stores/TemplatesStore';
import Templates from '../components/Templates';


export default class TemplatesContainer extends Component {

    state = {
        templates:[],
        showDeleteModal:false
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

    onShowDeleteModal = (event) => {
        this.setState({
            templateId:event.target.id,
            showDeleteModal:true
        });
    }

    onDelete = () => {
        this.setState({showDeleteModal:false});
        TemplatesAction.deleteTemplateById(this.state.templateId);
    }

    onCancel = () => {
        this.setState({
            templateId:null,
            showDeleteModal:false
        })
    }


    render() {
        return (
            <Templates
                templatesList={this.state.templates}
                showDeleteModal={this.state.showDeleteModal}
                onShowDeleteModal={this.onShowDeleteModal}
                onDelete={this.onDelete}
                onCancel={this.onCancel}
            />
        );
    }
}
