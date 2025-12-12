import { useState } from 'react';
import type { VAMaster, AppData } from '../../types/models';
import { addVA, updateVA, deleteVA } from '../../services/DataService';
import './Masters.css';

interface VAMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

export default function VAMasterView({ data, onDataChange }: VAMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ vaValue: '', description: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setFormData({ vaValue: '', description: '' });
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.vaValue.trim()) return;

        if (editingId) {
            const newData = updateVA(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addVA(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: VAMaster) => {
        setEditingId(item.id);
        setFormData({ vaValue: item.vaValue, description: item.description });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this VA rating?')) {
            const newData = deleteVA(data, id);
            onDataChange(newData);
        }
    };

    const filteredItems = data.vas.filter(item =>
        item.vaValue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <h2>⚡ VA Master</h2>
                <p>Manage Volt-Ampere (VA) ratings for electrical components</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit VA Rating' : '➕ Add New VA Rating'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>VA Value *</label>
                            <input
                                type="text"
                                value={formData.vaValue}
                                onChange={(e) => setFormData({ ...formData, vaValue: e.target.value })}
                                placeholder="e.g., 10 VA"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g., 10 Volt-Ampere Rating"
                            />
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {editingId ? '💾 Update' : '➕ Add'}
                        </button>
                        {editingId && (
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="master-toolbar">
                    <div className="search-box">
                        <input
                            type="text"
                            placeholder="Search VA ratings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">⚡</div>
                            <p>No VA ratings found. Add your first VA rating above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>VA Value</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.vaValue}</strong></td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className="table-actions">
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    ✏️ Edit
                                                </button>
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    🗑️ Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
