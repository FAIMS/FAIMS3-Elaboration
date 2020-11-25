import React, {useState, useEffect} from 'react'; 
import dataService from '../services/data.service'

const SchemaChooser = ({updateFn}:any) => {

    const [schema, setSchema] = useState<Array<any>>([])

    useEffect(() => {
        dataService.listSchema()
            .then(data => { 
                   console.log(data)
                   setSchema(data)
            })
    }, [])

    const update = (event:any) => {
        console.log(event.target.value)
        updateFn(event.target.value)
    }

    if (!schema) {
        return (<p>No Schema Found</p>)
    } else {
        return (
            <form>
                <select id="schemaselect" onChange={update}>
                    <option>Choose something...</option>
                    {schema.map(s => (<option key={s._id} value={s._id}>{s.title}</option>))}
                </select>
            </form>
        )
    }
}


export default SchemaChooser