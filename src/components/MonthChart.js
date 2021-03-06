import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class MonthChart extends Component {
    render(){

        const bars = this.props.categories.map((c) => {
            return <Bar key={c.name} isAnimationActive={false} dataKey={c.name} stackId="a" fill={c.color} />
        });

        return(
            <ResponsiveContainer width="100%" height={300}>
                <BarChart height={300} data={this.props.data}
                          margin={{top: 5, right: 10, left: -20, bottom: 5}}>
                    <XAxis dataKey="name" stroke="#757575" />
                    <YAxis stroke="#757575"/>
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