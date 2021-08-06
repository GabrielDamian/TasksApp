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
                category: 'Test category'
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
           <button onClick={createTodo}>Test</button>
           <span>{test}</span>
        </div>
    </div>
    )
}

export default Settings;