import React, { Component } from 'react';
import {Drawer, AppBar, Divider, IconButton} from 'material-ui';
import {Visible} from 'react-grid-system'
import UserButtons from './UserButtons';
import FontIcon from 'material-ui/FontIcon';
import FilterSidebarMenuItem from '../containers/FilterSidebarMenuItem'
import {List, Subheader, ListItem} from 'material-ui';
import moment from 'moment'

class SideBar extends Component {

    render() {

        const {months, onClickClose} = this.props;

        //const a = <ListItem
        //    primaryText="Inbox"
        //    leftIcon={<ContentInbox />}
        //    initiallyOpen={true}
        //    primaryTogglesNestedList={true}
        //    nestedItems={[
        //        <ListItem
        //          key={1}
        //          primaryText="Starred"
        //          leftIcon={<ActionGrade />}
        //        />,
        //        <ListItem
        //          key={2}
        //          primaryText="Sent Mail"
        //          leftIcon={<ContentSend />}
        //          disabled={true}
        //          nestedItems={[
        //            <ListItem key={1} primaryText="Drafts" leftIcon={<ContentDrafts />} />,
        //          ]}
        //        />
        //        ]}
        //    />
        //console.log('months', months);
        const menuItems = months.map((y, i) => {

            const subitems = y.map((m) =>{
                return <FilterSidebarMenuItem key={'m-'+m} month={m} numberOfTransactions={this.props.transactionsPerMonth[m]} filter={m} clickClose={onClickClose}/>
            }) ;

            return <ListItem
                    key={'y-'+y}
                    primaryText={moment(y[0], 'YYYYMM').format('YYYY')}
                    initiallyOpen={i===0}
                    primaryTogglesNestedList={false}
                    nestedItems={subitems}
                    onTouchTap={(e) => {;alert('display transactions for '+moment(y[0], 'YYYYMM').format('YYYY'))}}
                    />

        })
        return (
            <Drawer open={this.props.open}>
                <AppBar
                    zDepth={1}
                    title="Menu"
                    onLeftIconButtonTouchTap={onClickClose}
                    iconElementLeft={<IconButton><img src="icons/close.png" width="24" /></IconButton>}
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