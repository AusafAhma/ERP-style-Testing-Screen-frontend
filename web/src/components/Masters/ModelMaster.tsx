import { useState } from 'react';
import type { ModelMaster, AppData } from '../../types/models';
import { Phase } from '../../types/models';
import { addModel, updateModel, deleteModel } from '../../services/DataService';
import './Masters.css';

interface ModelMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

const emptyForm = {
    modelName: '',
    description: '',
    classId: '',
    vaId: '',
    phase: Phase.Phase1 as typeof Phase.Phase1 | typeof Phase.Phase3
};

export default function ModelMasterView({ data, onDataChange }: ModelMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(emptyForm);
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.modelName.trim()) return;

        if (editingId) {
            const newData = updateModel(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addModel(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: ModelMaster) => {
        setEditingId(item.id);
        setFormData({
            modelName: item.modelName,
            description: item.description,
            classId: item.classId,
            vaId: item.vaId,
            phase: item.phase
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this model?')) {
            const newData = deleteModel(data, id);
            onDataChange(newData);
        }
    };

    const getClassName = (classId: string) => {
        const cls = data.classes.find(c => c.id === classId);
        return cls ? cls.className : '-';
    };

    const getVAValue = (vaId: string) => {
        const va = data.vas.find(v => v.id === vaId);
        return va ? va.vaValue : '-';
    };

    const filteredItems = data.models.filter(item =>
        item.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <h2>📦 Model Master</h2>
                <p>Manage models with Class, VA, and Phase configurations</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit Model' : '➕ Add New Model'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Model Name *</label>
                            <input
                                type="text"
                                value={formData.modelName}
                                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                                placeholder="e.g., CT-100"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g., Compact CT Model"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Class</label>
                            <select
                                value={formData.classId}
                                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                            >
                                <option value="">Select Class</option>
                                {data.classes.map(cls => (
                                    <option key={cls.id} value={cls.id}>{cls.className}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>VA Rating</label>
                            <select
                                value={formData.vaId}
                                onChange={(e) => setFormData({ ...formData, vaId: e.target.value })}
                            >
                                <option value="">Select VA</option>
                                {data.vas.map(va => (
                                    <option key={va.id} value={va.id}>{va.vaValue}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Phase</label>
                            <select
                                value={formData.phase}
                                onChange={(e) => setFormData({ ...formData, phase: e.target.value as typeof Phase.Phase1 | typeof Phase.Phase3 })}
                            >
                                <option value={Phase.Phase1}>1 Phase</option>
                                <option value={Phase.Phase3}>3 Phase</option>
                            </select>
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
                            placeholder="Search models..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">📦</div>
                            <p>No models found. Add your first model above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>Model Name</th>
                                    <th>Description</th>
                                    <th>Class</th>
                                    <th>VA</th>
                                    <th>Phase</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.modelName}</strong></td>
                                        <td>{item.description}</td>
                                        <td><span className="badge badge-info">{getClassName(item.classId)}</span></td>
                                        <td><span className="badge badge-success">{getVAValue(item.vaId)}</span></td>
                                        <td>{item.phase}</td>
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
