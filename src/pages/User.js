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
            page: 1,
            pageCount: 0,
            list: []
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

    componentWillMount = () => {
        UserApi.getList(1).then((data) => {
            this.setState({
                pageCount: data.pages,
                list: data.data
            });
        });
    };

    delete = () => {
        this.setState({ showModal: true });
    };

    onSave = (data) => {
        UserApi.create(data).then(() => {
            console.log(1111);
            this.close();
            UserApi.getList(this.state.page).then((data) => {
                this.setState({
                    pageCount: data.pages,
                    list: data.data
                });
            });
        })
    };

    /**
     * Sets next page
     * @param next
     */
    pageChange = (next) => {
        UserApi.getList(next).then((data) => {
            this.setState({
                pageCount: data.pages,
                list: data.data,
                page: next
            });
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
                    list={this.state.list}
                    onEdit={this.open}
                    onDelete={this.delete}/>
                <Pagination
                    bsSize="medium"
                    items={this.state.pageCount}
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
