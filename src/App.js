import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Chat from "./Components/chat/chat"
import Join from "./Components/join/join"
function App() {
  return (
    <Router>
    <Route path="/" exact component={Join}/>
    <Route path="/chat" exact component={Chat}/>
    </Router>

  );
}

export default App;
