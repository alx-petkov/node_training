import products from '../constants/Products';
import Reviews from '../constants/Reviews';


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

    };

    const getProductReviews = (urlId) => {

        const userRev = Reviews.filter((rev) => 
            rev.id.toString() === urlId.toString()
        );

        if (userRev.length){
            let data = '';
            userRev[0].reviews.forEach((text) => {
                data += `\n\r ${text} ; `;
            });
            return data;
        }

        return 'product not found';

    };

    const addNewProduct = (userData) => {

        const newProduct = {
            name: userData.name || `Product #4${products.length + 1}`,
            price: userData.price || 'N/A'
        }
        // toDo add the data to the file content ??
        products.push(newProduct);
        return newProduct;

    };
    
    return {
       getAll: getAllProducts, 
       getById: getProductById,
       getReviews: getProductReviews,
       addNew: addNewProduct 
    }

}

export default ProductsCtr(); 