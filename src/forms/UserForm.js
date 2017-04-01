import React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    Modal,
    Button,
} from 'react-bootstrap';

import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import BaseForm from './../components/BaseForm';

class UserForm extends BaseForm {

    constructor(props) {
        super(props);
        /**
         * Validation schema
         * @type {{name, email}}
         */
        this.validatorTypes = {
            name: Joi.string().alphanum().min(3).max(30).required().label('Name'),
            email: Joi.string().email().required().label('Email')
        };
    }

    /**
     * Returns field values for validation
     * @returns {{}}
     */
    getValidatorData = () => {
        return {
            name: this.state.data.name,
            email: this.state.data.email
        };
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
                        <FormGroup validationState={this.isValid('email')}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl id="email"
                                         type="email"
                                         label="email"
                                         value={this.state.data ? this.state.data.email : ''}
                                         onChange={this.onChange}
                                         placeholder="Enter text"/>
                            {this.renderErrorText('email')}
                        </FormGroup>
                        <FormGroup  validationState={'success'}>
                            <ControlLabel>Company</ControlLabel>
                            <FormControl id="company_id"
                                         componentClass="select"
                                         placeholder="select"
                                         defaultValue={this.state.data.company_id}
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

export default validation(strategy)(UserForm);
