import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import {Store} from './store'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {fade} from 'material-ui/utils/colorManipulator';
import { teal500, teal700,
    orange500,
    grey100, grey300, grey400, grey500,
    white, darkBlack, fullBlack,} from 'material-ui/styles/colors';

import getMuiTheme from 'material-ui/styles/getMuiTheme';


//TODO submit to store, reduce transactions to various months, save in state, and display in drawaers


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





ReactDOM.render(
    <Provider store={Store}>
        <MuiThemeProvider muiTheme={muiTheme}>
            <div>

                <App />
            </div>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
