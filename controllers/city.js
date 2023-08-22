import City from '../models/city.js';
export const getAllCities = async (req, res) => {
    try {
        const cities = await City.find();
        res.status(200).json(cities);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cities' });
    }
};
