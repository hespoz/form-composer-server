import AppDispatcher from '../dispatchers/AppDispatcher';
import { EventEmitter } from 'events';
import assign from 'object-assign';
import axios from 'axios';

var CHANGE_EVENT = 'change';

var _templatesList = [];
var _template = {};
var _error = '';

const HOST = 'http://localhost:3000';

var TemplatesStore = assign({}, EventEmitter.prototype, {

    getTemplatesList: function() {
        return _templatesList;
    },

    getTemplate: function() {
        return _template;
    },

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }


});

AppDispatcher.register( function( payload ) {

    switch( payload.actionName ) {

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

            _template =
                {id:1, title:"Template", templateJson:{
                form : {
                    form:"Mobil Form",
                        fields:[
                        {
                            id:"nombre",
                            label:"Nombre",
                            type:"text",
                            value:"",
                            onChange:"console.log('Inline function 1',param,index)"
                        },
                        {
                            id:"password",
                            label:"Password",
                            type:"password",
                            value:"",
                            onChange:"console.log('Inline function 2',param,index)"
                        },
                        {
                            id:"birthday",
                            type:"date",
                            value:"2016-05-15",
                            onChange:"console.log('Accept terms',param,index)"
                        } ,
                        {
                            id:"terms",
                            type:"checkbox",
                            label:"Eres mayor de edad?",
                            value:false,
                            onChange:"console.log('Accept terms',param,index)"
                        } ,
                        {
                            id:"city",
                            type:"select",
                            data:['Medellin', 'Berlin'],
                            onChange:"console.log('City selected',param,index)"
                        } ,
                        {
                            id:"signature",
                            type:"signature",
                            label:"Please put your signature"
                        }
                    ]
                }
            }};

            TemplatesStore.emitChange();

            break;



    }

});

export default TemplatesStore;