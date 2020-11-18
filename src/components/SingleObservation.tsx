import React, {useState, useEffect} from 'react';
import dataService from '../services/data.service'

const SingleObservation =  ({id}:any) => {

    const [record, setRecord] = useState<any>({})

    useEffect(() => {
        dataService.getRecord(id)
            .then(data => { 
                   console.log(data)
                   setRecord(data)
            })
    }, [])

    return (
        <ul>
            {Object.entries(record).map( ([k,v]) => {
                    if (k[0] != '_') {
                        return (<p>{k}: {v}</p>)
                    }
                })}
        </ul>
    )
}


export default SingleObservation