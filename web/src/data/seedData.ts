import type {
    ClassMaster,
    VAMaster,
    IECStandardMaster,
    PartyMaster,
    LabelMaster,
    PartCodeMaster,
    ModelMaster,
    TestingScreenData
} from '../types/models';
import { Phase, LabelType } from '../types/models';

// Seed data - pre-populated for demo
export const seedClasses: ClassMaster[] = [
    { id: '1', className: '0.2', description: 'Precision Class 0.2', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', className: '0.5', description: 'Precision Class 0.5', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', className: '1', description: 'Standard Class 1', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', className: '3', description: 'Commercial Class 3', createdAt: new Date(), updatedAt: new Date() },
    { id: '5', className: '5', description: 'Utility Class 5', createdAt: new Date(), updatedAt: new Date() },
];

export const seedVAs: VAMaster[] = [
    { id: '1', vaValue: '5 VA', description: '5 Volt-Ampere Rating', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', vaValue: '10 VA', description: '10 Volt-Ampere Rating', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', vaValue: '15 VA', description: '15 Volt-Ampere Rating', createdAt: new Date(), updatedAt: new Date() },
    { id: '4', vaValue: '25 VA', description: '25 Volt-Ampere Rating', createdAt: new Date(), updatedAt: new Date() },
    { id: '5', vaValue: '30 VA', description: '30 Volt-Ampere Rating', createdAt: new Date(), updatedAt: new Date() },
];

export const seedIECStandards: IECStandardMaster[] = [
    { id: '1', iecStandard: 'IEC 60044-1', description: 'Current Transformers', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', iecStandard: 'IEC 61869-1', description: 'General Requirements for Instrument Transformers', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', iecStandard: 'IEC 61869-2', description: 'Additional Requirements for Current Transformers', createdAt: new Date(), updatedAt: new Date() },
];

export const seedParties: PartyMaster[] = [
    { id: '1', partyName: 'Acme Corp', address: '123 Main St, Industrial Area', contactPerson: 'John Doe', phone: '+1-555-0100', email: 'john@acme.com', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', partyName: 'Tech Industries', address: '456 Tech Park', contactPerson: 'Jane Smith', phone: '+1-555-0200', email: 'jane@techindustries.com', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', partyName: 'Power Systems Ltd', address: '789 Energy Blvd', contactPerson: 'Mike Johnson', phone: '+1-555-0300', email: 'mike@powersystems.com', createdAt: new Date(), updatedAt: new Date() },
];

export const seedLabels: LabelMaster[] = [
    { id: '1', labelName: 'Standard Label', labelType: LabelType.Square, filePath: '/labels/standard.png', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', labelName: 'Extended Label', labelType: LabelType.Rect, filePath: '/labels/extended.png', createdAt: new Date(), updatedAt: new Date() },
];

export const seedPartCodes: PartCodeMaster[] = [
    { id: '1', partCode: 'CT-001', description: 'Current Transformer Type A', classId: '1', vaId: '1', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', partCode: 'CT-002', description: 'Current Transformer Type B', classId: '2', vaId: '2', createdAt: new Date(), updatedAt: new Date() },
    { id: '3', partCode: 'PT-001', description: 'Potential Transformer Type A', classId: '1', vaId: '3', createdAt: new Date(), updatedAt: new Date() },
];

export const seedModels: ModelMaster[] = [
    { id: '1', modelName: 'CT-100', description: 'Compact CT Model', classId: '1', vaId: '1', phase: Phase.Phase1, createdAt: new Date(), updatedAt: new Date() },
    { id: '2', modelName: 'CT-200', description: 'Standard CT Model', classId: '2', vaId: '2', phase: Phase.Phase3, createdAt: new Date(), updatedAt: new Date() },
    { id: '3', modelName: 'PT-100', description: 'Compact PT Model', classId: '1', vaId: '3', phase: Phase.Phase1, createdAt: new Date(), updatedAt: new Date() },
];

export const defaultTestingData: TestingScreenData = {
    id: '1',
    portName: '',
    amber: '',
    ctPt: '',
    partCodeId: '',
    company: '',
    phase: Phase.Phase1,
    ratio: '',
    jobcardNo: '',
    sec: '',
    points: 0,
    set: 0,
    poNo: '',
    invoiceNo: '',
    serialNo: '',
    jcQty: 0,
    partialQty: 0,
    iecStandardId: '',
    modelId: '',
    fs: '',
    revisionNo: '',
    revisionDate: new Date(),
    prefixEnabled: false,
    prefixText: '',
    autoPrinting: false,
    vf: '',
    hsv: '',
    kv: '',
    il: '',
    gridRows: [],
    createdAt: new Date(),
    updatedAt: new Date(),
};
