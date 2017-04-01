import React from 'react';
import {
    PageHeader,
    Button,
    Pagination,
} from 'react-bootstrap';
import CustomTable from '../components/Table';
import UserApi from '../api/UserApi';
import UserForm from './../forms/UserForm';
import Format from './../helpers/Format';
import BasePage from './../components/BasePage';

export default class UserPage extends BasePage {

    deleteEntity = (data) => {
        return UserApi.remove(data.id);
    };

    createEntity = (data) => {
        return UserApi.create(data);
    };

    updateEntity = (data) => {
        return UserApi.update(data.id, data);
    };

    loadEntityList = (page) => {
        return UserApi.getList(page);
    };

    render() {
        return (
            <div>
                <PageHeader>
                    Users
                    <Button
                        bsStyle="success"
                        onClick={() => this.onModalOpen()}
                    >
                        Add
                    </Button>
                </PageHeader>
                {
                    !!this.state.list.length && (<div>
                        <CustomTable
                            list={this.state.list}
                            onEdit={this.onModalOpen}
                            onDelete={this.onDelete}
                            headers={[{
                                title : 'Name',
                                index : 'name'
                            }, {
                                title : 'Email',
                                index : 'email'
                            }, {
                                title : 'Company',
                                index : 'company_id',
                                render : (id) => {return Format.name(id, this.props.companiesList)}
                            }]}/>
                        <Pagination
                            bsSize="medium"
                            items={this.state.pageCount}
                            activePage={this.state.page}
                            onSelect={this.loadPage}/>
                        <UserForm
                            show={this.state.showModal}
                            onHide={this.onModalHide}
                            onSave={this.onSave}
                            data={this.state.entity}
                            companies={this.props.companiesList}
                        />
                    </div>)
                }
            </div>
        )
    }
}
