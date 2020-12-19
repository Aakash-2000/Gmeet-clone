import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router ,Route,Switch} from "react-router-dom";
import Form from "./components/form";
import Home from "./components/home";
import Meet from "./components/meet";

function App() {
  return (
    <Router>
        <div className="App">
          <Switch>
            <Route exact path="/">
              <Form/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
            <Route path="/:id">
              <Meet/>
            </Route>

          </Switch>
          
        </div>
    </Router>
    
  );
}

export default App;
