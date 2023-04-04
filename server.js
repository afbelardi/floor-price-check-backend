require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const searchRouter = require("./puppeteer");
const cron = require('node-cron');
const axios = require('axios');
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = require('twilio')(accountSid, authToken);

const app = express();

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions));

const MONGODB_URI = process.env.MONGODB_URI;
const db = mongoose.connection;

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


db.on('open', () => {
    console.log('MongoDB is connected')
});

app.use('/api', require('./puppeteer'));
app.use('/api/nft', require('./controllers/nfts'));


// cron.schedule('*/1 * * * *', async () => {
//     // try {
//     //   const response = await axios.get('https://example.com/api/data');
//     //   if (response.data.criteria === 'met') {
//         client.messages
//           .create({
//              body: 'Criteria met!',
//              from: '+18442077408',
//              to: '+17576184051'
//            })
//     //       .then(message => console.log(message.sid))
//     //       .catch(error => console.log(error));
//     //   }
    
//     // } catch (error) {
//     //   console.error(error);
//     // }
//   });


app.use(express.json());
if (process.env.NODE_ENV !== 'development'){
  app.use(express.static('public'))
}
app.use(/\.[0-9a-z]+$/i, express.static('public'));

app.listen(PORT, () => {
    console.log(`API Listening on port ${PORT}`);
});