import { Router } from 'express';
import { ChecklistRepository } from '../repositories/checklist.repository';
import { ChecklistService } from '../services/checklist.service';
import { ChecklistController } from '../controllers/checklist.controller';

const router = Router();
const checklistRepository = new ChecklistRepository();
const checklistService = new ChecklistService(checklistRepository);
const checklistController = new ChecklistController(checklistService);

router.get('/', checklistController.getAllChecklists);
router.get('/:id', checklistController.getChecklistById);
router.post('/', checklistController.createChecklist);
router.put('/:id', checklistController.updateChecklist);
router.delete('/:id', checklistController.deleteChecklist);

export default router;
