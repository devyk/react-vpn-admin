import React from 'react';
import {
    Tab,
    Row,
    Col,
    Nav,
    NavItem,
} from 'react-bootstrap';

import UserPage from './User';
import CompanyPage from './Company';
import AbuserPage from './Abuser';
import CompanyApi from './../api/CompanyApi';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
        };
    }

    reloadCompaniesList = () => {
        CompanyApi.getList().then((companies) => {
            this.setState({
                companies: companies.data
            });
        });
    };

    render() {
        return (
            <Tab.Container id="left-tabs-example" defaultActiveKey="company">
                <Row className="clearfix">
                    <Col sm={2}>
                        <Nav bsStyle="pills" stacked onSelect={this.handleSelect}>
                            <NavItem eventKey="user">
                                Users
                            </NavItem>
                            <NavItem eventKey="company">
                                Companies
                            </NavItem>
                            <NavItem eventKey="abuser">
                                Abusers
                            </NavItem>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Tab.Content animation>
                            <Tab.Pane eventKey="user">
                                <UserPage companiesList={this.state.companies}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="company">
                                <CompanyPage onChange={this.reloadCompaniesList}/>
                            </Tab.Pane>
                            <Tab.Pane eventKey="abuser">
                                <AbuserPage/>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}
