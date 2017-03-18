import React, { Component } from 'react';
import {Row, Col} from 'react-grid-system'
import muiThemeable from 'material-ui/styles/muiThemeable';
import {debounce} from '../utils'

class TitleH2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            info: '',
        }
    }

    componentWillReceiveProps = debounce((newProps) => {
        this.setState({info: newProps.numTransactions + ' transactions for a total of ' + newProps.total.toFixed(2)});
    });

    render() {
        return (
            <Row>
                <Col sm={12}>
                    <h2 style={{fontWeight: 300, color:this.props.muiTheme.palette.textColor}}>{this.props.month}</h2>
                    <p>
                        {this.state.info}
                    </p>
                </Col>
            </Row>
        );
    }
}

export default muiThemeable()(TitleH2);