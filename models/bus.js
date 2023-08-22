import mongoose from "mongoose";
import slugify from "slugify";

const busSchema = new mongoose.Schema({
  busId: { type: String, required: true, unique: true },
  busName: { type: String, required: true },
  slug: { type: String, unique: true },
  busSeats: { type: Number, required: true },
  busAvailableSeats: { type: Number, required: true },
  busSource: { type: String, required: true },
  busDestination: { type: String, required: true },
  busDepartureTime: { type: Number, required: true },
});
busSchema.pre('save', function(next) {
  this.slug = slugify(this.busName, { lower: true, strict: true });
  next();
});

const Bus = mongoose.model("Bus", busSchema);

export default Bus;
