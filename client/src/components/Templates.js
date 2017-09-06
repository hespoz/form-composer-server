import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ReactModal from 'react-modal';

const Templates = (props) => {
    return (<div>

        <ReactModal
            isOpen={props.showDeleteModal}
            contentLabel="Minimal Modal Example"
        >
            <button onClick={props.onDelete}>Delete</button>
            <button onClick={props.onCancel}>Cancel</button>
        </ReactModal>

        <Link to={"/template/new"}>Add Template</Link>
        <table className="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Actions</th>

            </tr>
            </thead>
            <tbody>
                {props.templatesList.map((template,index) => {
                    return (
                        <tr key={index}>
                            <td>{template.id}</td>
                            <td>{template.title}</td>
                            <td>

                                    <Link to={"/template/" + template.id}>Edit</Link>

                                        &nbsp;
                                    <button
                                        type="button"
                                        className={"btn btn-default"}
                                        id={template.id}
                                        onClick={props.onShowDeleteModal}
                                    >
                                        Remove
                                    </button>


                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    </div>)
}

export default Templates;
