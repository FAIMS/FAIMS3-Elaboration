import PouchDB from 'pouchdb';

let localDB:PouchDB.Database
let remoteDB:PouchDB.Database

const createDB = (dbname: string, dburl:string) => {
    localDB = new PouchDB(dbname)
    if (dburl) {
        remoteDB = new PouchDB(dburl)
        localDB.sync(remoteDB, {live: true, retry: true})
            .on('change', (change) => {
                console.log("CHANGE", change)
            })
            .on('error', (err) => {
                console.log("DB ERROR", err)
            })
    }
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

export default {createDB, storeRecord, listRecords, getRecord}

