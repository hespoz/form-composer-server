import React, { Component } from 'react';
import TemplatesAction from '../actions/TemplatesAction';
import TemplatesStore from '../stores/TemplatesStore';
import SaveTemplate from '../components/SaveTemplate';
import Validations from '../utils/Validations';

export default class EditTemplateContainer extends Component {

    state = {
        titleDirty:false,
        templateJsonDirty:false,
        template:{}
    }

    componentDidMount = () => {
        TemplatesStore.addChangeListener(this.onChange);
        if(this.props.match.params.id !== undefined && this.props.match.params.id !== null)
        TemplatesAction.getTemplateById(this.props.match.params.id);
    }

    componentWillUnmount = () => {
        TemplatesStore.removeChangeListener(this.onChange);
    }

    formValidation = (callback) => {
        this.setState({
            titleDirty:true,
            templateJsonDirty:true,
            errorTitle:Validations.isEmpty(this.state.template.title),
            errorTemplateJson:!Validations.isJSON(this.state.template.templateJson)
        }, callback);
    }

    onChange = () => {
        this.setState({
            template:TemplatesStore.getTemplate(),
            error:TemplatesStore.getError(),
            message:TemplatesStore.getMessage()
        });
    }

    onSaveTemplate = () => {
        this.formValidation(function(){
            console.log(this.state)
            if(!this.state.errorTitle && !this.state.errorTemplateJson){
                TemplatesAction.saveTemplate(this.state.template);
            }
        });
    }

    onTitleChange = (value) => {
        let template = this.state.template;
        template.title=value.target.value;
        this.setState({
            errorTitle: this.state.titleDirty && Validations.isEmpty(template.title),
            template:template
        });
    }

    onTemplateChange = (value) => {
        let template = this.state.template;
        template.templateJson=value.target.value;
        this.setState({
            errorTemplateJson: this.state.templateJsonDirty && !Validations.isJSON(template.templateJson),
            template:template
        });
    }

    render() {
        return (
            <SaveTemplate
                error={this.state.error}
                message={this.state.message}
                template={this.state.template}
                errorTitle={this.state.errorTitle}
                errorTemplateJson={this.state.errorTemplateJson}
                onTitleChange={this.onTitleChange}
                onTemplateChange={this.onTemplateChange}
                onSaveTemplate={this.onSaveTemplate}
            />
        );
    }
}
