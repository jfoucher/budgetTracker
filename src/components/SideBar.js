import React, { Component } from 'react';
import {RaisedButton, FlatButton, Dialog, Drawer, AppBar, Divider, IconButton} from 'material-ui';
import { Field, reduxForm } from 'redux-form';
import {Visible, Hidden} from 'react-grid-system'
import UserButtons from './UserButtons';
import {NavigationClose} from 'material-ui/svg-icons';
import FilterSidebarMenuItem from '../containers/FilterSidebarMenuItem'

class SideBar extends Component {

    render() {

        const {months, onClickClose} = this.props;
        //console.log('months in sidebar', months)
        const menuItems = months.map((m) => {
            return <FilterSidebarMenuItem key={m} month={m} filter={m} clickClose={onClickClose}/>
        })
        return (
            <Drawer open={this.props.open}>
                <AppBar
                    zDepth={1}
                    title="Menu"
                    onLeftIconButtonTouchTap={onClickClose}
                    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
                    />
                <Visible xs>
                    <div style={{margin:"1em"}}>
                        <UserButtons/>
                    </div>
                    <Divider/>
                </Visible>
                {menuItems}
            </Drawer>

        );
    }
}


export default SideBar;