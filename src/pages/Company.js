import React from 'react';
import {
    PageHeader,
    Button,
    Pagination,
} from 'react-bootstrap';
import CustomTable from '../components/Table';
import CompanyApi from './../api/CompanyApi';
import CompanyForm from './../forms/CompanyForm';

export default class CompanyPage extends React.Component {
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
        this.loadPage(this.state.page);
    };

    onDelete = (data) => {
        return CompanyApi.remove(data.id).then(() => {
            return this.loadPage(this.state.page);
        }).then(() => {
            this.close();
        });
    };

    onSave = (data) => {
        if (data.id) {
            return CompanyApi.update(data.id, data).then(() => {
                return this.loadPage(this.state.page);
            }).then(() => {
                this.close();
            });
        }
        return CompanyApi.create(data).then(() => {
            return this.loadPage(this.state.page);
        }).then(() => {
            this.close();
        });
    };

    /**
     * Sets next page
     * @param next
     */
    loadPage = (next) => {
        return CompanyApi.getList(next).then((data) => {
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
                    Companies
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
                    onDelete={this.onDelete}
                    headers={[{
                        title : 'Name',
                        index : 'name'
                    }, {
                        title : 'Quota',
                        index : 'quota'
                    }]}
                />
                <Pagination
                    bsSize="medium"
                    items={this.state.pageCount}
                    activePage={this.state.page}
                    onSelect={this.loadPage}/>
                <CompanyForm
                    show={this.state.showModal}
                    onHide={this.close}
                    onSave={this.onSave}
                    data={this.state.entity}
                    companies={this.state.companies}
                />
            </div>
        )
    }
}
