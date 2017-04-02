import React from 'react';
import {
    FormGroup,
    ControlLabel,
    FormControl,
    Modal,
    Button,
    InputGroup,
    Glyphicon
} from 'react-bootstrap';

import Joi from 'joi';
import validation from 'react-validation-mixin';
import strategy from 'joi-validation-strategy';
import BaseForm from './../components/BaseForm';

class CompanyForm extends BaseForm {

    constructor(props) {
        super(props);
        this.validatorTypes = {
            name: Joi.string().trim().min(3).max(255).required().label('Name'),
            quota: Joi.number().integer().min(100).max(10000000000000).required().label('Quota')
        };
    }

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
                                         placeholder="Enter company name"/>
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
                                             placeholder="Enter company quota in bytes"/>
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
