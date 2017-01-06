import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import SpentForm from './components/SpentForm';
import TitleBar from './components/TitleBar';
import VisibleTransactionsTable from './containers/VisibleTransactionsTable';
import Alert from './components/Alert';
import SideBarContainer from './containers/SidebarContainer';
import TitleBarContainer from './containers/TitleBarContainer';
import TransactionForm from './containers/TransactionForm';
import CategoriesChartContainer from './containers/CategoriesChartContainer';

import md5 from 'md5';

import * as types from './constants/actionTypes'

import {Container, Row, Col, Visible, Hidden} from 'react-grid-system'
import { reducer as formReducer, reset } from 'redux-form'

import {
    Drawer,
    AppBar,
    MenuItem,
    Paper,
    Divider
} from 'material-ui';

import {ContentAdd} from 'material-ui/svg-icons';

class App extends Component {

    render() {

        return (


                <div className="App">

                    <TitleBarContainer/>

                    <SideBarContainer />


                    <Container style={{marginTop:"1em"}}>
                        <Row>

                                <Col sm={6} key="b">

                                    <Paper zDepth={1}>

                                        <VisibleTransactionsTable/>

                                    </Paper>
                                </Col>


                                <Col sm={6} key="c">
                                    <Paper zDepth={1}>
                                        <CategoriesChartContainer/>
                                    </Paper>
                                </Col>

                        </Row>
                    </Container>
                    <TransactionForm />

                </div>

        );
    }
}

export default App;
