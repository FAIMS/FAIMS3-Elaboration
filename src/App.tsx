import React, { Fragment } from 'react';
import FormSequence from './components/FormSequence'
import './App.css';

import pocForms from './schema/pocForms.json'


interface CompoundFormData {
  generalData: object,
  treeData: object
}

const App = () => {

  const formComplete = (formData: any) => {
    console.log("FORM COMPLETE", formData)

  }

  return (
    <Fragment>
      <div>   
          <FormSequence formSpec={pocForms} callbackFn={formComplete} />
      </div>
    </Fragment>
  );
};

export default App;
