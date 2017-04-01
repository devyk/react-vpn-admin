import React from 'react';
import {
    HelpBlock,
} from 'react-bootstrap';

export default class BaseForm extends React.Component {

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
            this.setState({
                save : false,
                data: {},
                backup: {}
            });
            this.props.onHide();
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
}
