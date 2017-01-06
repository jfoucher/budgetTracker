import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


class CategoriesChart extends Component {


     render(){

         return(
             <ResponsiveContainer width="100%" height={300}>
                 <BarChart data={this.props.data}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                     <XAxis dataKey="name"/>
                     <YAxis/>
                     <CartesianGrid strokeDasharray="3 3"/>
                     <Tooltip/>
                     <Legend />
                     <Bar dataKey="amount" fill="#8884d8" />
                 </BarChart>
             </ResponsiveContainer>
         )
     }
}

export default CategoriesChart