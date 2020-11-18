import React from 'react';
import { Router, RouteComponentProps, Link } from "@reach/router"; 
import FormSequence from './components/FormSequence'
import ListObservations from './components/ListObservations'
import dataService from './services/data.service'
import './App.css';
import logo from './faims-logo.png'

// import pocForms from './schema/pocForms.json'
import pocForms from './schema/simple.json'

interface CompoundFormData {
  generalData: object,
  treeData: object
}

const App = () => {

  const formComplete = (formData: any) => {
    console.log("FORM COMPLETE", formData)
    dataService.storeRecord(formData)
  }

  const Logo = (props: RouteComponentProps) => (<div id="logo"><img alt="FAIMS Logo" src={logo}/></div>)
  const Forms = (props: RouteComponentProps) => (<FormSequence formSpec={pocForms} callbackFn={formComplete} />)
  const ListPage = (props: RouteComponentProps)  => (<ListObservations />)

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/forms">Enter Observation</Link></li>
          <li><Link to="/list">List Observations</Link></li>
        </ul>
      </nav>

      <Router>
        <Logo path="/" />
        <Forms path="/forms" />
        <ListPage path="/list" />
      </Router>
      
    </div>
     ) 
    
};

export default App;
