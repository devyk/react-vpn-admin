import React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    Modal,
    Button
} from 'react-bootstrap';

export default class UserForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: {
                company_id : 1,
                ...nextProps.data,
            },
        });
    };

    onChange = (event) => {
        let state = this.state;
        if (!state.data) {
            state.data = {};
        }
        state.data[event.target.id] = event.target.value;
        this.setState(state);
    };

    onSave = () => {
        console.log(this.state);
        if (this.props.onSave) {
            this.props.onSave(this.state.data);
        }
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>User form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl id="name"
                                         type="text"
                                         label="Text"
                                         value={this.state.data ? this.state.data.name : ''}
                                         onChange={this.onChange}
                                         placeholder="Enter text"/>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl id="email"
                                         type="email"
                                         label="email"
                                         value={this.state.data ? this.state.data.email : ''}
                                         onChange={this.onChange}
                                         placeholder="Enter text"/>
                            <ControlLabel>Company</ControlLabel>
                            <FormControl id="company_id"
                                componentClass="select"
                                placeholder="select"
                                onChange={this.onChange}
                            >
                                {this.props.companies.map(function(object) {
                                    return <option key={object.id} value={object.id}>{object.name}</option>
                                })}
                            </FormControl>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button bsStyle="success" onClick={this.onSave}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}