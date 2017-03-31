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
            data: false,
            save : false
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
        if (this.props.onSave) {
            this.setState({ save : true });
            this.props.onSave(this.state.data).then(() => {
                this.setState({ save : false });
            });
        }
    };

    isLoading = () => {
        return this.state.save;
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
                                         defaultValue={this.state.data ? this.state.data.company_id : 1}
                                         onChange={this.onChange}
                            >
                                {this.props.companies.map((object) => {
                                    return <option key={object.id} value={object.id}>{object.name}</option>
                                })}
                            </FormControl>
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}
                            disabled={this.isLoading()}
                    >
                        Close
                    </Button>
                    <Button bsStyle="success"
                            onClick={this.onSave}
                            disabled={this.isLoading()}
                    >
                        {this.isLoading() ? '...' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}