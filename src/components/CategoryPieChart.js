import React, { Component } from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';

class CategoryPieChart extends Component {
    
    render(){
        const slices = this.props.data.map((c) => {
            return <Cell key={c.name} isAnimationActive={false} dataKey={c.name} stackId="a" fill={c.color} />
            //return <Bar key={c.name} isAnimationActive={false} dataKey={c.name} stackId="a" fill={c.color} />
        });

        return(
            <ResponsiveContainer width="100%" height={300}>
                <PieChart height={500} onMouseEnter={this.onPieEnter}>
                    <Pie

                        data={this.props.data}
                        outerRadius={120}
                        fill="#8884d8"
                        >
                        {slices}
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        )
    }
}

export default CategoryPieChart