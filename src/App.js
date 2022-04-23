import './App.css';
import Home from './container/home/Home';

import {useState} from "react";
import {SetUserId} from "./store/contexts/SetUserId";
import {GetUserId} from "./store/contexts/GetUserId";


function App() {
    const [userId, setUserId] = useState();
  
  return (
      <SetUserId.Provider value={setUserId}>
          <GetUserId.Provider value={userId}>
      <div className="App">
        <Home/>
      </div>
          </GetUserId.Provider>
      </SetUserId.Provider>
 
  );
}

export default App;
