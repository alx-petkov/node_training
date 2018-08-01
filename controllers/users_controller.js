import users from '../models/Users';


const UsersCtr = () => {

    const getAllUsers = () => {
        
        let data = '';
        users.forEach((user) => {
            data += `\n\r ${user.first_name} ${user.last_name}; `;
        });

        return data;
    }

    const getUserByNameAndPass = (name, pass) => {
        
        let foundUser = {};
        foundUser = users.find((user) => {
            // console.log(user, name, pass );
            return (user.username === name && user.password === pass)
        });

        return foundUser;
    }
    
    return {
       getAll: getAllUsers,
       authUser: getUserByNameAndPass 
    }

}

export default UsersCtr(); 