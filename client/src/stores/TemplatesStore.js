import AppDispatcher from '../dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
import assign from 'object-assign';
import axios from 'axios';

var CHANGE_EVENT = 'change';

var _templatesList = [];
var _template = {};
var _error = null;
var _message = null;

const HOST = 'http://localhost:3000';

var TemplatesStore = assign({}, EventEmitter.prototype, {

    getTemplatesList: function () {
        return _templatesList;
    },

    getTemplate: function () {
        return _template;
    },

    getError: function () {
        return _error;
    },

    getMessage: function () {
        return _message;
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }


});

AppDispatcher.register(function (payload) {

    switch (payload.actionName) {

        // Do we know how to handle this action?
        case 'getTemplatesList':

            axios.get(HOST + '/templates')
                .then(function (response) {
                    _templatesList = response.data;
                    _error = null;
                    TemplatesStore.emitChange();
                })
                .catch(function (error) {
                    console.log(error);
                    _templatesList = [];
                    _error = 'Error getting the templates';
                    TemplatesStore.emitChange();
                });

            break;

        case 'getTemplateById':

            axios.get(HOST + '/templates/' + payload.data)
                .then(function (response) {
                    _template = response.data;
                    _error = null;
                    TemplatesStore.emitChange();
                })
                .catch(function (error) {
                    console.log(error);
                    _template = {};
                    _error = 'Error getting the templates';
                    TemplatesStore.emitChange();
                });

            break;

        case 'saveTemplate':

            console.log(payload.data);

            axios.post(HOST + '/templates', payload.data)
                .then(function (response) {
                    _template = response.data;
                    _message = "Template created";
                    TemplatesStore.emitChange();
                })
                .catch(function (error) {
                    console.log(error);
                    _error = 'Error getting the templates';
                    TemplatesStore.emitChange();
                });

            break;


    }

});

export default TemplatesStore;