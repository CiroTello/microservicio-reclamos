import ClaimModel from '@models/claim';
import { Claim, ClaimDocument } from '@models/entities/claim';

class ClaimRepository {
  async getClaimByUser(usuario: number): Promise<ClaimDocument | null> {
    return ClaimModel.findOne({ usuario }).exec(); // Tipado explícito
  }
  async getClaimsByState(claimState: string){
    return ClaimModel.find({claimState});
  }
  async getById(claimId: string): Promise<ClaimDocument | null> {
    return ClaimModel.findById(claimId).exec();
  }
  async create(payload: Claim) {
    return ClaimModel.create(payload);
  }
  async update(claimId: any, payload: Claim) {
    return ClaimModel.findByIdAndUpdate(claimId, payload, { new: true });
  }
  async getByName(name: string) {
    return ClaimModel.findOne({ name });
  }
  async getClaimsByUser(userId: string)  {
    return ClaimModel.find({ userId });
  }
  async getClaims () {
    return ClaimModel.find();
  }
  async getClaimsByStateAndByUser(claimState: string, userId: number): Promise<any[]> {
    return ClaimModel.find({ claimState, userId });
  }
}

export default new ClaimRepository();
