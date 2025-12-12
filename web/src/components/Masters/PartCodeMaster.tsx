import { useState } from 'react';
import type { PartCodeMaster, AppData } from '../../types/models';
import { addPartCode, updatePartCode, deletePartCode } from '../../services/DataService';
import './Masters.css';

interface PartCodeMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

const emptyForm = {
    partCode: '',
    description: '',
    classId: '',
    vaId: ''
};

export default function PartCodeMasterView({ data, onDataChange }: PartCodeMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(emptyForm);
    const [searchTerm, setSearchTerm] = useState('');

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.partCode.trim()) return;

        if (editingId) {
            const newData = updatePartCode(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addPartCode(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: PartCodeMaster) => {
        setEditingId(item.id);
        setFormData({
            partCode: item.partCode,
            description: item.description,
            classId: item.classId,
            vaId: item.vaId
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this part code?')) {
            const newData = deletePartCode(data, id);
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

    const filteredItems = data.partCodes.filter(item =>
        item.partCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header" style={{ background: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)' }}>
                <h2>🔧 Part Code Master</h2>
                <p>Manage part codes with references to Class and VA masters</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit Part Code' : '➕ Add New Part Code'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Part Code *</label>
                            <input
                                type="text"
                                value={formData.partCode}
                                onChange={(e) => setFormData({ ...formData, partCode: e.target.value })}
                                placeholder="e.g., CT-001"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input
                                type="text"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="e.g., Current Transformer Type A"
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
                            placeholder="Search part codes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">🔧</div>
                            <p>No part codes found. Add your first part code above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>Part Code</th>
                                    <th>Description</th>
                                    <th>Class</th>
                                    <th>VA</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.partCode}</strong></td>
                                        <td>{item.description}</td>
                                        <td><span className="badge badge-info">{getClassName(item.classId)}</span></td>
                                        <td><span className="badge badge-success">{getVAValue(item.vaId)}</span></td>
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
