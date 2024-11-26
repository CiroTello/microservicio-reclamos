import { model, Schema } from 'mongoose';
import { ClaimDocument } from './entities/claim';

export const ClaimSchema = new Schema<ClaimDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    claimState: {
      type: String,
      required: true,
      enum: ['CREATED', 'IN_PROGRESS', 'FINALIZED', 'CANCELED'],
    },
    claimTypeId: {
      type: String,
      required: true,
    },
    resolution: {
      type: Boolean,
      required: false,
    },
    orderId: {
      type: String,
      required: true,
    },
    comentarioResolucion: {
      type: String,
      required: false,
    },
  },
  {
    collection: 'claims',
    timestamps: true,
  }
);

const ClaimModel = model<ClaimDocument>('Claim', ClaimSchema);
export default ClaimModel;
