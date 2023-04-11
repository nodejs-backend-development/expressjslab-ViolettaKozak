const { head } = require("request");
const axios = require('axios');
const response = require("response");

const users = [
    {
        id: 1,
        firstName: 'FirstName1',
        lastName: 'LastName1',
        email: 'a1@b.com',
    },
    {
        id: 2,
        firstName: 'FirstName2',
        lastName: 'LastName2',
        email: 'a2@b.com',
    },
    {
        id: 3,
        firstName: 'FirstName3',
        lastName: 'LastName3',
        email: 'a3@b.com',
    },
];

const getUsers = async (req, res) => {
    try {
        const response = await axios.get(`https://gorest.co.in/public/v2/users` , {
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        const user = response.data;
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
      }
};

const getUser = async (req, res) => {
    const {id} = req.params;
    const url = 'https://gorest.co.in/public/v2/users/' + id;
    try{
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        const user = response.data;
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message: "Error fetching user"})
    }
};

const addUser = async (req, res) => {
    const user = req.body;
    try{
        const response = await axios.post('https://gorest.co.in/public/v2/users', user, {
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        res.status(201).json(response.data.data);
    }catch(error) {
        res.status(500).json({message: 'Error adding user'});
    }
};

const updateUser = async (req, res) =>{
    const {name, email, gender, status} = req.body;
    const { id } = req.params;
    const url = 'https://gorest.co.in/public/v2/users/' + id;
    try{
        const response = await axios.put(url ,{
            name,
            email,
            gender,
            status
        } ,{
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        res.status(200).json(response.data);
    }catch(error){
        res.status(500).json({message: "Error updating user"})
    }
};

const delUser = async (req, res) => {
    const {id} = req.params;
    const url = 'https://gorest.co.in/public/v2/users/' + id;
    try{
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        res.status(203).end();
    }catch(error){
        res.status(500).json({message: "Error deleting user"})
    }
};

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    delUser
};
