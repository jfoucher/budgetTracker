import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import VisibleTransactionsTable from './containers/VisibleTransactionsTable';
import SideBarContainer from './containers/SidebarContainer';
import TitleBar from './components/TitleBar';
import TransactionForm from './containers/TransactionForm';
import MonthChartContainer from './containers/MonthChartContainer';
import TitleH2Container from './containers/TitleH2Container';
import {Visible} from 'react-grid-system'

import {Divider} from 'material-ui'
import {Container, Row, Col} from 'react-grid-system'

import {
    Paper
} from 'material-ui';


class App extends Component {
    constructor(){
        super();
        this.state = {
            sidebarOpen: false
        }
    }

    onMenuClick = () => {
        this.setState({
            sidebarOpen: true
        })
    }
    onClickClose = () => {
        this.setState({
            sidebarOpen: false
        })
    }


    render() {

        return (


                <div className="App">

                    <TitleBar onMenuClick={this.onMenuClick}/>

                    <SideBarContainer open={this.state.sidebarOpen} onClickClose={this.onClickClose} />


                    <Container style={{marginTop:"1em"}}>
                        <TitleH2Container />
                        <Row>

                                <Col sm={6} key="b">


                                        <VisibleTransactionsTable/>

                                </Col>
                                <Visible xs>
                                    <div style={{clear:'both', height:"1em", display:'block'}} />
                                </Visible>
                                <Col sm={6} key="c">
                                        <MonthChartContainer/>
                                </Col>

                        </Row>
                    </Container>
                    <TransactionForm />

                </div>

        );
    }
}

export default App;
