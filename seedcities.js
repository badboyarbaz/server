import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
console.log('MONGO_URI:', process.env.MONGO_URI);

const CitySchema = new mongoose.Schema({
    name: String,
});

const City = mongoose.model('City', CitySchema);

const cities = [
    'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Pimpri-Chinchwad', 'Nashik', 'Kalyan-Dombivli', 'Vasai-Virar',
    'Chhatrapati Sambhajinagar', 'Navi Mumbai', 'Solapur', 'Mira-Bhayandar', 'Bhiwandi-Nizampur', 'Jalgaon',
    'Amravati', 'Nanded-Waghala', 'Kolhapur', 'Ulhasnagar', 'Sangli-Miraj-Kupwad', 'Malegaon', 'Akola',
    'Latur', 'Dhule', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Ichalkaranji', 'Jalna', 'Ambarnath', 'Bhusawal',
    'Panvel', 'Badlapur', 'Beed', 'Gondia', 'Satara', 'Barshi', 'Yavatmal', 'Achalpur', 'Dharashiv',
    'Nandurbar', 'Wardha', 'Udgir', 'Hinganghat',
];

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        cities.forEach(cityName => {
            const city = new City({ name: cityName });
            city.save();
        });
        console.log('Cities seeded successfully');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });
