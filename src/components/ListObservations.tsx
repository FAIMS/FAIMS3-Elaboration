import React, {useState, useEffect} from 'react';
import { Link } from "@reach/router"; 
import dataService from '../services/data.service'

const ListObservations =  () => {

    const [records, setRecords] = useState<Array<any>>([])

    useEffect(() => {
        dataService.listRecords()
            .then(data => { 
                   console.log(data)
                   setRecords(data)
            })
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


export default ListObservations