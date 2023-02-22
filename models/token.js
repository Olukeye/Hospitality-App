import * as mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
    user_id: { type: mongoose.Types.ObjectId, ref: 'user', required: true },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600, }
});

export default mongoose.model("Token", tokenSchema);
