import React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    Modal,
    Button,
    HelpBlock,
    InputGroup,
    Glyphicon
} from 'react-bootstrap';

import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';

class CompanyForm extends React.Component {

    constructor(props) {
        super(props);

        /**
         * Initial state
         * @type {{data: boolean, save: boolean}}
         */
        this.state = {
            data: false,
            save : false
        };

        /**
         * Validation schema
         * @type {{name, email}}
         */
        this.validatorTypes = {
            name: Joi.string().alphanum().min(3).max(30).required().label('Name'),
            quota: Joi.number().integer().min(1)
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.backup !== nextProps.data) {
            this.setState({
                data: {
                    company_id : 1,
                    ...nextProps.data,
                },
                backup: nextProps.data
            });
            this.props.clearValidations();
        }
    };

    /**
     * Returns field values for validation
     * @returns {{}}
     */
    getValidatorData = () => {
        return {
            name: this.state.data.name,
            quota: this.state.data.quota
        };
    };

    onChange = (event) => {
        let state = this.state;
        if (!state.data) {
            state.data = {};
        }
        state.data[event.target.id] = event.target.value;
        this.setState(state);
        this.props.validate(event.target.id)
    };

    onSave = () => {
        this.setState({ save : true });
        this.props.onSave(this.state.data).then(() => {
            this.setState({ save : false });
        });
    };

    renderErrorText = (field) => {
        let message = this.props.getValidationMessages(field);
        if (message) {
            return (<HelpBlock>{message[0]}</HelpBlock>);
        }
    };

    isValid = (field) => {
        return this.props.isValid(field) ? 'success' : 'error';
    };

    isLoading = () => {
        return this.state.save;
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.validate((error) => {
            if (!error) {
                this.onSave();
            }
        });
    };

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onHide}>
                <Modal.Header closeButton>
                    <Modal.Title>User form</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.onSubmit}>
                        <FormGroup validationState={this.isValid('name')}>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl id="name"
                                         type="text"
                                         label="Text"
                                         value={this.state.data ? this.state.data.name : ''}
                                         onChange={this.onChange}
                                         placeholder="Enter text"/>
                            {this.renderErrorText('name')}
                        </FormGroup>
                        <FormGroup validationState={this.isValid('quota')}>
                            <ControlLabel>Quota</ControlLabel>
                            <InputGroup>
                                <FormControl id="quota"
                                             type="text"
                                             label="quota"
                                             value={this.state.data ? this.state.data.quota : ''}
                                             onChange={this.onChange}
                                             placeholder="Enter company quota"/>
                                <InputGroup.Addon>
                                    <Glyphicon glyph="fire" />
                                </InputGroup.Addon>
                            </InputGroup>
                            {this.renderErrorText('quota')}
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
                            onClick={this.onSubmit}
                            disabled={this.isLoading() || !this.props.getValidationMessages()}
                    >
                        {this.isLoading() ? '...' : 'Save'}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default validation(strategy)(CompanyForm);