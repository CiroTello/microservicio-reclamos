import { Document } from 'mongoose';

export interface ClaimTypeDocument extends ClaimType, Document {}

export interface ClaimType {
  name: string;
  description: string;
  downDate: Date;
}
