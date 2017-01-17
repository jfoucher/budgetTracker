import React, { Component } from 'react';
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import {debounce} from '../utils'

class CategoryPieChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillReceiveProps = debounce((newProps) => {
            this.setState({data: newProps.data});
    }, 300);

    render(){
        const slices = this.state.data.map((c) => {
            return <Cell key={c.name} isAnimationActive={false} dataKey={c.name} stackId="a" fill={c.color} />
            //return <Bar key={c.name} isAnimationActive={false} dataKey={c.name} stackId="a" fill={c.color} />
        });

        return(
            <ResponsiveContainer width="100%" height={300}>
                <PieChart height={500} onMouseEnter={this.onPieEnter}>
                    <Pie

                        data={this.state.data}
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