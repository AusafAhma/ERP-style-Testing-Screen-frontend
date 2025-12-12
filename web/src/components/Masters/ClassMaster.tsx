import { useState } from 'react';
import type { ClassMaster, AppData } from '../../types/models';
import { addClass, updateClass, deleteClass } from '../../services/DataService';
import './Masters.css';

interface ClassMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

export default function ClassMasterView({ data, onDataChange }: ClassMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ className: '', description: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setFormData({ className: '', description: '' });
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.className.trim()) return;

        if (editingId) {
            const newData = updateClass(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addClass(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: ClassMaster) => {
        setEditingId(item.id);
        setFormData({ className: item.className, description: item.description });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this class?')) {
            const newData = deleteClass(data, id);
            onDataChange(newData);
        }
    };

    const filteredItems = data.classes.filter(item =>
        item.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header">
                <h2>📊 Class Master</h2>
                <p>Manage electrical component classes (0.2, 0.5, 1, 3, 5)</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit Class' : '➕ Add New Class'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Class Name *</label>
                            <input
                                type="text"
                                value={formData.className}
                                onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                                placeholder="e.g., 0.5"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g., Precision Class 0.5"
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
                            placeholder="Search classes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">📊</div>
                            <p>No classes found. Add your first class above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>Class Name</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.className}</strong></td>
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
