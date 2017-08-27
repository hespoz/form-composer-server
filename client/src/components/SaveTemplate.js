import React, {Component} from 'react';

const EditTemplate = (props) => {
    return (
        <div className="App">

            {props.error != null ?
                (<div className={"alert alert-danger"} role="alert">{props.error}</div>)
                :
                null
            }

            {props.message != null ?
                (<div className={"alert alert-success"} role="alert">{props.message}</div>)
                :
                null
            }

            <div className={"input-group input-group-lg"}>
                <input
                    type="text"
                    className={"form-control"}
                    placeholder="Username"
                    value={props.template.title}
                    onChange={props.onTitleChange}
                />
                {props.errorTitle ?
                    (<p>Title can't be empty</p>)
                        :
                    null
                }
            </div>

            <div className={"input-group input-group-lg"}>
                <textarea
                    value={props.template.templateJson}
                    onChange={props.onTemplateChange}
                />
                {props.errorTemplateJson ?
                    (<p>Template json can't be empty</p>)
                    :
                    null
                }
            </div>


            <div className={"btn-group"}>
                <button type="button" className={"btn btn-default"} onClick={props.onSaveTemplate}>Save</button>
            </div>

        </div>
    );
}

export default EditTemplate;