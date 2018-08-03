import users from '../constants/Users';


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