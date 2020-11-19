import React, {useState, Fragment} from 'react';
import {navigate} from "@reach/router"
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
    }

    //  Display the form data when the sequence is complete
    if (formIndex >= formSpec.sequence.length) {
        callbackFn(formData)
        navigate('/list')
        return (<p />)
    } else {
        return (
            <SchemaForm formSpec={formSpec[formSpec.sequence[formIndex]]} 
                        callbackFn={mergeFormData} />
        )
    }
}

export default FormSequence