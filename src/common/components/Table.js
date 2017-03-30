import React from 'react';
import {
    Table,
    Button,
    ButtonGroup
} from 'react-bootstrap';

export default class CustomTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    getInitialState = () => {
        return { showModal: false };
    };

    close = () => {
        this.setState({ showModal: false });
    };

    open = () => {
        this.setState({ showModal: true });
    };

    delete = () => {
        this.setState({ showModal: true });
    };

    render() {
        var data = [{
            id: 1,
            name : 'test',
            email: 'test2',
            company: 'test3'
        },{
            id: 1,
            name : 'test',
            email: 'test2',
            company: 'test3'
        },{
            id: 1,
            name : 'test',
            email: 'test2',
            company: 'test3'
        },{
            id: 1,
            name : 'test',
            email: 'test2',
            company: 'test3'
        }];
        return (
            <div>
                <PageHeader>
                    Example page header
                    <Button
                        bsStyle="success"
                        onClick={this.open}
                    >
                        Add
                    </Button>
                </PageHeader>
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
                    {data.map(function(object) {
                        return  (
                            <tr>
                                <td>{object.id}</td>
                                <td>{object.name}</td>
                                <td>{object.email}</td>
                                <td>{object.company}</td>
                                <td>
                                    <ButtonGroup>
                                        <Button
                                            bsStyle="primary"
                                            bsSize="xsmall"
                                            onClick={this.open}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            bsStyle="danger"
                                            bsSize="xsmall"
                                            onClick={this.delete}
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
