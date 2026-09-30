import { Router } from 'express';
import { DryDockRepository } from '../repositories/dry-dock.repository';
import { DryDockService } from '../services/dry-dock.service';
import { DryDockController } from '../controllers/dry-dock.controller';

const router = Router();
const dryDockRepository = new DryDockRepository();
const dryDockService = new DryDockService(dryDockRepository);
const dryDockController = new DryDockController(dryDockService);

router.get('/', dryDockController.getAllDryDocks);
router.get('/:id', dryDockController.getDryDockById);
router.post('/', dryDockController.createDryDock);
router.put('/:id', dryDockController.updateDryDock);
router.delete('/:id', dryDockController.deleteDryDock);


export default router;
