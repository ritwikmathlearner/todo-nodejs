const MongoClient = require('mongodb').MongoClient;

let conn;

exports.mongoConnect = (callback) => {
    try {
        main()
    } catch(err) {
        console.log(err)
    }
    callback()
}

async function main(){
    const uri = "mongodb+srv://M29dQHmaYs8ML0Fx:M29dQHmaYs8ML0Fx@ritwikmathcluster.og99m.mongodb.net/todo?retryWrites=true&w=majority"
 
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        conn = client.db('todo')
    } catch (e) {
        console.error(e);
    }
}

exports.getDB = () => {
    if(conn) return conn
}
