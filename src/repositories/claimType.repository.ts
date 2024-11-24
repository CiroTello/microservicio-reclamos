import ModelClaimType from '@models/claimType';
import { ClaimType, ClaimTypeDocument } from '@models/entities/claimType';

class ClaimTypeRepository {
  async getClaimTypes() {
    return ModelClaimType.find();
  }
  async getById(claimTypeId: string): Promise<ClaimTypeDocument | null>{
    return ModelClaimType.findById(claimTypeId).exec();
  }
  async create(payload: ClaimType) {
    return ModelClaimType.create(payload);
  }
  async update(claimTypeId: string, payload: ClaimType) {
    return ModelClaimType.findByIdAndUpdate(claimTypeId, payload, { new: true });
  }
}

export default new ClaimTypeRepository();
