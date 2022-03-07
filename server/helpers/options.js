require('dotenv').config();

const options = {
    auth: { 'Authorization': process.env.API_KEY },
    baseUrl: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp'
};

module.exports = { options };
