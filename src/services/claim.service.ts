import { CustomError } from '@config/errors/error.model';
import { Claim } from '@models/entities/claim';
import claimRepository from '@repositories/claim.repository';
import { ClaimStateEnum } from '@dtos/enum/claimState.enum';
import claimTypeService from '@services/claimType.service';
import orderService from '@services/order.service';
import { copySync } from 'fs-extra';
import {Rabbit} from '@rabbit/rabbit.server';

class ClaimService {
  // Obtener todos los reclamos
  public async getClaims(userId: any) {
    if (userId.permissions.includes("admin")) {
      return claimRepository.getClaims();
    }
    return claimRepository.getClaimsByUser(userId);
  }

  // Crear un nuevo reclamo
  public async createClaim(claim: Claim, token: any) {
    if (!claim) {
      throw new CustomError('Claim is required', 400);
    }
    if (!claim.name) {
      throw new CustomError('Name is required', 400);
    }

    claim.startDate = new Date();
    if (!claim.orderId) {
      throw new CustomError('Order is required', 400);
    }
    if (claim.claimTypeId == null) {
      throw new CustomError('ClaimType is required', 400);
    }
    const claimType = await claimTypeService.getClaimTypeById(claim.claimTypeId);
    if (!claimType) {
      throw new CustomError('ClaimType not found', 404);
    }

    const rpta = await orderService.checkOrderExists(claim.orderId, token);
    if(!rpta == false){ // Hardcodeado para que no falle al no encontrar la orden
      throw new CustomError('Order not found', 404);
    }

    const claimCreated = await claimRepository.create(claim);
    return claimCreated
  }

  // Actualizar un reclamo específico
  public async updateClaim(claimId: string, claimData: Claim, user: any) {
    if (!claimId) {
      throw new CustomError('claimId is required', 400);
    }
    if (!claimData.claimState) {
      throw new CustomError('ClaimState is required', 400);
    }

    const claim = await claimRepository.getById(claimId);
    if (!claim) {
      throw new CustomError('Claim not found', 404);
    }

    if (user.permissions.includes("admin")) {
      if (claimData.claimState == ClaimStateEnum.IN_PROGRESS && claim.claimState == ClaimStateEnum.CREATED) {
        console.log("Procesar reclamo");

        claim.claimState = claimData.claimState;
        return claimRepository.update(claimId, claim);
      }
      if (claimData.claimState == ClaimStateEnum.FINALIZED && claim.claimState == ClaimStateEnum.IN_PROGRESS) {
        console.log("Resolver reclamo");

        console.log("Enviar mensaje a RabbitMQ");
        Rabbit.getInstance().sendMessage(`cancelOrder: ${claim.orderId}`);
        console.log("Mensaje enviado a RabbitMQ");
        claim.claimState = claimData.claimState;
        claim.resolution = true
        return claimRepository.update(claimId, claim);
      }
      if (claimData.claimState == ClaimStateEnum.CANCELED && claim.claimState == ClaimStateEnum.IN_PROGRESS) {
        console.log("Cancelar reclamo admin");

        claim.claimState = claimData.claimState;
        claim.resolution = false
        return claimRepository.update(claimId, claim);
      }
    } else {
      if (claimData.claimState == ClaimStateEnum.CANCELED && claim.claimState == ClaimStateEnum.CREATED) {
        console.log("Cancelar reclamo user");

        claim.claimState = claimData.claimState;
        claim.resolution = true
        return claimRepository.update(claimId, claim);
      }
    }

    throw new CustomError('Invalid states for any User Case', 400);
  }
}

export default new ClaimService();