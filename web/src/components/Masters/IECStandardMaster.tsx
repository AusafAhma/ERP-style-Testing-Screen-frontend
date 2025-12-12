import { useState } from 'react';
import type { IECStandardMaster, AppData } from '../../types/models';
import { addIECStandard, updateIECStandard, deleteIECStandard } from '../../services/DataService';
import './Masters.css';

interface IECStandardMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

export default function IECStandardMasterView({ data, onDataChange }: IECStandardMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ iecStandard: '', description: '' });
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setFormData({ iecStandard: '', description: '' });
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.iecStandard.trim()) return;

        if (editingId) {
            const newData = updateIECStandard(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addIECStandard(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: IECStandardMaster) => {
        setEditingId(item.id);
        setFormData({ iecStandard: item.iecStandard, description: item.description });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this IEC standard?')) {
            const newData = deleteIECStandard(data, id);
            onDataChange(newData);
        }
    };

    const filteredItems = data.iecStandards.filter(item =>
        item.iecStandard.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <h2>📋 IEC Standard Master</h2>
                <p>Manage IEC standards (IEC 60044-1, IEC 61869, etc.)</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit IEC Standard' : '➕ Add New IEC Standard'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>IEC Standard *</label>
                            <input
                                type="text"
                                value={formData.iecStandard}
                                onChange={(e) => setFormData({ ...formData, iecStandard: e.target.value })}
                                placeholder="e.g., IEC 60044-1"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g., Current Transformers"
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
                            placeholder="Search IEC standards..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">📋</div>
                            <p>No IEC standards found. Add your first standard above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>IEC Standard</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.iecStandard}</strong></td>
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
