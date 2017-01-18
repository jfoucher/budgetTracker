import React, { Component } from 'react';
import {Drawer, AppBar, Divider, IconButton} from 'material-ui';
import {Visible} from 'react-grid-system'
import UserButtonsContainer from '../containers/UserButtonsContainer';
import FontIcon from 'material-ui/FontIcon';
import FilterSidebarMenuItem from '../containers/FilterSidebarMenuItem'
import {List, Subheader, ListItem} from 'material-ui';
import moment from 'moment'

class SideBar extends Component {

    render() {

        const {months, onClickClose} = this.props;

        const menuItems = months.map((y, i) => {

            const subitems = y.map((m) =>{
                return <FilterSidebarMenuItem key={'m-'+m} month={m} numberOfTransactions={this.props.transactionsPerMonth[m]} filter={m} clickClose={onClickClose}/>
            }) ;
            const year = moment(y[0], 'YYYYMM').format('YYYY');
            return <ListItem
                    key={'y-'+y}
                    primaryText={year}
                    initiallyOpen={i===0}
                    primaryTogglesNestedList={false}
                    nestedItems={subitems}
                    onTouchTap={this.props.displayYear.bind(null, year)}

                    />

        })
        return (
            <Drawer open={this.props.open} docked={false} onRequestChange = {onClickClose}>
                <AppBar
                    zDepth={1}
                    title="Menu"
                    onLeftIconButtonTouchTap={onClickClose}
                    iconElementLeft={<IconButton><img src="icons/close.png" width="24" /></IconButton>}
                    />
                <Visible xs>
                    <div style={{margin:"1em"}}>
                        <UserButtonsContainer inSidebar={true} />

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