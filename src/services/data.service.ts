import PouchDB from 'pouchdb';

const db = new PouchDB('formdata')

const storeRecord = (record: any) => {
    record._id = new Date().toISOString()
    console.log("Storing", record)
    db.put(record).then(r => console.log(r))
}

const listRecords = () => {
    return db.allDocs({include_docs: true})
             .then(result => {
                 return result.rows.map(el => el.doc)})
}

const getRecord = (id:string) => {
    return db.get(id)
}

export default {storeRecord, listRecords, getRecord}

