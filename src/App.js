//import logo from './logo.svg';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/layout/NavBar';
import Dashboard from './components/layout/Dashboard';
import background from './components/pokemon/pattern.jpg'
import Pokemon from './components/pokemon/Pokemon'
function App() {
  return (
    <Router>
    <div className="App" style={{background: `url(${background})`}}>
      <NavBar />

      <div className='container'>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/pokemon/:pokemonIndex" component={Pokemon} />

        <Dashboard />
        </Switch>
        
      </div>
      
    </div>
    </Router>
  );
}

export default App;
