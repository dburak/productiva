import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CompanyDocument extends Document {
  name: string;
  legalNumber: string;
  country: string;
  website?: string;
  products: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const CompanySchema: Schema<CompanyDocument> = new Schema({
  name: String,
  legalNumber: {
    type: String,
    unique: true,
  },
  country: String,
  website: String,
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      autopopulate: { maxDepth: 1 },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

CompanySchema.set('toJSON', {
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

CompanySchema.plugin(require('mongoose-autopopulate'));

const Company: Model<CompanyDocument> = mongoose.model<CompanyDocument>(
  'Company',
  CompanySchema
);

export default Company;
