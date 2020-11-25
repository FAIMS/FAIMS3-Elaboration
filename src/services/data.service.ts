import PouchDB from 'pouchdb';

interface ApplicationSchema {
    title: string,
    localDB: string,
    remoteDB: string,
    sequence: Array<string>,
    [propName: string]: any;
}

let localDB:PouchDB.Database
let remoteDB:PouchDB.Database
let selectedSchema: ApplicationSchema
let schemaDB:PouchDB.Database

const schemaDBConnect = () => {
    const dbURL = "http://context.fedarch.org:5984/schema"
    schemaDB = new PouchDB("schema")
    const schemaDBRemote = new PouchDB(dbURL)
    // get data from remote
    schemaDB.replicate.from(schemaDBRemote)

    return schemaDB
}

// interface for fetching schema records from PouchDB
const listSchema = () => {
    return schemaDB.allDocs({include_docs: true})
             .then(result => {
                 return result.rows.map(el => el.doc)})
}

const getSchema = (id:string) => {
    return schemaDB.get<ApplicationSchema>(id)
}

// Connecting to the application database

const createDB = (schemaid:string) => {

    getSchema(schemaid)
    .then((schema: ApplicationSchema) => {
        console.log(schema)
        selectedSchema = schema
        localDB = new PouchDB(schema.localDB)
        if (schema.dburl) {
            remoteDB = new PouchDB(schema.remoteDB)
            localDB.sync(remoteDB, {live: true, retry: true})
                .on('change', (change) => {
                    console.log("CHANGE", change)
                    const event = new Event('dataUpdated')
                    window.dispatchEvent(event)
                })
                .on('error', (err) => {
                    console.log("DB ERROR", err)
                })
        }
        
    })
}

const getSelectedSchema = () => {
    return selectedSchema
}

const storeRecord = (record: any) => {
    if (localDB) {
        record._id = new Date().toISOString()
        console.log("Storing", record)
        localDB.put(record).then(r => console.log(r))
    }
}

const listRecords = () => {
    return localDB.allDocs({include_docs: true})
             .then(result => {
                 return result.rows.map(el => el.doc)})
}

const getRecord = (id:string) => {
    return localDB.get(id)
}


export default {getSelectedSchema, schemaDBConnect, listSchema, getSchema,
                createDB, storeRecord, listRecords, getRecord}

