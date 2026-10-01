import { Router } from 'express';
import { ChecklistItemRepository } from '../repositories/checklist-item.repository';
import { ChecklistItemService } from '../services/checklist-item.service';
import { ChecklistItemController } from '../controllers/checklist-item.controller';
import { ChecklistRepository } from '../repositories/checklist.repository';

const router = Router();
const checklistItemRepository = new ChecklistItemRepository();
const checklistRepository = new ChecklistRepository();
const checklistItemService = new ChecklistItemService(checklistItemRepository, checklistRepository);
const checklistItemController = new ChecklistItemController(checklistItemService);

router.get('/', checklistItemController.getAllChecklistItems);
router.get('/:id', checklistItemController.getChecklistItemById);
router.post('/', checklistItemController.createChecklistItem);
router.put('/:id', checklistItemController.updateChecklistItem);
router.delete('/:id', checklistItemController.deleteChecklistItem);

export default router;
