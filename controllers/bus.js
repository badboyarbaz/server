import Bus from "../models/bus.js";

export const createBus = async (req, res, next) => {
    const newBus = new Bus(req.body);
    try {
        const savedBus = await newBus.save();
        res.status(200).json(savedBus);
    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ error: 'busId must be unique' });
        } else {
        throw err;}
    }
}

export const updateBus = async (req, res, next) => {
    try {
        const updatedBus = await Bus.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedBus)
    } catch (err) {
        throw err;
    }
}

export const deleteBus = async (req, res, next) => {
    try {
        await Bus.findByIdAndDelete(req.params.id);
        res.status(200).json("Bus has been deleted");
    } catch (err) {
        throw err;
    }
}

export const getBus = async (req, res, next) => {
    try {
      const busId = req.params.id;
      const bus = await Bus.findById(busId);
      if (!bus) {
        return res.status(404).json({ error: 'Bus not found' });
      }
      res.status(200).json(bus);
    } catch (error) {
      next(error);
    }
  };

export const getBuses = async (req, res, next) => {
  try {
    const buses = await Bus.find(req.params);
    res.status(200).json(buses);
  } catch (error) {
    next(error);
  }
};
