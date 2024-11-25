import { ClaimState } from '@dtos/enum/claimState.enum';
import { ClaimType } from '@models/entities/claimType';
import { Document } from 'mongoose';

export interface ClaimDocument extends Claim, Document {}
export interface Claim {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  userId: string;
  claimState: ClaimState;
  claimTypeId: string;
  resolution: boolean;
  orderId: string;
}
