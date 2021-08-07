import React,{useState} from 'react';
import LeftBar from '../../shared-components/LeftBar/LeftBar';
const Settings = ()=>{
    const [test, setTest] = useState('s')

    const createTodo = async()=>{
        let response = await fetch('http://localhost:4000/create-todo',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Test title',
                content: 'Test contnet',
                category: 'Test category',
                month: 8,
                day: 1
            })
        })
        .then((resp)=>{
            return resp.json()
        })
        .catch(err=>console.log(err))
    }

    const fetchMonth = async()=>{
        let month_needed = 4;
        let response = await fetch('http://localhost:4000/checked-days-in-month',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                month: month_needed
            })
        })
        .then((resp)=>{
            return resp.json()
        })
        .catch(err=>console.log(err))
        console.log("Final:",response)
    }
    return(
    <div className="dashboard-container">
        <LeftBar selected="settings"/>
        <div>
           <button onClick={createTodo}>Create</button>
           <button onClick={fetchMonth}>FetchDays</button>
           <span>{test}</span>
        </div>
    </div>
    )
}

export default Settings;