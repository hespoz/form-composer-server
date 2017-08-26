import React, { Component } from 'react';

const EditTemplate = (props) => {
    return (
        <div className="App">

            <div className={"input-group input-group-lg"}>
                <input type="text" className={"form-control"} placeholder="Username" value={props.template.title}/>
            </div>

            <div className={"input-group input-group-lg"}>
                <textarea>

                </textarea>
            </div>




        </div>
    );
}

export default EditTemplate;