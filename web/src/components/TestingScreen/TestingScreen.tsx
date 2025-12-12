import type { AppData, TestingGridRow } from '../../types/models';
import { Phase } from '../../types/models';
import { updateTestingData, resetTestingData, generateId } from '../../services/DataService';
import { exportToExcel } from '../../services/ExportService';
import './TestingScreen.css';

interface TestingScreenProps {
    data: AppData;
    onDataChange: (data: AppData) => void;
}

export default function TestingScreen({ data, onDataChange }: TestingScreenProps) {
    const testingData = data.testingData!;

    // Auto-calculated quantity
    const quantity = testingData.points * testingData.set;

    const handleInputChange = (field: string, value: string | number | boolean | Date) => {
        const newData = updateTestingData(data, { [field]: value });
        onDataChange(newData);
    };

    const handleAddRow = () => {
        const newRow: TestingGridRow = {
            id: generateId(),
            srNo: testingData.gridRows.length + 1,
            bdPercent: 0,
            priVolPercent: 0,
            excitationPercent: 0,
            ratioErrorPercent: 0,
            phaseErrorMin: 0,
            classValue: '',
            status: 'Pending'
        };
        const newData = updateTestingData(data, {
            gridRows: [...testingData.gridRows, newRow]
        });
        onDataChange(newData);
    };

    const handleDeleteRow = (id: string) => {
        const newRows = testingData.gridRows
            .filter(row => row.id !== id)
            .map((row, index) => ({ ...row, srNo: index + 1 }));
        const newData = updateTestingData(data, { gridRows: newRows });
        onDataChange(newData);
    };

    const handleRowChange = (id: string, field: string, value: string | number) => {
        const newRows = testingData.gridRows.map(row =>
            row.id === id ? { ...row, [field]: value } : row
        );
        const newData = updateTestingData(data, { gridRows: newRows });
        onDataChange(newData);
    };

    const handleNew = () => {
        if (confirm('Clear all data and start new?')) {
            const newData = resetTestingData(data);
            onDataChange(newData);
        }
    };

    const handleSave = () => {
        alert('Data saved successfully!');
    };

    const handlePrint = () => {
        window.print();
    };

    const handleExport = () => {
        exportToExcel({ ...testingData });
    };

    return (
        <div className="testing-screen">
            <div className="testing-main">
                {/* Top Input Fields */}
                <div className="input-card">
                    <div className="input-card-header">
                        <h3>🔬 Testing Screen - Input Fields</h3>
                    </div>
                    <div className="input-card-body">
                        {/* Row 1 */}
                        <div className="input-grid">
                            <div className="input-group">
                                <label>Port Name</label>
                                <input
                                    type="text"
                                    value={testingData.portName}
                                    onChange={(e) => handleInputChange('portName', e.target.value)}
                                    placeholder="Enter port name"
                                />
                            </div>
                            <div className="input-group">
                                <label>Amber</label>
                                <input
                                    type="text"
                                    value={testingData.amber}
                                    onChange={(e) => handleInputChange('amber', e.target.value)}
                                    placeholder="Enter amber"
                                />
                            </div>
                            <div className="input-group">
                                <label>CT/PT</label>
                                <input
                                    type="text"
                                    value={testingData.ctPt}
                                    onChange={(e) => handleInputChange('ctPt', e.target.value)}
                                    placeholder="Enter CT/PT"
                                />
                            </div>
                            <div className="input-group">
                                <label>Part Code</label>
                                <select
                                    value={testingData.partCodeId}
                                    onChange={(e) => handleInputChange('partCodeId', e.target.value)}
                                >
                                    <option value="">Select Part Code</option>
                                    {data.partCodes.map(pc => (
                                        <option key={pc.id} value={pc.id}>{pc.partCode}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Row 2 */}
                            <div className="input-group">
                                <label>Company</label>
                                <input
                                    type="text"
                                    value={testingData.company}
                                    onChange={(e) => handleInputChange('company', e.target.value)}
                                    placeholder="Enter company"
                                />
                            </div>
                            <div className="input-group">
                                <label>Phase</label>
                                <select
                                    value={testingData.phase}
                                    onChange={(e) => handleInputChange('phase', e.target.value)}
                                >
                                    <option value={Phase.Phase1}>1 Phase</option>
                                    <option value={Phase.Phase3}>3 Phase</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Ratio</label>
                                <input
                                    type="text"
                                    value={testingData.ratio}
                                    onChange={(e) => handleInputChange('ratio', e.target.value)}
                                    placeholder="Enter ratio"
                                />
                            </div>
                            <div className="input-group">
                                <label>Jobcard No</label>
                                <input
                                    type="text"
                                    value={testingData.jobcardNo}
                                    onChange={(e) => handleInputChange('jobcardNo', e.target.value)}
                                    placeholder="Enter jobcard no"
                                />
                            </div>

                            {/* Row 3 - Auto Calculation */}
                            <div className="input-group">
                                <label>Sec</label>
                                <input
                                    type="text"
                                    value={testingData.sec}
                                    onChange={(e) => handleInputChange('sec', e.target.value)}
                                    placeholder="Enter sec"
                                />
                            </div>
                            <div className="input-group calc-highlight">
                                <label>⚡ Points</label>
                                <input
                                    type="number"
                                    value={testingData.points}
                                    onChange={(e) => handleInputChange('points', Number(e.target.value) || 0)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="input-group calc-highlight">
                                <label>⚡ Set</label>
                                <input
                                    type="number"
                                    value={testingData.set}
                                    onChange={(e) => handleInputChange('set', Number(e.target.value) || 0)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="input-group calc-result">
                                <label>🔄 Quantity (Auto)</label>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                />
                            </div>

                            {/* Auto-Calculation Display */}
                            <div className="calc-formula">
                                <span>Points ({testingData.points})</span>
                                <span className="operator">×</span>
                                <span>Set ({testingData.set})</span>
                                <span className="equals">=</span>
                                <span className="result-value">{quantity}</span>
                            </div>

                            {/* Row 4 */}
                            <div className="input-group">
                                <label>PO No</label>
                                <input
                                    type="text"
                                    value={testingData.poNo}
                                    onChange={(e) => handleInputChange('poNo', e.target.value)}
                                    placeholder="Enter PO no"
                                />
                            </div>
                            <div className="input-group">
                                <label>Invoice No</label>
                                <input
                                    type="text"
                                    value={testingData.invoiceNo}
                                    onChange={(e) => handleInputChange('invoiceNo', e.target.value)}
                                    placeholder="Enter invoice no"
                                />
                            </div>
                            <div className="input-group">
                                <label>Serial No</label>
                                <input
                                    type="text"
                                    value={testingData.serialNo}
                                    onChange={(e) => handleInputChange('serialNo', e.target.value)}
                                    placeholder="Enter serial no"
                                />
                            </div>
                            <div className="input-group">
                                <label>JC Qty</label>
                                <input
                                    type="number"
                                    value={testingData.jcQty}
                                    onChange={(e) => handleInputChange('jcQty', Number(e.target.value) || 0)}
                                    placeholder="0"
                                />
                            </div>

                            {/* Row 5 */}
                            <div className="input-group">
                                <label>Partial Qty</label>
                                <input
                                    type="number"
                                    value={testingData.partialQty}
                                    onChange={(e) => handleInputChange('partialQty', Number(e.target.value) || 0)}
                                    placeholder="0"
                                />
                            </div>
                            <div className="input-group">
                                <label>IEC Standard</label>
                                <select
                                    value={testingData.iecStandardId}
                                    onChange={(e) => handleInputChange('iecStandardId', e.target.value)}
                                >
                                    <option value="">Select IEC Standard</option>
                                    {data.iecStandards.map(iec => (
                                        <option key={iec.id} value={iec.id}>{iec.iecStandard}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Model</label>
                                <select
                                    value={testingData.modelId}
                                    onChange={(e) => handleInputChange('modelId', e.target.value)}
                                >
                                    <option value="">Select Model</option>
                                    {data.models.map(m => (
                                        <option key={m.id} value={m.id}>{m.modelName}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="input-group">
                                <label>FS</label>
                                <input
                                    type="text"
                                    value={testingData.fs}
                                    onChange={(e) => handleInputChange('fs', e.target.value)}
                                    placeholder="Enter FS"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="grid-card">
                    <div className="grid-toolbar">
                        <button className="btn btn-success" onClick={handleAddRow}>
                            ➕ Add Row
                        </button>
                    </div>
                    <div className="grid-container">
                        {testingData.gridRows.length === 0 ? (
                            <div className="grid-empty">
                                <div className="icon">📋</div>
                                <p>No test data yet. Click "Add Row" to start.</p>
                            </div>
                        ) : (
                            <table className="testing-grid">
                                <thead>
                                    <tr>
                                        <th>Sr.No</th>
                                        <th>BD %</th>
                                        <th>Pri.Vol %</th>
                                        <th>Excitation %</th>
                                        <th>Ratio Error %</th>
                                        <th>Phase Error (MIN)</th>
                                        <th>Class</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {testingData.gridRows.map(row => (
                                        <tr key={row.id}>
                                            <td className="sr-no">{row.srNo}</td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.bdPercent}
                                                    onChange={(e) => handleRowChange(row.id, 'bdPercent', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.priVolPercent}
                                                    onChange={(e) => handleRowChange(row.id, 'priVolPercent', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.excitationPercent}
                                                    onChange={(e) => handleRowChange(row.id, 'excitationPercent', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.ratioErrorPercent}
                                                    onChange={(e) => handleRowChange(row.id, 'ratioErrorPercent', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={row.phaseErrorMin}
                                                    onChange={(e) => handleRowChange(row.id, 'phaseErrorMin', Number(e.target.value))}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={row.classValue}
                                                    onChange={(e) => handleRowChange(row.id, 'classValue', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    value={row.status}
                                                    onChange={(e) => handleRowChange(row.id, 'status', e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Pass">Pass</option>
                                                    <option value="Fail">Fail</option>
                                                </select>
                                            </td>
                                            <td className="actions">
                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDeleteRow(row.id)}
                                                >
                                                    🗑️
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                    <div className="action-buttons">
                        <button className="btn btn-primary" onClick={handleSave}>
                            💾 Save
                        </button>
                        <button className="btn btn-secondary" onClick={handleNew}>
                            🆕 New
                        </button>
                        <button className="btn btn-primary" style={{ background: 'linear-gradient(135deg, #17a2b8 0%, #20c997 100%)' }} onClick={handlePrint}>
                            🖨️ Print
                        </button>
                        <button className="btn btn-success" onClick={handleExport}>
                            📊 Export to Excel
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Panel - Settings */}
            <div className="settings-panel">
                <div className="settings-header">
                    <h3>⚙️ Settings</h3>
                </div>
                <div className="settings-body">
                    <div className="setting-group">
                        <label>Revision No</label>
                        <input
                            type="text"
                            value={testingData.revisionNo}
                            onChange={(e) => handleInputChange('revisionNo', e.target.value)}
                            placeholder="Enter revision no"
                        />
                    </div>
                    <div className="setting-group">
                        <label>Revision Date</label>
                        <input
                            type="date"
                            value={testingData.revisionDate ? new Date(testingData.revisionDate).toISOString().split('T')[0] : ''}
                            onChange={(e) => handleInputChange('revisionDate', new Date(e.target.value))}
                        />
                    </div>
                    <label className="checkbox-group">
                        <input
                            type="checkbox"
                            checked={testingData.prefixEnabled}
                            onChange={(e) => handleInputChange('prefixEnabled', e.target.checked)}
                        />
                        <span>Prefix Enabled</span>
                    </label>
                    {testingData.prefixEnabled && (
                        <div className="setting-group">
                            <label>Prefix Text</label>
                            <input
                                type="text"
                                value={testingData.prefixText}
                                onChange={(e) => handleInputChange('prefixText', e.target.value)}
                                placeholder="Enter prefix"
                            />
                        </div>
                    )}
                    <label className="checkbox-group">
                        <input
                            type="checkbox"
                            checked={testingData.autoPrinting}
                            onChange={(e) => handleInputChange('autoPrinting', e.target.checked)}
                        />
                        <span>Auto Printing</span>
                    </label>
                    <div className="setting-group">
                        <label>VF</label>
                        <input
                            type="text"
                            value={testingData.vf}
                            onChange={(e) => handleInputChange('vf', e.target.value)}
                            placeholder="Enter VF"
                        />
                    </div>
                    <div className="setting-group">
                        <label>HSV</label>
                        <input
                            type="text"
                            value={testingData.hsv}
                            onChange={(e) => handleInputChange('hsv', e.target.value)}
                            placeholder="Enter HSV"
                        />
                    </div>
                    <div className="setting-group">
                        <label>kV</label>
                        <input
                            type="text"
                            value={testingData.kv}
                            onChange={(e) => handleInputChange('kv', e.target.value)}
                            placeholder="Enter kV"
                        />
                    </div>
                    <div className="setting-group">
                        <label>IL</label>
                        <input
                            type="text"
                            value={testingData.il}
                            onChange={(e) => handleInputChange('il', e.target.value)}
                            placeholder="Enter IL"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
