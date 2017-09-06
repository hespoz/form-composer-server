import AppDispatcher from '../dispatchers/AppDispatcher';

const TemplatesAction = {

    getTemplatesList : () => {
        AppDispatcher.dispatch({
            actionName: 'getTemplatesList'
        });
    },

    getTemplateById : (id) => {
        AppDispatcher.dispatch({
            actionName: 'getTemplateById',
            data:id
        });
    },

    deleteTemplateById : (id) => {
        AppDispatcher.dispatch({
            actionName: 'deleteTemplateById',
            data:id
        });
    },

    saveTemplate : (template) => {
        AppDispatcher.dispatch({
            actionName: 'saveTemplate',
            data:template
        });
    }

};

export default TemplatesAction;