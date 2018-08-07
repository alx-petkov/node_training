const mongo = require('mongodb');
// const MongoClient = require('mongodb').MongoClient;
import cities from '../constants/Cities';
const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'node_tr';
const collectionName = 'cities';

mongoose.connect(mongoURL + '/' + dbName);

const Schema = mongoose.Schema;

const CitySchema = new Schema({
    id: Number,
    name: { type: String, required: true },
    country: { type: String, required: true },
    capital: { type: Boolean, required: true },
    latitude: Number,
    longitude: Number,
    timezone: String
}, { collection: collectionName });

const CityData = mongoose.model('CityData', CitySchema);


const Cities = () => {

    const insertCities = (() => {

        mongo.connect(mongoURL, (err, dbp) => {
            if(err) { console.log(err); }

            const dba = dbp.db(dbName);
            dba.createCollection('cities');
            const cursor = dba.collection(collectionName).insertMany(cities);
            console.log('Cities are inserted');
        }); 
    })();

    const getAllCities = (callback) => {
        
        mongo.connect(mongoURL, (err, dbp) => {
            if(err) { console.log(err); }
            const dba = dbp.db(dbName);
            const cursor = dba.collection(collectionName).find();
            let resp = [];

            cursor.toArray((err, results) => {
                if(err){ console.log(err); }
                callback(results);
                }, () => {
                database.close();
            })    
        });

    /*
    // alternative native syntax
    MongoClient.connect(mongoURL, (err, database) => {
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

    } 


    const getAllWithMongoose = (callback) => {
        CityData.find()
            .then((data) => {
                callback(data);
            })
    } 

    const createNewCity = (newCity, callback) => {
        const city = new CityData(newCity);
        city.save((err, doc) => {
            if(err){ console.log(err); }
            else callback(doc);
        });
    }

    const updateCityById = (id, input, callback) => {
        CityData.findById(id, (err, item) => {
            if(err){ console.log('item not found', err); }
            else {
                item.name = input.name;
                item.country = input.country;
                item.capital = input.capital;
                item.latitude = input.latitude;
                item.longitude = input.longitude;
                item.timezone = input.timezone;

                item.save((err, doc) => {
                    if(err){ console.log(err); }
                    else callback(doc);
                });
            }
        })
    }

    const deleteCityById = (id, callback) => {
        CityData.findByIdAndRemove(id, (err) => {
            if(err){ console.log(err); }
            else callback( {status: 200, msg: 'item removed'});
        }).exec();
    }

    return {
        getAll: getAllCities,
        mgGetAll: getAllWithMongoose,
        createNew: createNewCity,
        updateById: updateCityById,
        deleteById: deleteCityById
    }
}

export default Cities();
