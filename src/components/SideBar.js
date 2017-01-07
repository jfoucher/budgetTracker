import React, { Component } from 'react';
import {Drawer, AppBar, Divider, IconButton} from 'material-ui';
import {Visible} from 'react-grid-system'
import UserButtons from './UserButtons';
import {NavigationClose} from 'material-ui/svg-icons';
import FilterSidebarMenuItem from '../containers/FilterSidebarMenuItem'
import {List} from 'material-ui/List';

class SideBar extends Component {

    render() {

        const {months, onClickClose} = this.props;
        const menuItems = months.map((m) => {
            return <FilterSidebarMenuItem key={m} month={m} numberOfTransactions={this.props.transactionsPerMonth[m]} filter={m} clickClose={onClickClose}/>
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
                <List>
                    {menuItems}
                </List>

            </Drawer>

        );
    }
}


export default SideBar;