import { useState } from 'react';
import { useSweetStore } from '../store/sweetStore';
import './SweetForm.css';

interface SweetFormProps {
  onClose: () => void;
}

export function SweetForm({ onClose }: SweetFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');
  const { createSweet } = useSweetStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.price <= 0) {
      setError('Price must be greater than 0');
      return;
    }

    if (formData.quantity < 0) {
      setError('Quantity cannot be negative');
      return;
    }

    try {
      await createSweet(formData);
      alert('Sweet added successfully!');
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to create sweet');
    }
  };

  return (
    <div className="sweet-form-container">
      <div className="sweet-form card">
        <h2>Add New Sweet</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Chocolate Truffle"
              />
            </div>

            <div className="input-group">
              <label htmlFor="category">Category *</label>
              <input
                id="category"
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
                placeholder="e.g., Chocolate, Candy, Gummy"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="input-group">
              <label htmlFor="price">Price ($) *</label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                required
                placeholder="0.00"
              />
            </div>

            <div className="input-group">
              <label htmlFor="quantity">Quantity *</label>
              <input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                required
                placeholder="0"
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="imageUrl">Image URL (optional)</label>
            <input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your sweet..."
              rows={4}
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Add Sweet
            </button>
            <button type="button" onClick={onClose} className="btn btn-outline">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
