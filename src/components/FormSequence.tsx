import React, {useState} from 'react';
import {navigate} from "@reach/router"
import SchemaForm from './SchemaForm'
import dataService from '../services/data.service'

/**
 * FormSequence - a component to display a sequence of forms
 * 
 * @component
 */
const FormSequence = ({callbackFn}: any) => {

    const [formData, setFormData] = useState({});
    const [formIndex, setFormIndex] = useState(0)
  
    const formSpec = dataService.getSelectedSchema()

    const mergeFormData = (data: any) => {
        setFormData({...formData,...data})
        setFormIndex(formIndex+1)
    }

    //  Display the form data when the sequence is complete
    if (!formSpec) {
        return (<p>No Schema Selected</p>)
    } else if (formIndex >= formSpec.sequence.length) {
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