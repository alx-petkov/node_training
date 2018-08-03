const mongo = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;


const Cities = () => {

    const getAllCities = () => {
        let response = []
          mongo.connect('mongodb://127.0.0.1:27017', (err, dbp) => {
            if(err) { console.log(err); }
            const dba = dbp.db('node_tr');
            const cursor = dba.collection('cities').find();
            let resp = [];

            cursor.toArray((err, results) => {
                if(err){ console.log(err); }
                console.log('results', results);
                response.push(results);
                }, () => {
                database.close();
            })
             
        });
        console.log('resp', response); 
        return response;
    } 

    /*
      MongoClient.connect('mongodb://127.0.0.1:27017', (err, database) => {
        if(err) { console.log(err); }
        const db = database.db('node_tr');
        const cursor = db.collection('cities').find();

        cursor.toArray((err, results) => {
            if(err){ console.log(err); }
            console.log('results', results);
            }, () => {
            database.close();
        })
    })

    */

    return {
        getAll: getAllCities
    }
}

export default Cities();
