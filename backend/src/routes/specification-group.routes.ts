import { Router } from 'express';
import { SpecificationGroupRepository } from '../repositories/specification-group.repository';
import { SpecificationGroupService } from '../services/specification-group.service';
import { SpecificationGroupController } from '../controllers/specification-group.controller';

const router = Router();
const specificationGroupRepository = new SpecificationGroupRepository();
const specificationGroupService = new SpecificationGroupService(specificationGroupRepository);
const specificationGroupController = new SpecificationGroupController(specificationGroupService);

router.get('/', specificationGroupController.getAllSpecificationGroups);
router.get('/:id', specificationGroupController.getSpecificationGroupById);
router.post('/', specificationGroupController.createSpecificationGroup);
router.put('/:id', specificationGroupController.updateSpecificationGroup);
router.delete('/:id', specificationGroupController.deleteSpecificationGroup);

export default router;
