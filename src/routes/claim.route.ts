import { Router, Request, Response, NextFunction } from 'express';
import { authMiddleware } from '@middlewares/auth.middleware';
import claimService from '@services/claim.service';

class ClaimsRoute {
  public router = Router();

  constructor() {
    this.createRoutes();
  }

  createRoutes(): void {
    // Ruta para obtener todos los reclamos
    this.router.get('/claims', authMiddleware, this.getClaims.bind(this));

    // Ruta para crear un nuevo reclamo
    this.router.post('/claims', authMiddleware, this.createClaim.bind(this));

    // Ruta para actualizar un reclamo específico
    this.router.put('/claims/:claimId', authMiddleware, this.updateClaim.bind(this));

    // Ruta para obtener un reclamo específico por su ID
    this.router.get('/claims/:claimId', authMiddleware, this.getClaimById);
  }

  // Obtener todos los reclamos
  private getClaims(req: Request, res: Response, next: NextFunction) {
    console.log("Query params:", req.query);
    const { claimState } = req.query;
    claimService
    .getClaims(req.user, claimState)
    .then((claims) => res.json(claims))
    .catch((err) => next(err));
  }

  // Crear un nuevo reclamo
  private createClaim(req: Request, res: Response, next: NextFunction) {
      const claimData = req.body;
      const token = req.headers.authorization;
      claimService
      .createClaim(claimData, token, req.user.id)
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }

  // Actualizar un reclamo específico
  private updateClaim(req: Request, res: Response, next: NextFunction) {    
    const { claimId } = req.params;
    const claimData = req.body;
  
    claimService
    .updateClaim(claimId, claimData, req.user)
    .then((response) => res.json(response))
    .catch((err) => next(err));
  }

  // Obtener un reclamo específico por su ID
  private async getClaimById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { claimId } = req.params;
      const claim = await claimService.getClaimById(claimId, req.user);
      res.status(200).json(claim);
    } catch (error) {
      next(error);
    }
  }
}

export default new ClaimsRoute().router;
