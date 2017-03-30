import React from 'react';
import {
    PageHeader,
    Button,
    Pagination,
    Modal,
    FormGroup,
    ControlLabel,
    FormControl
} from 'react-bootstrap';
import CustomTable from '../components/Table';
import UserApi from './../api/User';
import CompanyApi from './../api/CompanyApi';
import UserForm from './../forms/UserForm';

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            page: 1
        };
    }

    close = () => {
        this.setState({ showModal: false });
    };

    open = (object) => {
        this.setState({
            showModal: true,
            entity: object
        });
    };

    delete = () => {
        this.setState({ showModal: true });
    };

    onSave = (data) => {
        UserApi.create(data);
    };

    /**
     * Sets next page
     * @param next
     */
    pageChange = (next) => {
        this.setState({
            page: next
        });
    };

    render() {
        return (
            <div>
                <PageHeader>
                    Example page header
                    <Button
                        bsStyle="success"
                        onClick={() => this.open()}
                    >
                        Add
                    </Button>
                </PageHeader>
                <CustomTable
                    list={UserApi.getList()}
                    onEdit={this.open}
                    onDelete={this.delete}/>
                <Pagination
                    bsSize="medium"
                    items={10}
                    activePage={this.state.page}
                    onSelect={this.pageChange}/>
                <UserForm
                    show={this.state.showModal}
                    onHide={this.close}
                    onSave={this.onSave}
                    data={this.state.entity}
                    companies={CompanyApi.getList()}
                />
            </div>
        )
    }
}
