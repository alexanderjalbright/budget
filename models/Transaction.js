const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const TransactionSchema = new mongoose.Schema({
    userId: { type: ObjectId, required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 },
    date: { type: Date, required: true, default: () => new Date() },
});

module.exports =
    mongoose.models.Transaction ||
    mongoose.model('Transaction', TransactionSchema);
