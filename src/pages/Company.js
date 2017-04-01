import React from 'react';
import {
    PageHeader,
    Button,
    Pagination,
} from 'react-bootstrap';
import CustomTable from '../components/Table';
import CompanyApi from './../api/CompanyApi';
import CompanyForm from './../forms/CompanyForm';
import Format from './../helpers/Format';
import BasePage from './../components/BasePage';

export default class CompanyPage extends BasePage {

    deleteEntity = (data) => {
        return CompanyApi.remove(data.id);
    };

    createEntity = (data) => {
        return CompanyApi.create(data);
    };

    updateEntity = (data) => {
        return CompanyApi.update(data.id, data);
    };

    loadEntityList = (page) => {
        return CompanyApi.getList(page);
    };

    render() {
        return (
            <div>
                <PageHeader>
                    Companies
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
                            title : 'Quota',
                            index : 'quota',
                            render: Format.bytes
                        }]}/>
                        <Pagination
                            bsSize="medium"
                            items={this.state.pageCount}
                            activePage={this.state.page}
                            onSelect={this.loadPage}/>
                        <CompanyForm
                            show={this.state.showModal}
                            onHide={this.onModalHide}
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
