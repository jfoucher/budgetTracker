import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


class CategoriesChart extends Component {

    renderLegend = (props) => {

        const Months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]

        const {payload} = props;
        return (

            <ul style={{listStyle:"none",margin:"0 auto"}}>
                {
                    payload.map((entry, index) => (
                        <li className="recharts-legend-item" key={"item-"+index}>
                            <svg className="recharts-surface" width="14" height="14" viewBox="0 0 32 32" version="1.1" style={{display: "inline-block", verticalAlign: "middle", marginRight: "4px"}}>
                                <path stroke="none" fill={entry.color} d="M0,4h32v24h-32z" className="recharts-legend-icon">
                                </path>
                            </svg>
                            <span className="recharts-legend-item-text">
                                Amounts by categories for {Months[props.month.getMonth()]} {props.month.getFullYear()}
                            </span>
                        </li>
                    ))
                }
            </ul>
        );
    }

     render(){
        var month = new Date();
         month.setFullYear(Number(this.props.month.substr(0,4)));
         month.setMonth(Number(this.props.month.substring(5) - 1));
         return(
             <ResponsiveContainer width="100%" height={300}>
                 <BarChart data={this.props.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <XAxis dataKey="name"/>
                     <YAxis/>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <Tooltip/>
                     <Legend content={this.renderLegend} month={month} />

                     <Bar dataKey="amount" fill="#8884d8" />
                 </BarChart>
             </ResponsiveContainer>
         )
     }
}

export default CategoriesChart