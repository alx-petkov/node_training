const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'node_tr';
const collectionName = 'users';
import users from '../constants/Users';

mongoose.connect(mongoURL + '/' + dbName);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: Number,
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String
}, { collection: collectionName });

const UserData = mongoose.model('UserData', UserSchema, collectionName);


const Users = () => {

    const insertUsers = (() => {
        UserData.collection.insert(users, (err, docs) => {
            if (err) { return console.log(err); }
            else { console.log('Users were inserted'); }
        })
        
    })();


    const getAllUsers = (callback) => {
        UserData.find()
            .then((data) => {
                callback(data);
            })
    } 

    const deleteUserById = (id, callback) => {
        UserData.findByIdAndRemove(id, (err) => {
            if(err){ console.log(err); }
            else callback( {status: 200, msg: 'item removed'});
        }).exec();
    }

    return {
        getAll: getAllUsers,
        deleteById: deleteUserById
    }
}

export default Users();
