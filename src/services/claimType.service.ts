import { CustomError } from '@config/errors/error.model';
import { ClaimStateEnum } from '@dtos/enum/claimState.enum';
import claimTypeRepository from '@repositories/claimType.repository';

class ClaimTypeService {
  public async getClaimTypes() {
    return claimTypeRepository.getClaimTypes();
  } 

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
    const claimTypeCreated = await claimTypeRepository.create(claimType);
    return claimTypeCreated;
  }

  public async getClaimTypeById (claimTypeId: string) {
    if (!claimTypeId) {
      throw new CustomError('ClaimTypeId is required', 400);
    }
    return claimTypeRepository.getById(claimTypeId);
  }

  public async deleteClaimType (claimTypeId: string) {
    if (!claimTypeId) {
      throw new CustomError('ClaimTypeId is required', 400);
    }
    const claimTypeSaved = await claimTypeRepository.getById(claimTypeId);

    if (!claimTypeSaved) {
      // Si no existe el registro, lanza un error de tipo "not found".
      throw new CustomError('ClaimType not found', 404);
    }

    // Verifica si el atributo `downDate` tiene un valor no nulo.
    if (claimTypeSaved.downDate != null) {
      throw new CustomError('ClaimType already deleted', 400);
    }

    claimTypeSaved.downDate = new Date();

    // Actualiza el registro, estableciendo `downDate` con la fecha actual.
    return claimTypeRepository.update(claimTypeId, claimTypeSaved);
  }
}

export default new ClaimTypeService();
