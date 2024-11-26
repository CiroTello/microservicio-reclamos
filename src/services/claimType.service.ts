import { CustomError } from '@config/errors/error.model';
import { ClaimStateEnum } from '@dtos/enum/claimState.enum';
import claimTypeRepository from '@repositories/claimType.repository';

class ClaimTypeService {
  // Obtener todos los tipos de reclamos
  public async getClaimTypes() {    
    return claimTypeRepository.getClaimTypesDownDateNull();
  } 

  // Crear un nuevo tipo de reclamo
  public async createClaimType(claimType: any) {
    if (!claimType.name) {
      throw new CustomError('Name is required', 400);
    }
    if (!claimType.description) {
      throw new CustomError('Description is required', 400);
    }
    if (claimType.downDate != null) {
      throw new CustomError('DownDate cant be distinct null', 400);
    }

    return await claimTypeRepository.create(claimType);;
  }

  // Obtener un tipo de reclamo específico por su ID
  public async getClaimTypeById (claimTypeId: string) {
    if (!claimTypeId) {
      throw new CustomError('ClaimTypeId is required', 400);
    }

    return claimTypeRepository.getById(claimTypeId);
  }

  // Eliminar un tipo de reclamo específ
  public async deleteClaimType (claimTypeId: string, user: any) {
    if (!user.permissions.includes("admin")) {
      throw new CustomError(`User with name ${user.name} is not admin`, 401);
    }
    if (!claimTypeId) {
      throw new CustomError('ClaimTypeId is required', 400);
    }
    const claimTypeSaved = await claimTypeRepository.getById(claimTypeId);
    if (!claimTypeSaved) {
      throw new CustomError('ClaimType not found', 404);
    }
    if (claimTypeSaved.downDate != null) {
      throw new CustomError('ClaimType already deleted', 400);
    }

    claimTypeSaved.downDate = new Date();
    return claimTypeRepository.update(claimTypeId, claimTypeSaved);
  }
}

export default new ClaimTypeService();
