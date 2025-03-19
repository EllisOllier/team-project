//imports important react libaries and the rechart components
//creates a functional component called BudgetChart
import React, {useEffect, useState} from "react";
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from "recharts";


const BudgetChart = ({expenses}) => {
    const [chartData, setChartData] = useState([]); //creates a state variable called chartData and a function called setChartData to update the chat data

    //useEffect feature updates the chart data when the expenses prop changes
    useEffect(() => {
        if (expenses.length > 0) {
            //calculate the total amount spent in each category
            const expenseSummary = expenses.reduce((acc, expense) => {
                const category = expense.category || "other"; //if the category is not defined, it will be set to "other"
                const amount = Number(expense.amount); //Makes sure the amount is a number

                //if the category is not in the accumulator, it will be added with a total of 0
                if (!acc[category]) {
                    acc[category] = {category, total: 0};
                }
                acc[category].total += amount; //adds the amount to the category total
                return acc;
            }, {});
            
            //converts the object into an array of objects
            const formattedData = Object.values(expenseSummary);
            setChartData(formattedData); //updates the chart data to formatted data
        }
    }, [expenses]); //runs the effect when the expenses prop changes


    return (
        <div className="chart-container">
            <h2>Expense Breakdown</h2>
            {/* ResponsiveContainer component automatically resizes the chart to fit all screen sizes*/}
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData} margin={{top: 20, right: 30, left: 20, bottom: 5}}> 
                    <XAxis dataKey="category" /> {/* XAxis component displays the categorys */}
                    <YAxis /> {/* YAxis component displays the total amount spent */}
                    <Tooltip /> {/* Tooltip component shows the category and total amount spent when hovering over a bar */}
                    <Legend /> {/* Legend component displays the category names */}
                    <Bar dataKey="total" fill="#8884d8" /> {/* Bar component displays the total amount spent in each category */}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );      
};

export default BudgetChart; //exports the BudgetChart component so it can be used in other files