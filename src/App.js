import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard';
import Stats from './components/Stats/Stats';
import Schedule from './components/Schedule/Schedule';
import Settings from './components/Settings/Settings';

function App() {
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard}/>
        <Route exact path="/stats" component={Stats}/>
        <Route exact path="/schedule" component={Schedule}/>
        <Route exact path="/settings" component={Settings}/>
      </Switch>
    </Router>
  );
}

export default App;
