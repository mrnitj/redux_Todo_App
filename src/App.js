import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

import TodoList from "./TodoList";


function App() {
  return (
    <div className="App">

        <Routes>

            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/" element={<TodoList/>}/>

        </Routes>
     
    </div>
  );
}

export default App;
