import React, {useState, Fragment} from 'react';
import SchemaForm from './SchemaForm'

/**
 * FormSequence - a component to display a sequence of forms
 * 
 * @component
 */
const FormSequence = ({formSpec, callbackFn}: any) => {

    const [formData, setFormData] = useState({});
    const [formIndex, setFormIndex] = useState(0)
  
    const mergeFormData = (data: any) => {
        setFormData({...formData,...data})
        setFormIndex(formIndex+1)
        if (formIndex >= formSpec.sequence.length) {
            callbackFn(formData)
        }
    }

    const reset = () => {
        setFormIndex(0)
        setFormData({})
    }

    //  Display the form data when the sequence is complete
    if (formIndex >= formSpec.sequence.length) {
        return (
        <Fragment>
            <h1>Form Data</h1>
            <button onClick={reset}>Reset</button>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Fragment>)
    } else {
        return (
            <SchemaForm formSpec={formSpec[formSpec.sequence[formIndex]]} 
                        callbackFn={mergeFormData} />
        )
    }
}

export default FormSequence