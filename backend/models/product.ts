import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  category: string;
  amount: number;
  unit: string;
  company: mongoose.Types.ObjectId;
}

const ProductSchema: Schema<ProductDocument> = new Schema({
  name: String,
  category: String,
  amount: Number,
  unit: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
    autopopulate: { maxDepth: 1 },
  },
});

ProductSchema.set('toJSON', {
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

ProductSchema.plugin(require('mongoose-autopopulate'));

const Product: Model<ProductDocument> = mongoose.model<ProductDocument>(
  'Product',
  ProductSchema
);

export default Product;
