import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  name: string;
  passwordHash: string;
}

const userSchema: Schema<UserDocument> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
});

userSchema.set('toJSON', {
  transform: function (_doc, returnedObject) {
    if (returnedObject._id instanceof mongoose.Types.ObjectId) {
      returnedObject.id = returnedObject._id.toString();
    } else {
      throw new Error('id is not an ObjectId');
    }
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User: Model<UserDocument> = mongoose.model<UserDocument>(
  'User',
  userSchema
);

export default User;
