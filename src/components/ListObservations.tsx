import React, {useState, useEffect} from 'react';
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

    return (
        <ul>
            {records.map((record: any) => 
                    (<li key={record._id}>
                        {record._id} | {record.location} | {record.tree_height}
                    </li>)
             )}
        </ul>
    )
}


export default ListObservations