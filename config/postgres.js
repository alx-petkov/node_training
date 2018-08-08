const Sequelize = require('sequelize');
import products from '../constants/Products';
import users from '../constants/Users';
import reviews from '../constants/Reviews';

// need to create node_tr database first
const connection = new Sequelize('node_tr', 'postgres', 'epam', {
  host: 'localhost',
  dialect: 'postgres'
})

connection
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


export const Product = connection.define('product', {
  name: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: { 
    type: Sequelize.INTEGER,
    defaultValue: 0 
  }
})

export const User = connection.define('user', {
  first_name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  last_name: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  username: { 
    type: Sequelize.STRING,
    // unique: true,
    allowNull: false
  },
  password: { 
    type: Sequelize.STRING,
    allowNull: false
  },
  email: { 
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

export const Review = connection.define('review', {
  productId: { 
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false
  },
  /*reviews: { 
    type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false
  },*/

  // array definition taken from: https://stackoverflow.com/questions/25565212/how-to-define-array-of-objects-in-sequelize-js
  reviews: { 
        type: Sequelize.TEXT, 
        get: function() {
            return JSON.parse(this.getDataValue('reviews'));
        }, 
        set: function(val) {
            return this.setDataValue('reviews', JSON.stringify(val));
        }
    }
})


connection.sync({ force: true })
.then(() => {
  return Product.bulkCreate( products )
}).then(() => {
      return User.bulkCreate( users )
})
.then(() => {
     return Review.bulkCreate( reviews )
/* }).then(() => {
    return Review.findAll();
}).then( (prods) => {
  prods.forEach((pd) => {
    console.log('found', pd.dataValues);
  })*/
})  
.catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// export default connection;
