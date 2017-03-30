import React from 'react';
import { browserHistory } from 'react-router';
import {
    Tab,
    Row,
    Col,
    Nav,
    NavItem,
    PageHeader,
    Table,
    Pagination,
    Button,
    Modal,
    FormGroup,
    ControlLabel,
    FormControl,
    ButtonGroup
} from 'react-bootstrap';
import CustomTable from '../../common/components/Table';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showModal: false };
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    getInitialState = () => {
        return { showModal: false };
    };

    close = () => {
        this.setState({ showModal: false });
    };

    open = () => {
        this.setState({ showModal: true });
    };
  
  render() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row className="clearfix">
                <Col sm={2}>
                    <Nav bsStyle="pills" stacked>
                        <NavItem eventKey="first">
                            Tab 1
                        </NavItem>
                        <NavItem eventKey="second">
                            Tab 2
                        </NavItem>
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content animation>
                        <Tab.Pane eventKey="first">

                            <CustomTable/>
                            <Pagination
                                bsSize="medium"
                                items={10}
                                activePage={1}/>
                            <Modal show={this.state.showModal} onHide={this.close}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Modal heading</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <form>
                                        <FormGroup controlId={1}>
                                            <ControlLabel>{123}</ControlLabel>
                                            <FormControl id="formControlsText"
                                                         type="text"
                                                         label="Text"
                                                         placeholder="Enter text" />
                                        </FormGroup>
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button onClick={this.close}>Close</Button>
                                </Modal.Footer>
                            </Modal>
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
