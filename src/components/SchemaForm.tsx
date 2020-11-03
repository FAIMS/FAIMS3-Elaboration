import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import {
    materialCells,
    materialRenderers,
  } from '@jsonforms/material-renderers';
import { JsonFormsCore } from '@jsonforms/core'; 
import { Button, IconButton, Snackbar } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
interface FormProps {
  formSpec: {
    schema: object,
    ui: {type: string}
  },
  callbackFn: Function
}

/**
 * SchemaForm - display a form given a JSON schema and UI Spec
 * @component
 */
const SchemaForm = ({formSpec, callbackFn}: FormProps) => {

    const [standaloneData, setStandaloneData] = useState({});
    const [storedErrors, setStoredErrors] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const callback = ({data, errors}: JsonFormsCore) => {
        // if there are errors, flag
        setStoredErrors(typeof errors === "undefined" || errors.length > 0)
        setStandaloneData(data)
    }

    const action = (event: any) => {
      if (storedErrors) {
        setShowAlert(true)
      } else {
        callbackFn(standaloneData)
      }
    }

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
      setShowAlert(false);
    };

    return (
        <div data-testid='jsonform'>
          <form>
            <JsonForms
              schema={formSpec.schema}
              uischema={formSpec.ui}
              data={standaloneData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={callback}
            />

            <Button variant="contained" onClick={action}>Next</Button>
          </form>
          <Snackbar
            open={showAlert}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Please fill in all required fields"
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            } />
        </div>
    )
}


export default SchemaForm