import React, {useState} from 'react';
import { Router, RouteComponentProps, Link } from "@reach/router"; 
import FormSequence from './components/FormSequence'
import ListObservations from './components/ListObservations'
import SingleObservation from './components/SingleObservation'
import SchemaChooser from './components/SchemaChooser'
import dataService from './services/data.service'
import './App.css';
import logo from './faims-logo.png'
 
const App = () => {

  const [schema, setSchema] = useState<any>(null)

  dataService.schemaDBConnect()

  const formComplete = (formData: any) => {
    console.log("FORM COMPLETE", formData)
    dataService.storeRecord(formData)
  }

  const changeSchema = (schemaid:string) => {
    console.log("changeSchema", schemaid)
    dataService.createDB(schemaid)
    //setSchema(schema)
  }

  const Logo = (props: RouteComponentProps) => (<div id="logo"><img alt="FAIMS Logo" src={logo}/></div>)
  const Forms = (props: any) => (<FormSequence formSpec={schema} callbackFn={formComplete} />)
  const ListPage = (props: RouteComponentProps)  => (<ListObservations />)
  const SchemaPage = (props: RouteComponentProps)  => (<SchemaChooser updateFn={changeSchema}/>)

  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/schema">Select Schema</Link></li>
          <li><Link to="/forms">Enter Observation</Link></li>
          <li><Link to="/list">List Observations</Link></li>
        </ul>
      </nav>

      <Router>
        <Logo path="/" />
        <SchemaPage path="/schema" />
        <Forms path="/forms" />
        <ListPage path="/list" />
        <SingleObservation path="/list/:id"/>
      </Router>
    </div>
     )
    
};

export default App;
