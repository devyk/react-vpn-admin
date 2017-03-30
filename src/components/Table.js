import React from 'react';
import {
    Table,
    Button,
    ButtonGroup
} from 'react-bootstrap';

export default class CustomTable extends React.Component {

    render() {
        return (
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.list.map(function(object) {
                        return  (
                            <tr key={object.id}>
                                <td>{object.id}</td>
                                <td>{object.name}</td>
                                <td>{object.email}</td>
                                <td>{object.company}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button
                                            bsStyle="primary"
                                            bsSize="xsmall"
                                            onClick={() => this.props.onEdit(object)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            bsStyle="danger"
                                            bsSize="xsmall"
                                            onClick={() => this.props.onDelete(object)}
                                        >
                                            Delete
                                        </Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    }.bind(this))}
                    </tbody>
                </Table>
            </div>
        )
    }
}
