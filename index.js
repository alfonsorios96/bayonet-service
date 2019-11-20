const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/', (request, response) => {
    response.send('Hello! The API is at http://localhost:' + PORT + '/api');
});

app.post('/consult', (request, response) => {
        const fingerprint = request.headers['x-token'];
    if (fingerprint) {
        axios({
            method: 'post',
            url: 'https://api.bayonet.io/v2/sigma/consult',
            headers: {'Content-Type': 'application/json'},
            data: {
                "auth": {
                    "api_key": "8f72c3de-c0b0-4dc0-ba20-45d0ce3e169e"
                },
                "email": "malforime@gmail.com",
                "payment_method": "offline",
                "consumer_name": "Manuel Alfonso Rios Medellin",
                "consumer_internal_id": "12312",
                "telephone": "5538259461",
                "transaction_amount": 200,
                "currency_code": "MXN",
                "shipping_address": {
                    "line_1": "Puerto Mazatlan 200",
                    "line_2": "1",
                    "city": "Gustavo A. Madero",
                    "state": "Ciudad de Mexico",
                    "country": "MEX",
                    "zip_code": "06720"
                },
                "bayonet_fingerprint_token": fingerprint,
                "payment_gateway": "kueski",
                "channel": "ecommerce",
                "products": [
                    {
                        "product_id": "1",
                        "product_name": "Iphone X 128gb",
                        "product_price": 20000,
                        "product_category": "electrónicos"
                    }
                ],
                "order_id": "14152",
                "transaction_id": "12411"
            }
        })
            .then(response => {
                console.log(response);
                response.status(200).json({
                    code: 200,
                    message: 'Success record.'
                });
            })
            .catch(error => {
                console.log(error);
                response.status(500).json({
                    code: 300,
                    message: 'Bayonet failed'
                });
            });
    } else {
        response.status(500).json({
            code: 300,
            message: 'Fingerprint is missing.'
        });
    }
});
app.listen(PORT);

console.log('Magic happens at http://localhost:' + PORT);