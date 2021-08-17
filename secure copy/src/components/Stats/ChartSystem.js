import React,{useState, useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import './Stats.css'
import {months} from '../../temp';



const ChartSystem = ({data})=>{

  const [dataChar, setDataChar] = useState({
    labels: [],
    totalTasks: [],
    completedTasks: [],
    failedTasks: [],
    lineColors: ['#f5bedb','#fe3730','#f1c101'],
    dotColors: ['#1d986a','#003e7b','#322a59']
  })

  

  useEffect(()=>{
    console.log(data);
    console.log("generate arr labels",generateArrayLabel(data.selectedDays).final_labels);
    console.log("pairs arr label",generateArrayLabel(data.selectedDays).number_labels)


    let total_days = generateArrayLabel(data.selectedDays).number_labels;
    setDataChar((prev)=>{
      return{
      ...prev,
      labels: generateArrayLabel(data.selectedDays).final_labels,
      totalTasks: extractProperty('totalTasks',total_days),
      completedTasks: extractProperty('completedTask',total_days),
      failedTasks: extractProperty('failedTasks',total_days),
    }})

  },[data])


  useEffect(()=>{
    console.log("update dataChar:", dataChar)
  },[dataChar])
  //1.Labels -  ['30 May', '31 May', '1 July', '2 July']
  //2.Arr TotalTask
  //3.CompletedTask
  //4.FailedTasks
  //5.Vector de culori

  //6.WorkedMinutes

  const generateArrayLabel = (totalDays)=>{
    let date = new Date();
    let today_day = date.getDate();
    let today_month = date.getMonth();
    let exact_month_width = [31,28,28,30,30,27,31,31,30,31,30,31];  
    let current_month_name = months[today_month];
    let prev_month_name = months[today_month-1];

    let final_labels = [];
    let number_labels = []; //day-month
    if(today_day - totalDays > 0)
    {
      //zile doar din luna curenta
      for(let i = today_day - totalDays; i<= today_day;i++)
      {
        final_labels.push(`${i}-${current_month_name}`)
        number_labels.push({
          day:i,
          month:today_month
        })
      }
    }
    else
    {
      //zile din 2 luni
      //luna trecuta
      let zile_din_luna_trecuta = totalDays - today_day;
      for(let j=exact_month_width[today_month-1]-zile_din_luna_trecuta; j<=exact_month_width[today_month-1];j++)
      {
        final_labels.push(`${j}-${prev_month_name}`);
        number_labels.push({
          day:j,
          month:today_month-1
        })
      }
      //luna curenta
      for(let x=1;x<=today_day;x++)
      {
        final_labels.push(`${x}-${current_month_name}`)
        number_labels.push({
          day:x,
          month:today_month
        })
      }

    }

    return {
      final_labels: final_labels,
      number_labels: number_labels
    }
  }
  const extractProperty = (prop_name, all_days)=>
  {
    let final_arr = [];
    if(data.arrDaysApi != null)
    {
      
      all_days.forEach((el)=>{
        let ok_exista = false;
        let temp_prop = null;
        data.arrDaysApi.arr_crescator.forEach((ell)=>{
          if(el.day == ell.day_nr && el.month == ell.month_nr)
          {
            ok_exista = true;
            temp_prop = ell[prop_name];
          }
        })

        if(ok_exista == true)
        {
          final_arr.push(temp_prop)
        }
        else
        {
          final_arr.push(NaN)
        }
      })

      return final_arr;
    }
    else
      return null;    
  }
    const chartData = {
        labels: dataChar.labels,
        datasets:[
          {
            label:'totalTasks',
            data: dataChar.totalTasks,
            borderColor: dataChar.lineColors[0],
            backgroundColor: dataChar.dotColors[0]
          },
          {
            label:'completedTasks',
            data:dataChar.completedTasks,
            borderColor:dataChar.lineColors[1],
            backgroundColor: dataChar.dotColors[1],
          },
          {
            label:'failedTasks',
            data:dataChar.failedTasks,
            borderColor:dataChar.lineColors[2],
            backgroundColor: dataChar.dotColors[2],
          }

        ]
      }
    return (
        <div className="chart-system-container">
            <Line 
                data={chartData}
                options={{
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: 'Chart.js Line Chart'
                      }
                    },
                    maintainAspectRatio: false
                }
                }
            />
        </div>
    )
}

export default ChartSystem;
