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
    }

};

export default TemplatesAction;