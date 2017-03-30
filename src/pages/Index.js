import React from 'react';
import { browserHistory } from 'react-router';
import {
    Tab,
    Row,
    Col,
    Nav,
    NavItem,
    PageHeader,
} from 'react-bootstrap';
import UserPage from './User';

export default class LoginPage extends React.Component {
  render() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="clearfix">
                <Col sm={2}>
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first">
                            Users
                        </NavItem>
                        <NavItem eventKey="second">
                            Companies
                        </NavItem>
                        <NavItem eventKey="third">
                            Abusers
                        </NavItem>
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content animation>
                        <Tab.Pane eventKey="first">
                            <UserPage/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <PageHeader>Example page header <small>Subtext for header</small></PageHeader>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
  }
}
