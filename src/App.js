import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
//import './App.css';
import VisibleTransactionsTable from './containers/VisibleTransactionsTable';
import SideBarContainer from './containers/SidebarContainer';
import TitleBar from './components/TitleBar';
import TransactionForm from './containers/TransactionForm';
import MonthChartContainer from './containers/MonthChartContainer';
import TitleH2Container from './containers/TitleH2Container';
import {Visible} from 'react-grid-system'
import {Store, DB} from './store'
import Alert from './components/Alert'
import {Container, Row, Col, Hidden} from 'react-grid-system'

//console.log('store', Store);
//
//Store.subscribe(() => {
//    console.log('store state', Store.getState());
//})

class App extends Component {
    constructor(){
        super();
        this.state = {
            sidebarOpen: false,
            alert: <div></div>
        };
        DB.info().catch((e)=>{
            this.setState({alert: <Alert title="Could not connect to local database"
                                         text="We won't be able to save your transactions. Are you in incognito  or private browsing mode ? If so, please use a non-incognito window to use this app, we won't save any information remotely unless you signup or login"
                                         open={true}/>})
        });

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
                            <Hidden xs>
                                <Col sm={6} key="b">
                                        <VisibleTransactionsTable/>
                                </Col>

                            </Hidden>
                                <Col sm={6} key="c">
                                        <MonthChartContainer/>
                                </Col>

                        </Row>
                    </Container>
                    <TransactionForm />                    {this.state.alert}
                </div>

        );
    }
}

export default App;
