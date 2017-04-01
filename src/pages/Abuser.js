import React from 'react';
import {
    PageHeader,
    Button,
    Pagination,
    ButtonGroup
} from 'react-bootstrap';
import CustomTable from '../components/Table';
import AbuserApi from './../api/AbuserApi';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import Format from './../helpers/Format';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default class AbuserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            startDate: Moment(),
            loadingReport: false
        };
    }

    handleChange = (date) => {
        this.setState({startDate: date});
    };

    handleReport = () => {
        this.setState({loadingReport: true});
        return AbuserApi.report(this.getFormatedDate()).then((data) => {
            this.setState({
                list: data,
                loadingReport: false
            });
        });
    };

    isFirstDayOfTheMonth = (moment) => {
        return moment.date() == 1;
    };

    getFormatedDate = () => {
        return this.state.startDate.format('YYYY-MM');
    };

    render() {
        return (
            <div>
                <PageHeader>
                    Abusers
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        customInput={<button>{this.getFormatedDate()}</button>}
                        filterDate={this.isFirstDayOfTheMonth}
                        showMonthDropdown
                    />
                    <ButtonGroup>
                        <Button
                            bsStyle="primary"
                            onClick={this.handleReport}
                            disabled={this.state.loadingReport}
                        >
                            {this.state.loadingReport ? '...' : 'Show report'}
                        </Button>
                        <Button
                            bsStyle="danger"
                            onClick={() => this.open()}
                        >
                            Generate
                        </Button>
                    </ButtonGroup>
                </PageHeader>
                {
                    !!this.state.list.length && (<div>
                        <CustomTable
                            list={this.state.list}
                            headers={[{
                                title: 'Name',
                                index: 'name'
                            }, {
                                title: 'Quota',
                                index: 'quota',
                                render: Format.bytes
                            }, {
                                title: 'Total',
                                index: 'total',
                                render: Format.bytes
                            }]}
                        />
                    </div>)
                }
            </div>
        )
    }
}
