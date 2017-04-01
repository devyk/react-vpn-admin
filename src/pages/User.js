import React from 'react';
import {
    PageHeader,
    Button,
    Pagination,
} from 'react-bootstrap';
import CustomTable from '../components/Table';
import UserApi from '../api/UserApi';
import CompanyApi from './../api/CompanyApi';
import UserForm from './../forms/UserForm';

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            page: 1,
            pageCount: 0,
            list: [],
            companies: []
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
            CompanyApi.getList().then((companies) => {
                console.log(companies);
                this.setState({
                    pageCount: data.pages,
                    list: data.data,
                    companies: companies.data
                });
            });
        });
    };

    delete = (data) => {
        return UserApi.remove(data.id).then(() => {
            UserApi.getList(this.state.page).then((data) => {
                this.setState({
                    pageCount: data.pages,
                    list: data.data
                });
                this.close();
            });
        });
    };

    onSave = (data) => {

        if (data.id) {
            return UserApi.update(data.id, data).then((response) => {
                return UserApi.getList(this.state.page).then((data) => {
                    this.setState({
                        pageCount: data.pages,
                        list: data.data
                    });
                    this.close();
                });
            });
        }
        return UserApi.create(data).then(() => {
            return UserApi.getList(this.state.page).then((data) => {
                this.setState({
                    pageCount: data.pages,
                    list: data.data
                });
                this.close();
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
                    Users
                    <Button
                        bsStyle="success"
                        onClick={() => this.open()}
                    >
                        Add
                    </Button>
                </PageHeader>
                {
                    !!this.state.list.length && (<div>
                        <CustomTable
                            list={this.state.list}
                            onEdit={this.open}
                            onDelete={this.delete}
                            headers={[{
                                title : 'Name',
                                index : 'name'
                            }, {
                                title : 'Email',
                                index : 'email'
                            }, {
                                title : 'Company',
                                index : 'company_id'
                            }]}/>
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
                            companies={this.state.companies}
                        />
                    </div>)
                }
            </div>
        )
    }
}
