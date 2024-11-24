import { model, Schema } from 'mongoose';
import { ClaimTypeDocument } from './entities/claimType';

export const ClaimTypeSchema = new Schema<ClaimTypeDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    downDate: {
      type: Date,
      required: false,
    },
  },
  {
    collection: 'claimTypes',
    timestamps: true,
  }
);

const ClaimTypeModel = model<ClaimTypeDocument>('ClaimType', ClaimTypeSchema);
export default ClaimTypeModel;
