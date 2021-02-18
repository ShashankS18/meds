import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component"
import MedicinesList from "./components/medicines-list.component";
import EditMedicine from "./components/edit-medicine.component";
import CreateMedicine from "./components/create-medicine.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={MedicinesList} />
        <Route path="/edit/:id" component={EditMedicine} />
        <Route path="/create" component={CreateMedicine} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;