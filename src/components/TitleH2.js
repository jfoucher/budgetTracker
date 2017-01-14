import React, { Component } from 'react';
import {Row, Col} from 'react-grid-system'
import muiThemeable from 'material-ui/styles/muiThemeable';

class TitleH2 extends Component {

    render() {
        return (
            <Row>
                <Col sm={12}>
                    <h2 style={{fontWeight: 300, color:this.props.muiTheme.palette.textColor}}>Transactions for {this.props.month}</h2>
                </Col>
            </Row>
        );
    }
}

export default muiThemeable()(TitleH2);