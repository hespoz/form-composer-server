import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Templates = (props) => {
    return (<div>

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
                                        className={"btn btn-default"}>Remove</button>


                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>

    </div>)
}

export default Templates;
