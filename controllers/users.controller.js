const { head } = require("request");
const axios = require('axios');
const response = require("response");
const { json } = require("express");

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

async function conect(method, data, params){
    if(method === 'get'){
        if(params){
            const response = axios.get(`https://gorest.co.in/public/v2/users/${params}` , {
                headers: {
                    Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
                }
            });
            return response;
        }
        else{
            const response = axios.get(`https://gorest.co.in/public/v2/users` , {
                headers: {
                    Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
                }
            });
            return response;
        }
    }
    else if(method === 'post'){
        const response = axios.post('https://gorest.co.in/public/v2/users', data, {
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        return response;
    }
    else if(method === 'put'){
        const response = axios.put(`https://gorest.co.in/public/v2/users/${params}`,data ,{
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        return response;
    }
    else if (method === 'del'){
        const response = axios.delete(`https://gorest.co.in/public/v2/users/${params}`, {
            headers: {
                Authorization: `Bearer b2e94a33167c9bfed20be08e992d8f69958f882bc40c811773571cdd379a2c5a`
            }
        });
        return response;
    }
}

const getUsers = async (req, res) => {
    try{
        result = await conect('get');
        res.status(201).json(result.data);
    }
    catch(error){
        res.status(500).json({message: "Error fetching users"});
    }
};

const getUser = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await conect('get', 0, id);
        res.status(201).json(response.data);
    }catch(error){
        res.status(500).json({message: "Error fetching user"})
    }
};

const addUser = async (req, res) => {
    const user = req.body;
    try{
        const response = await conect('post', user);
        res.status(201).json(response.data);
    }catch(error) {
        res.status(500).json({message: 'Error adding user'});
    }
};

const updateUser = async (req, res) =>{
    const {name, email, gender, status} = req.body;
    const { id } = req.params;
    try{
        const response = await conect('put', {name, email, gender, status}, id);
        res.status(200).json(response.data);
    }catch(error){
        res.status(500).json({message: "Error updating user"})
    }
};

const delUser = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await conect('del', 0, id );
        res.status(200).end("User deleted");
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
