import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrafficDashboard from './modules/TrafficDashboard';
import PowerDashboard from './modules/PowerDashboard';
// ... import other modules

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/login" component={Login}/>
        <Route path="/signup" component={Signup}/>
        <Route path="/traffic" component={TrafficDashboard}/>
        <Route path="/power" component={PowerDashboard}/>
        {/* Add other module routes */}
      </Switch>
    </Router>
  );
}
export default App;
