import ClaimModel from '@models/claim';
import { Claim, ClaimDocument } from '@models/entities/claim';

class ClaimRepository {
  async getClaimByUser(usuario: number): Promise<ClaimDocument | null> {
    return ClaimModel.findOne({ usuario }).exec(); // Tipado explícito
  }
  async getClaims() {
    return ClaimModel.find();
  }
  async getById(claimId: string) {
    return ClaimModel.findById(claimId);
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
  async getClaimsByUser(userId: string) {
    return ClaimModel.find({ userId });
  }
}

export default new ClaimRepository();
