import { Router } from 'express';
import { ChecklistItemRepository } from '../repositories/checklist-item.repository';
import { ChecklistItemService } from '../services/checklist-item.service';
import { ChecklistItemController } from '../controllers/checklist-item.controller';

const router = Router();
const checklistItemRepository = new ChecklistItemRepository();
const checklistItemService = new ChecklistItemService(checklistItemRepository);
const checklistItemController = new ChecklistItemController(checklistItemService);

router.get('/', checklistItemController.getAllChecklistItems);
router.get('/:id', checklistItemController.getChecklistItemById);
router.post('/', checklistItemController.createChecklistItem);
router.put('/:id', checklistItemController.updateChecklistItem);
router.delete('/:id', checklistItemController.deleteChecklistItem);

export default router;
