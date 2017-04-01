import React from 'react';
import {
    Table,
    Button,
    ButtonGroup
} from 'react-bootstrap';

export default class CustomTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {deleting: false};
    }

    /**
     * Calls delete from parent component and
     * set deleting state for specified object.
     * @param object
     */
    onDelete = (object) => {
        this.setState({deleting : object.id});
        this.props.onDelete(object).then(() => {
            this.setState({deleting : false});
        })
    };

    /**
     * Returns true if current object is going to be deleted.
     * @param object
     * @returns {boolean}
     */
    isDeletingState = (object) => {
        return this.state.deleting === object.id
    };

    /**
     * Returns true if action coulumn should be displayed.
     * @returns {boolean}
     */
    isActionsColumnVisible = () => {
        return this.props.onEdit || this.props.onDelete;
    };

    /**
     * Returns rendered representation of the column value.
     * @param key
     * @param object
     * @returns {*}
     */
    renderColumnIndex = (key, object) => {
        return key.render
            ? key.render(object[key.index])
            : object[key.index];
    };

    render() {
        return (
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>#</th>
                        {this.props.headers.map((key, index) => {
                            return (<th key={index}>{key.title}</th>);
                        })}
                        {
                            this.isActionsColumnVisible() && (
                                <th>Actions</th>
                            )
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {this.props.list.map((object) => {
                        return  (
                            <tr key={object.id}>
                                <td>{object.id}</td>
                                {this.props.headers.map((key, index) => {
                                    return (
                                        <td key={index}>
                                            {this.renderColumnIndex(key, object)}
                                        </td>
                                    );
                                })}
                                <td>
                                    <ButtonGroup>
                                        {
                                            this.props.onEdit && (
                                                <Button
                                                    bsStyle="primary"
                                                    bsSize="xsmall"
                                                    onClick={() => this.props.onEdit(object)}
                                                >
                                                    Edit
                                                </Button>
                                            )
                                        }
                                        {
                                            this.props.onDelete && (
                                                <Button
                                                    bsStyle="danger"
                                                    bsSize="xsmall"
                                                    onClick={() => this.onDelete(object)}
                                                >
                                                    {this.isDeletingState(object) ? '...' : 'Delete'}
                                                </Button>
                                            )
                                        }
                                    </ButtonGroup>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </Table>
            </div>
        )
    }
}
