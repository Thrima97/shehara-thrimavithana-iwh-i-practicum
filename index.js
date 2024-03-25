const express = require('express');
const axios = require('axios');
require('dotenv').config()
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/', async (req, res) => {
    const pet = 'https://api.hubapi.com/crm/v3/objects/2-26534826?limit=10&properties=name&properties=type&properties=age&archived=false';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        console.log(data);
        res.render('pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });
    } catch (error) {
        console.error(error);
    }
});

app.get('/add', async (req, res) => {
    res.render('add_pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/add', async (req, res) => {
    const add = {
        properties: {
            "name": req.body.petName,
            "type": req.body.petType,
            "age": req.body.age,
        }
    }

    const addPets = `https://api.hubapi.com/crm/v3/objects/2-26534826`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.post(addPets, add, { headers } );
        const pet = 'https://api.hubapi.com/crm/v3/objects/2-26534826?limit=10&properties=name&properties=type&properties=age&archived=false';
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        res.render('pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });
    } catch(err) {
        console.error(err);
    }
});

app.get('/pet-update', async (req, res) => {
    const pet = 'https://api.hubapi.com/crm/v3/objects/2-26534826?limit=10&properties=name&properties=type&properties=age&archived=false';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        res.render('update_pet', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });      
    } catch (error) {
        console.error(error);
    }
});

app.get('/update-cobj', async (req, res) => {

    const id = req.query.ObjectId;
    const getPet = `https://api.hubapi.com/crm/v3/objects/2-26534826/${id}?properties=name,type,age`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try {
        const response = await axios.get(getPet, { headers });
        const data = response.data;

        res.render('edit_pet', {name: data.properties.name, type: data.properties.type, age: data.properties.age});
        
    } catch(err) {
        console.error(err);
    }
});

app.post('/update-cobj', async (req, res) => {
    
    const update = {
        properties: {
            "name": req.body.petName,
            "type": req.body.petType,
            "age": req.body.age,
        }
    }

    const id = req.query.ObjectId;
    const updatePet = `https://api.hubapi.com/crm/v3/objects/2-26534826/${id}`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updatePet, update, { headers } );
        const pet = 'https://api.hubapi.com/crm/v3/objects/2-26534826?properties=name&properties=type&properties=age&archived=false';
        const resp = await axios.get(pet, { headers });
        const data = resp.data.results;
        res.render('pets', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', data });    
    } catch(err) {
        console.error(err);
    }

});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));