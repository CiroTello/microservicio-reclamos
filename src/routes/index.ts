import { Router } from 'express';
import testRoute from './test.route';
//import claimTypesRoute from './claimType.route';
import claimsRoute from './claim.route';
import claimTypesRoute from './claimType.route';

const router = Router();

router.use(testRoute);
router.use(claimsRoute);
router.use(claimTypesRoute);

export default router;
