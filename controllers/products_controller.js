import products from '../models/Products';
import Reviews from '../models/Reviews';


const ProductsCtr = () => {

    const getAllProducts = () => {
        console.log('hello from products controller');
        let data = '';
        products.forEach((product) => {
            data += `\n\r ${product.name} - $ ${product.price}; `;
        });

        return data;
    };


    const getProductById = (urlId) => {

        const product = products.filter((product) => 
            product.id.toString() === urlId.toString()
        );

        if (product.length){
            return `\n\r ${product[0].name} - $ ${product[0].price}; `;
        }

        return 'product not found';

    }
    
    return {
       getAll: getAllProducts, 
       getById: getProductById
    }

}

export default ProductsCtr(); 