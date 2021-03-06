import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import VisibleTransactionsTable from './containers/VisibleTransactionsTable';
import SideBarContainer from './containers/SidebarContainer';
import TitleBar from './components/TitleBar';
import TransactionForm from './containers/TransactionForm';
import MonthChartContainer from './containers/MonthChartContainer';
import CategoryPieChartContainer from './containers/CategoryPieChartContainer';
import TitleH2Container from './containers/TitleH2Container';
import SnackbarContainer from './containers/SnackbarContainer';
import {Store, DB} from './store'
import Alert from './components/Alert'
import {Container, Row, Col, Hidden} from 'react-grid-system'
import {Divider} from 'material-ui'

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


    }

    componentDidMount() {
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
                                <Col sm={6} key="b">
                                    <CategoryPieChartContainer />

                                </Col>

                                <Col sm={6} key="c">
                                        <MonthChartContainer/>
                                </Col>

                        </Row>
                        <Hidden xs>
                        <Row>
                            <Col sm={12} key="d">
                                <VisibleTransactionsTable/>
                            </Col>
                        </Row>
                            </Hidden>
                    </Container>
                    <TransactionForm />
                    {this.state.alert}


                    <SnackbarContainer />

                    <footer>
                        <ul>
                            <li>
                                <a href="mailto:jfoucher@gmail.com">Contact us</a>
                            </li>
                            <li style={{fontSize: "0.8em", marginTop: "1em"}}>
                                Made by <a href="https://jfoucher.com">Jonathan Foucher</a>
                            </li>
                        </ul>
                    </footer>
                </div>

        );
    }
}

export default App;
