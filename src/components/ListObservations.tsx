import React, {useState, useEffect} from 'react';
import { Link, navigate } from "@reach/router"; 
import dataService from '../services/data.service'

const ListObservations =  () => {

    const [records, setRecords] = useState<Array<any>>([])
    const formSpec = dataService.getSelectedSchema()

    useEffect(() => {
        if (formSpec) {
            dataService.listRecords()
                .then(data => { 
                    console.log(data)
                    setRecords(data)
                })
        }
    }, [])

    useEffect(() => {
        window.addEventListener('dataUpdated', () => {
            console.log("Event!")
            dataService.listRecords()
            .then(data => { 
                   console.log("Updated:", data)
                   setRecords(data)
            })
        })
    })

    if (!formSpec) {
        navigate('/schema')
        return (<p>Select a schema</p>)
    } else {

        return (
            <ul>
                {records.map((record: any) => 
                        (<li key={record._id}>
                            <Link to={'/list/' + record._id}>
                            {record._id} | {record.location} | {record.tree_height}
                            </Link>
                        </li>)
                )}
            </ul>
        )
    }
}


export default ListObservations