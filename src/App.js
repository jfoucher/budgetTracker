import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import './App.css';
import SpentForm from './components/SpentForm';
import TitleBar from './components/TitleBar';
import TransactionsTable from './components/TransactionsTable';
import Alert from './components/Alert';
import SideBar from './components/SideBar';

import md5 from 'md5';
import { Provider } from 'react-redux';
import * as types from './constants/actionTypes'

import {Container, Row, Col, Visible, Hidden} from 'react-grid-system'
import { reducer as formReducer, reset } from 'redux-form'

import { teal500, teal700,
    orange500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
    Drawer,
    AppBar,
    MenuItem,
    Paper,
    Divider
} from 'material-ui';
import {fade} from 'material-ui/utils/colorManipulator';
import {ContentAdd} from 'material-ui/svg-icons';

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: teal500,
        primary2Color: teal700,
        primary3Color: grey400,
        accent1Color: orange500,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        pickerHeaderColor: teal500,
        clockCircleColor: fade(darkBlack, 0.07),
        shadowColor: fullBlack,
    },
    appBar: {
        height: 55,
    },
});


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false,
            months: [],
            currentMonth: new Date().getFullYear() + '-' + (new Date().getMonth() + 1),
            menuItems: [],
            dbError: false
        }

        //TODO I don't like this, find another way to do it
        this.props.store.subscribe(() => {
            var months = {};
            const trs = this.props.store.getState().transactions;
            if(!trs) {
                return;
            }
            trs.forEach((tr) => {
                const d = new Date(tr.date);
                var month = d.getFullYear() +'-'+(1+d.getMonth());
                if(typeof months[month] === 'undefined') {
                    months[month] = [];
                    months[month].push(tr);
                } else {
                    months[month].push(tr);
                }
            });
            this.setState({months: months});
            var menuItems = [];

            for(var month in this.state.months) {
                if( this.state.months.hasOwnProperty( month ) ) {

                    var d = new Date();
                    d.setFullYear(parseInt(month.substr(0,4)));
                    d.setMonth(parseInt(month.substr(5)) - 1);
                    d.setUTCDate(1);
                    var m = d.getUTCMonth();
                    m = m + 1;
                    if(m < 10) {
                        m='0'+m
                    }
                    const ms = this.state.months[month];
                    //console.log('transactions for month', month, ms);
                    menuItems.push(<div key={month}><MenuItem

                            onTouchTap={this.changeMonth.bind(this, month)}>{m +'/'+ d.getFullYear() + ' ('+(ms.length)+' transactions)'}

                        </MenuItem><Divider /></div>)
                }

            }
            this.setState({menuItems: menuItems});
        });
    }

    changeMonth (month)  {
        this.setState({currentMonth:month, open: !this.state.open})
    }

    dosubmit  = (transaction) => {
        this.props.store.dispatch( {type:types.ADD_CATEGORY, data: {name: transaction.category, type: "category"}});
        this.props.store.dispatch(reset('transaction'));
        this.props.store.dispatch( {type:types.ADD, data: transaction});
    };


    //TODO submit to store, reduce transactions to various months, save in state, and display in drawaers
    componentDidMount () {
        //console.log('************App did mount*****************');

        this.props.db.info().catch((e)=>{
            //Pouch db cannot start, display a big error message
            this.setState({
                dbError: e
            })
        });

    }

    render() {
        var alert = <div></div>;
        if(this.state.dbError) {
            alert = <Alert title="Could not connect to local database"
                           text="We won't be able to save your transactions. Are you in incognito  or private browsing mode ? If so, please use a non-incognito window to use this app, we won't save any information remotely unless you signup or login"
                           open={true}/>
        }

        return (
            <Provider store={this.props.store}>
                <MuiThemeProvider muiTheme={muiTheme}>
                    <div className="App">
                        <TitleBar db={this.props.db} store={this.props.store} onDrawerOpen={()=>{this.setState({open:!this.state.open})}}/>

                        <SideBar db={this.props.db} handleClose={() => {this.setState({open:!this.state.open})}} open={this.state.open} menuItems={this.state.menuItems}/>

                        <Container style={{marginTop:"1em"}}>
                            <Row>

                                    <Col sm={10} key="b">

                                        <Paper zDepth={1}>

                                            <TransactionsTable store={this.props.store} transactions={this.state.months[this.state.currentMonth]}/>

                                        </Paper>
                                    </Col>


                                    <Col sm={2} key="c">
                                        <Paper zDepth={1}>

                                            Register for blabla

                                        </Paper>
                                    </Col>

                            </Row>
                        </Container>
                        <SpentForm onSubmit={this.dosubmit} store={this.props.store} />
                        {alert}
                    </div>
                </MuiThemeProvider>
            </Provider>
        );
    }
}

export default App;
