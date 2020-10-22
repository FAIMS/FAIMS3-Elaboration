import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
      <Grid
        container
        justify={'center'}
        spacing={1}
      >
        <Grid item sm={6}>
            <FormSequence formSpec={pocForms} callbackFn={formComplete} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default App;
