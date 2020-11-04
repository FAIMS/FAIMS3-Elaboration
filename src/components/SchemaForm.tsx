import React, { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { vanillaCells, vanillaRenderers } from '@jsonforms/vanilla-renderers';
import { JsonFormsCore } from '@jsonforms/core'; 
import './SchemaForm.css'

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

    const callback = ({data, errors}: JsonFormsCore) => {
        // if there are errors, flag
        setStoredErrors(typeof errors === "undefined" || errors.length > 0)
        setStandaloneData(data)
    }

    const action = (event: any) => {
      event.preventDefault()
      if (storedErrors) {
        alert("please fix form errors")
      } else {
        callbackFn(standaloneData)
      }
    }

    return (
        <div data-testid='jsonform'>
          <form>
            <JsonForms
              schema={formSpec.schema}
              uischema={formSpec.ui}
              data={standaloneData}
              renderers={vanillaRenderers}
              cells={vanillaCells}
              onChange={callback}
            />

            <button onClick={action}>Next</button>
          </form>


        </div>
    )
}


export default SchemaForm