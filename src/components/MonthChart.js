import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

import {getCategoryColor} from '../containers/TransactionForm'

class MonthChart extends Component {


    render(){

        const bars = this.props.categories.map((c) => {
            return <Bar key={c.name} isAnimationActive={false} dataKey={c.name} stackId="a" fill={c.color} />
        });

        return(
            <ResponsiveContainer width="100%" height={300}>
                <BarChart height={300} data={this.props.data}
                          margin={{top: 5, right: 5, left: 5, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend />
                    {bars}
                </BarChart>
            </ResponsiveContainer>
        )
    }
}

export default MonthChart