import { useState } from 'react';
import { Sweet, useSweetStore } from '../store/sweetStore';
import './SweetCard.css';

interface SweetCardProps {
  sweet: Sweet;
  isAdmin: boolean;
}

export function SweetCard({ sweet, isAdmin }: SweetCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [showEdit, setShowEdit] = useState(false);
  const [editData, setEditData] = useState(sweet);
  const [showRestock, setShowRestock] = useState(false);
  const [restockQty, setRestockQty] = useState(10);
  const { purchaseSweet, updateSweet, deleteSweet, restockSweet } = useSweetStore();

  const handlePurchase = async () => {
    try {
      await purchaseSweet(sweet.id, quantity);
      alert('Purchase successful!');
      setQuantity(1);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateSweet(sweet.id, editData);
      setShowEdit(false);
      alert('Sweet updated successfully!');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${sweet.name}"?`)) {
      try {
        await deleteSweet(sweet.id);
        alert('Sweet deleted successfully!');
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleRestock = async () => {
    try {
      await restockSweet(sweet.id, restockQty);
      setShowRestock(false);
      alert('Restock successful!');
    } catch (error) {
      console.error('Restock failed:', error);
    }
  };

  const outOfStock = sweet.quantity === 0;

  return (
    <div className={`sweet-card ${outOfStock ? 'out-of-stock' : ''}`}>
      <div className="sweet-image">
        {sweet.imageUrl ? (
          <img src={sweet.imageUrl} alt={sweet.name} />
        ) : (
          <div className="sweet-placeholder">🍬</div>
        )}
        {outOfStock && <div className="out-of-stock-badge">Out of Stock</div>}
      </div>

      {showEdit && isAdmin ? (
        <div className="sweet-edit-form">
          <input
            type="text"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="text"
            value={editData.category}
            onChange={(e) => setEditData({ ...editData, category: e.target.value })}
            placeholder="Category"
          />
          <input
            type="number"
            value={editData.price}
            onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })}
            placeholder="Price"
            step="0.01"
          />
          <input
            type="number"
            value={editData.quantity}
            onChange={(e) => setEditData({ ...editData, quantity: parseInt(e.target.value) })}
            placeholder="Quantity"
          />
          <textarea
            value={editData.description || ''}
            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
            placeholder="Description"
          />
          <div className="edit-actions">
            <button onClick={handleUpdate} className="btn btn-success btn-sm">
              Save
            </button>
            <button onClick={() => setShowEdit(false)} className="btn btn-outline btn-sm">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="sweet-content">
            <h3>{sweet.name}</h3>
            <div className="sweet-category">{sweet.category}</div>
            {sweet.description && <p className="sweet-description">{sweet.description}</p>}
            <div className="sweet-info">
              <span className="sweet-price">${(Number(sweet.price) || 0).toFixed(2)}</span>
              <span className="sweet-quantity">Stock: {sweet.quantity}</span>
            </div>
          </div>

          {!outOfStock && (
            <div className="purchase-section">
              <div className="quantity-selector">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="btn btn-sm"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(sweet.quantity, quantity + 1))}
                  className="btn btn-sm"
                >
                  +
                </button>
              </div>
              <button
                onClick={handlePurchase}
                className="btn btn-primary btn-sm"
                disabled={quantity > sweet.quantity}
              >
                Purchase (${((Number(sweet.price) || 0) * quantity).toFixed(2)})
              </button>
            </div>
          )}

          {isAdmin && (
            <div className="admin-actions">
              <button onClick={() => setShowEdit(true)} className="btn btn-secondary btn-sm">
                Edit
              </button>
              <button onClick={() => setShowRestock(true)} className="btn btn-success btn-sm">
                Restock
              </button>
              <button onClick={handleDelete} className="btn btn-danger btn-sm">
                Delete
              </button>
            </div>
          )}

          {showRestock && isAdmin && (
            <div className="restock-popup">
              <h4>Restock {sweet.name}</h4>
              <input
                type="number"
                value={restockQty}
                onChange={(e) => setRestockQty(parseInt(e.target.value) || 0)}
                min="1"
                placeholder="Quantity to add"
              />
              <div className="popup-actions">
                <button onClick={handleRestock} className="btn btn-success btn-sm">
                  Restock
                </button>
                <button onClick={() => setShowRestock(false)} className="btn btn-outline btn-sm">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
