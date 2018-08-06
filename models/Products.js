const mongoose = require('mongoose');
const mongoURL = 'mongodb://127.0.0.1:27017';
const dbName = 'node_tr';
const collectionName = 'products';
import products from '../constants/Products';

mongoose.connect(mongoURL + '/' + dbName);

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    id: Number,
    first_name: String,
    last_name: String,
    username: String,
    password: String,
    email: String
}, { collection: collectionName });

const ProductData = mongoose.model('ProductData', ProductSchema, collectionName);


const Products = () => {

    const insertProducts = (() => {
        ProductData.collection.insert(products, (err, docs) => {
            if (err) { return console.log(err); }
            else { console.log('Products were inserted'); }
        })
    })();


    const getAllProducts = (callback) => {
        ProductData.find()
            .then((data) => {
                callback(data);
            })
    } 

    const getProductById = (id, callback) => {
        ProductData.findById(id, (err, doc) => {
            if (err) { return console.log('aaaaa', err); }
            else { console.log('Product:', doc); callback(doc) }
        })
    }

    const deleteProductById = (id, callback) => {
        ProductData.findByIdAndRemove(id, (err) => {
            if(err){ console.log(err); }
            else callback( {status: 200, msg: 'item removed'});
        }).exec();
    }

    return {
        getAll: getAllProducts,
        getById: getProductById,
        deleteById: deleteProductById
    }
}

export default Products();
