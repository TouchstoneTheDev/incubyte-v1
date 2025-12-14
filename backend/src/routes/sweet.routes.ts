import { Router } from 'express';
import { SweetController } from '../controllers/SweetController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

/**
 * @route   POST /api/sweets
 * @desc    Create a new sweet
 * @access  Protected (Admin only)
 */
router.post('/', authenticate, requireAdmin, SweetController.create);

/**
 * @route   GET /api/sweets
 * @desc    Get all sweets
 * @access  Protected
 */
router.get('/', authenticate, SweetController.getAll);

/**
 * @route   GET /api/sweets/search
 * @desc    Search sweets
 * @access  Protected
 */
router.get('/search', authenticate, SweetController.search);

/**
 * @route   PUT /api/sweets/:id
 * @desc    Update a sweet
 * @access  Protected (Admin only)
 */
router.put('/:id', authenticate, requireAdmin, SweetController.update);

/**
 * @route   DELETE /api/sweets/:id
 * @desc    Delete a sweet
 * @access  Protected (Admin only)
 */
router.delete('/:id', authenticate, requireAdmin, SweetController.delete);

/**
 * @route   POST /api/sweets/:id/purchase
 * @desc    Purchase a sweet
 * @access  Protected
 */
router.post('/:id/purchase', authenticate, SweetController.purchase);

/**
 * @route   POST /api/sweets/:id/restock
 * @desc    Restock a sweet
 * @access  Protected (Admin only)
 */
router.post('/:id/restock', authenticate, requireAdmin, SweetController.restock);

export default router;
