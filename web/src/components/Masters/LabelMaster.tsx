import { useState } from 'react';
import type { LabelMaster, AppData } from '../../types/models';
import { LabelType } from '../../types/models';
import { addLabel, updateLabel, deleteLabel } from '../../services/DataService';
import './Masters.css';

interface LabelMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

const emptyForm = {
    labelName: '',
    labelType: LabelType.Square as typeof LabelType.Square | typeof LabelType.Rect,
    filePath: ''
};

export default function LabelMasterView({ data, onDataChange }: LabelMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(emptyForm);
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.labelName.trim()) return;

        if (editingId) {
            const newData = updateLabel(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addLabel(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: LabelMaster) => {
        setEditingId(item.id);
        setFormData({
            labelName: item.labelName,
            labelType: item.labelType,
            filePath: item.filePath
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this label?')) {
            const newData = deleteLabel(data, id);
            onDataChange(newData);
        }
    };

    const filteredItems = data.labels.filter(item =>
        item.labelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.filePath.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header" style={{ background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }}>
                <h2 style={{ color: '#333' }}>🏷️ Label Master</h2>
                <p style={{ color: '#555' }}>Configure label types with file paths or URLs</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit Label' : '➕ Add New Label'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Label Name *</label>
                            <input
                                type="text"
                                value={formData.labelName}
                                onChange={(e) => setFormData({ ...formData, labelName: e.target.value })}
                                placeholder="e.g., Standard Label"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Label Type</label>
                            <select
                                value={formData.labelType}
                                onChange={(e) => setFormData({ ...formData, labelType: e.target.value as typeof LabelType.Square | typeof LabelType.Rect })}
                            >
                                <option value={LabelType.Square}>Square</option>
                                <option value={LabelType.Rect}>Rectangle</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>File Path / URL</label>
                            <input
                                type="text"
                                value={formData.filePath}
                                onChange={(e) => setFormData({ ...formData, filePath: e.target.value })}
                                placeholder="e.g., /labels/standard.png or https://example.com/label.png"
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
                            placeholder="Search labels..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">🏷️</div>
                            <p>No labels found. Add your first label above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>Label Name</th>
                                    <th>Type</th>
                                    <th>File Path</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.labelName}</strong></td>
                                        <td>
                                            <span className={`badge ${item.labelType === LabelType.Square ? 'badge-info' : 'badge-success'}`}>
                                                {item.labelType}
                                            </span>
                                        </td>
                                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {item.filePath}
                                        </td>
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
