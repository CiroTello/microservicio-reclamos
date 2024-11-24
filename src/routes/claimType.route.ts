import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import claimTypeService from '@services/claimType.service';

class ClaimTypesRoute {
  public router = Router();

  constructor() {
    this.createRoutes();
  }

  private createRoutes(): void {
    // Ruta para obtener todos los tipo reclamos
    this.router.get('/claim-types', authMiddleware, this.getClaimTypes);

    // Ruta para crear un nuevo tipo reclamo
    this.router.post('/claim-types', authMiddleware, this.createClaimType);

    // Ruta para eliminar un tipo reclamo específico
    this.router.delete('/claims/:claimId', authMiddleware, this.deleteClaimType);

    // Ruta para obtener un tipo reclamo específico por su ID
    this.router.get('/claim-types/:claimTypeId', authMiddleware, this.getClaimTypeById);
  }

  // Obtener todos los tipo reclamos
  private getClaimTypes(req: Request, res: Response, next: NextFunction) {
    claimTypeService
      .getClaimTypes()
      .then((claimTypes) => res.json(claimTypes))
      .catch((err) => next(err));
  }

  // Crear un nuevo tipo reclamo
  private createClaimType(req: Request, res: Response, next: NextFunction) {
    const claimTypeData = req.body;
    claimTypeService
      .createClaimType(claimTypeData)
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }

  // Obtener un tipo reclamo específico por su ID
  private getClaimTypeById(req: Request, res: Response, next: NextFunction) {
    const { claimTypeId } = req.params;
    claimTypeService
      .getClaimTypeById(claimTypeId)
      .then((claimType) => res.json(claimType))
      .catch((err) => next(err));
  }

  // Eliminar un tipo reclamo específico
  private deleteClaimType(req: Request, res: Response, next: NextFunction) {
    const { claimId } = req.params;
    claimTypeService
    .deleteClaimType(claimId)
    .then((response) => res.json(response))
    .catch((err) => next(err));
  }
}

export default new ClaimTypesRoute().router;
