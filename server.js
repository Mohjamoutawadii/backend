const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB setup
mongoose.connect('mongodb+srv://ayoub:Mohja123@cluster0.xfquudy.mongodb.net/Location', { // Configurer la connexion à la base de données
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

const VilleSchema = new mongoose.Schema({
    name: String
});

const ville = mongoose.model('villes', VilleSchema);
const gardeSchema = new mongoose.Schema({
    type: String
});

const garde = mongoose.model('gardes', gardeSchema);


const PharmacySchema = new mongoose.Schema({
    name: String,
    ville: String,
    zone: String,
    garde: String,
    dateGarde: Date,
    longitude: Number,
    latitude: Number,
    src: String

});



app.get('/zones', async (req, res) => {
    const { ville } = req.query;
    const query = {};

    if (ville) {
        query.ville = ville;
    }
    const zones = await zone.find(query);
    res.send(zones);
});





// Routes
app.get('/Villes', async (req, res) => {
    try {
        const villes = await ville.find();
        res.send(villes);
    } catch (err) {
        console.log(err);
    }
});



const Pharmacy = mongoose.model('pharmacies', PharmacySchema);

// Routes
app.get('/pharmacies', async (req, res) => {
    const { ville, zone, garde, date } = req.query;
    const query = {};

    if (ville) {
        query.ville = ville;
    }

    if (zone) {
        query.zone = zone;
    }

    if (garde) {
        query.garde = garde;
    }
    if (date) {
        query.dateGarde = new Date(date);
    }


    const pharmacies = await Pharmacy.find(query);
    res.send(pharmacies);
});
const zoneSchema = new mongoose.Schema({
    name: String,
    ville: String
});
const zone = mongoose.model('zones', zoneSchema);

app.get('/zones', async (req, res) => {
    const { ville } = req.query;
    const query = {};

    if (ville) {
        query.ville = ville;
    }
    const zones = await zone.find(query);
    res.send(zones);
});





app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
app.get('/', (req, res) => {
    res.send("hello")
})
