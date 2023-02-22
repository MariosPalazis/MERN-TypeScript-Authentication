import { Schema, model, connect } from 'mongoose';
import {IUser} from '../interfaces/schemas'
import mongoose from 'mongoose';

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true },
    date: {
        type: Date,
        default: () => { return new Date() }
    }

});

export default mongoose.model<IUser>('users', userSchema);

