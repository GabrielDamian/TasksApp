import React,{useState, useEffect} from 'react';
import {months} from '../../temp';
import './Stats.css';

const TableStats = ({data})=>{
    
    //arr de obiecte/zole
    //data.arrDaysApi.arr_crescator
    useEffect(()=>{
        console.log("Data update in table stats", data);
      },[data])

    return (
      <div className="table-stats-container">
        <span>*Table displays only days with at least one data in db.</span>
        <table>
          <tr className="table-row-headings">
            <th>Day</th>
            <th>Total</th>
            <th>Completed</th>
            <th>Failed</th>
            <th>Worked Time</th>
          </tr>
          {
            data.arrDaysApi != null ?
            data.arrDaysApi.arr_crescator.map((el)=>{
              return (
                <tr className="table-row-data">
                  <td>{el.day_nr}-{months[el.month_nr]}</td>
                  <td>{el.totalTasks}</td>
                  <td>{el.completedTask}</td>
                  <td>{el.failedTasks}</td>
                  <td>{el.workedMinutes}</td>
                </tr>
              )
            })
            :
            null
          }
        </table>
      </div>
    )
}

export default TableStats;