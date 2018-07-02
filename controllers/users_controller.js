import users from '../models/Users';


const UsersCtr = () => {

    const getAllUsers = () => {
        console.log('hello from users controller');
        let data = '';
        users.forEach((user) => {
            data += `\n\r ${user.first_name} ${user.last_name}; `;
        });

        return data;
    }
    
    return {
       getAll: getAllUsers 
    }

}

export default UsersCtr(); 