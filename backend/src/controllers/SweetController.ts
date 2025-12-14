import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Sweet } from '../entities/Sweet';
import { AuthRequest } from '../middleware/auth';

const sweetRepository = AppDataSource.getRepository(Sweet);

export class SweetController {
  /**
   * Create a new sweet
   */
  static async create(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { name, category, price, quantity, description, imageUrl } = req.body;

      // Validate input
      if (!name || !category || price === undefined || quantity === undefined) {
        res.status(400).json({ error: 'Name, category, price, and quantity are required' });
        return;
      }

      if (price < 0) {
        res.status(400).json({ error: 'Price must be a positive number' });
        return;
      }

      if (quantity < 0) {
        res.status(400).json({ error: 'Quantity must be a positive number' });
        return;
      }

      // Create sweet
      const sweet = sweetRepository.create({
        name,
        category,
        price,
        quantity,
        description,
        imageUrl
      });

      await sweetRepository.save(sweet);

      res.status(201).json({
        message: 'Sweet created successfully',
        sweet
      });
    } catch (error) {
      console.error('Create sweet error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Get all sweets
   */
  static async getAll(req: Request, res: Response): Promise<void> {
    try {
      const sweets = await sweetRepository.find({
        order: { createdAt: 'DESC' }
      });

      res.status(200).json({ sweets });
    } catch (error) {
      console.error('Get sweets error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Search sweets by name, category, or price range
   */
  static async search(req: Request, res: Response): Promise<void> {
    try {
      const { name, category, minPrice, maxPrice } = req.query;

      const queryBuilder = sweetRepository.createQueryBuilder('sweet');

      if (name) {
        queryBuilder.andWhere('LOWER(sweet.name) LIKE LOWER(:name)', {
          name: `%${name}%`
        });
      }

      if (category) {
        queryBuilder.andWhere('LOWER(sweet.category) = LOWER(:category)', {
          category
        });
      }

      if (minPrice) {
        queryBuilder.andWhere('sweet.price >= :minPrice', {
          minPrice: parseFloat(minPrice as string)
        });
      }

      if (maxPrice) {
        queryBuilder.andWhere('sweet.price <= :maxPrice', {
          maxPrice: parseFloat(maxPrice as string)
        });
      }

      const sweets = await queryBuilder.getMany();

      res.status(200).json({ sweets });
    } catch (error) {
      console.error('Search sweets error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Update a sweet
   */
  static async update(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { name, category, price, quantity, description, imageUrl } = req.body;

      const sweet = await sweetRepository.findOne({ where: { id } });

      if (!sweet) {
        res.status(404).json({ error: 'Sweet not found' });
        return;
      }

      // Validate price and quantity if provided
      if (price !== undefined && price < 0) {
        res.status(400).json({ error: 'Price must be a positive number' });
        return;
      }

      if (quantity !== undefined && quantity < 0) {
        res.status(400).json({ error: 'Quantity must be a positive number' });
        return;
      }

      // Update fields
      if (name !== undefined) sweet.name = name;
      if (category !== undefined) sweet.category = category;
      if (price !== undefined) sweet.price = price;
      if (quantity !== undefined) sweet.quantity = quantity;
      if (description !== undefined) sweet.description = description;
      if (imageUrl !== undefined) sweet.imageUrl = imageUrl;

      await sweetRepository.save(sweet);

      res.status(200).json({
        message: 'Sweet updated successfully',
        sweet
      });
    } catch (error) {
      console.error('Update sweet error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Delete a sweet
   */
  static async delete(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const sweet = await sweetRepository.findOne({ where: { id } });

      if (!sweet) {
        res.status(404).json({ error: 'Sweet not found' });
        return;
      }

      await sweetRepository.remove(sweet);

      res.status(200).json({ message: 'Sweet deleted successfully' });
    } catch (error) {
      console.error('Delete sweet error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Purchase a sweet (decrease quantity)
   */
  static async purchase(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity: purchaseQuantity } = req.body;

      if (!purchaseQuantity || purchaseQuantity <= 0) {
        res.status(400).json({ error: 'Purchase quantity must be a positive number' });
        return;
      }

      const sweet = await sweetRepository.findOne({ where: { id } });

      if (!sweet) {
        res.status(404).json({ error: 'Sweet not found' });
        return;
      }

      if (sweet.quantity < purchaseQuantity) {
        res.status(400).json({ error: 'Insufficient quantity in stock' });
        return;
      }

      sweet.quantity -= purchaseQuantity;
      await sweetRepository.save(sweet);

      res.status(200).json({
        message: 'Purchase successful',
        sweet
      });
    } catch (error) {
      console.error('Purchase error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  /**
   * Restock a sweet (increase quantity)
   */
  static async restock(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { quantity: restockQuantity } = req.body;

      if (!restockQuantity || restockQuantity <= 0) {
        res.status(400).json({ error: 'Restock quantity must be a positive number' });
        return;
      }

      const sweet = await sweetRepository.findOne({ where: { id } });

      if (!sweet) {
        res.status(404).json({ error: 'Sweet not found' });
        return;
      }

      sweet.quantity += restockQuantity;
      await sweetRepository.save(sweet);

      res.status(200).json({
        message: 'Restock successful',
        sweet
      });
    } catch (error) {
      console.error('Restock error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
