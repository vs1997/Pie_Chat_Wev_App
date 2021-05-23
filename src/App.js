import './App.css';
import InfoTable from './Components/InfoTable/InfoTable';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Stats from './Components/PieChart/Stats';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={InfoTable}></Route>
      </Switch>
      <Switch>
        <Route exact path='/pie_chart' component={Stats}></Route>
      </Switch>
    </Router>
  );
}

export default App;
