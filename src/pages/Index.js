import React from 'react';
import { browserHistory } from 'react-router';
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

export default class LoginPage extends React.Component {
  render() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="company">
            <Row className="clearfix">
                <Col sm={2}>
                    <Nav bsStyle="pills" stacked>
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
                            <UserPage/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="company">
                            <CompanyPage/>
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
