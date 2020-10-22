import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import Button from '@material-ui/core/Button'

import {
    materialCells,
    materialRenderers,
  } from '@jsonforms/material-renderers';

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

    const action = (event: any) => {
      callbackFn(standaloneData)
    }

    return (
        <div>
              <JsonForms
              schema={formSpec.schema}
              uischema={formSpec.ui}
              data={standaloneData}
              renderers={materialRenderers}
              cells={materialCells}
              onChange={({ errors, data }) => setStandaloneData(data)}
            />

            <Button variant="contained" onClick={action}>Next</Button>
        </div>
    )
}


export default SchemaForm