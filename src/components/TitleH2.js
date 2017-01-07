import React, { Component } from 'react';

import UserButtons from './UserButtons';
import {NavigationMenu} from 'material-ui/svg-icons';
import {Row, Col} from 'react-grid-system'

class TitleH2 extends Component {

    render() {
        return (
            <Row>
                <Col sm={12}>
                    <h2>Transactions for {this.props.month}</h2>
                </Col>
            </Row>
        );
    }
}
export default TitleH2;