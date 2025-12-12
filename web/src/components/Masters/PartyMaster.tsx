import { useState } from 'react';
import type { PartyMaster, AppData } from '../../types/models';
import { addParty, updateParty, deleteParty, isValidEmail } from '../../services/DataService';
import './Masters.css';

interface PartyMasterViewProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

const emptyForm = {
    partyName: '',
    address: '',
    contactPerson: '',
    phone: '',
    email: ''
};

export default function PartyMasterView({ data, onDataChange }: PartyMasterViewProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState(emptyForm);
    const [searchTerm, setSearchTerm] = useState('');
    const [emailError, setEmailError] = useState('');

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setEmailError('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.partyName.trim()) return;

        // Validate email
        if (formData.email && !isValidEmail(formData.email)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        setEmailError('');

        if (editingId) {
            const newData = updateParty(data, editingId, formData);
            onDataChange(newData);
        } else {
            const newData = addParty(data, formData);
            onDataChange(newData);
        }
        resetForm();
    };

    const handleEdit = (item: PartyMaster) => {
        setEditingId(item.id);
        setFormData({
            partyName: item.partyName,
            address: item.address,
            contactPerson: item.contactPerson,
            phone: item.phone,
            email: item.email
        });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this party?')) {
            const newData = deleteParty(data, id);
            onDataChange(newData);
        }
    };

    const filteredItems = data.parties.filter(item =>
        item.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="master-container">
            <div className="master-header" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <h2>🏢 Party Master</h2>
                <p>Manage companies/customers with contact information</p>
            </div>

            <div className="master-content">
                <form className="master-form" onSubmit={handleSubmit}>
                    <h3 className="form-title">
                        {editingId ? '✏️ Edit Party' : '➕ Add New Party'}
                    </h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Party Name *</label>
                            <input
                                type="text"
                                value={formData.partyName}
                                onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                                placeholder="e.g., Acme Corporation"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Person</label>
                            <input
                                type="text"
                                value={formData.contactPerson}
                                onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                placeholder="e.g., John Doe"
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Phone</label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="e.g., +1-555-0100"
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData({ ...formData, email: e.target.value });
                                    if (emailError) setEmailError('');
                                }}
                                placeholder="e.g., contact@company.com"
                                className={emailError ? 'error' : ''}
                            />
                            {emailError && <span className="error-message">{emailError}</span>}
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <label>Address</label>
                            <textarea
                                value={formData.address}
                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                placeholder="e.g., 123 Main Street, Industrial Area, City"
                                rows={2}
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
                            placeholder="Search parties..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <span className="badge badge-info">{filteredItems.length} items</span>
                </div>

                <div className="master-table-container">
                    {filteredItems.length === 0 ? (
                        <div className="empty-state">
                            <div className="icon">🏢</div>
                            <p>No parties found. Add your first party above.</p>
                        </div>
                    ) : (
                        <table className="master-table">
                            <thead>
                                <tr>
                                    <th>Party Name</th>
                                    <th>Contact Person</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map(item => (
                                    <tr key={item.id}>
                                        <td><strong>{item.partyName}</strong></td>
                                        <td>{item.contactPerson}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.email}</td>
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
