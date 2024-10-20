const mongoose = require("mongoose");

const ProductApplicationSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  employeeName: { type: String, required: true },
  productName: { type: String, required: true },
  quantity: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' } ,
  createdAt: {
    type: Date,
    default: Date.now,
   
  }
});

mongoose.model("ProductApplication", ProductApplicationSchema);


