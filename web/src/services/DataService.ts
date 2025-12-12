import type {
    AppData,
    ClassMaster,
    VAMaster,
    IECStandardMaster,
    PartyMaster,
    LabelMaster,
    PartCodeMaster,
    ModelMaster,
    TestingScreenData
} from '../types/models';
import {
    seedClasses,
    seedVAs,
    seedIECStandards,
    seedParties,
    seedLabels,
    seedPartCodes,
    seedModels,
    defaultTestingData
} from '../data/seedData';

const STORAGE_KEY = 'erp_testing_app_data';

// Generate unique ID
export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Initialize data with seed data or load from localStorage
export const initializeData = (): AppData => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            // Convert date strings back to Date objects
            return {
                ...parsed,
                classes: parsed.classes.map((c: ClassMaster) => ({
                    ...c,
                    createdAt: new Date(c.createdAt),
                    updatedAt: new Date(c.updatedAt)
                })),
                vas: parsed.vas.map((v: VAMaster) => ({
                    ...v,
                    createdAt: new Date(v.createdAt),
                    updatedAt: new Date(v.updatedAt)
                })),
                iecStandards: parsed.iecStandards.map((i: IECStandardMaster) => ({
                    ...i,
                    createdAt: new Date(i.createdAt),
                    updatedAt: new Date(i.updatedAt)
                })),
                parties: parsed.parties.map((p: PartyMaster) => ({
                    ...p,
                    createdAt: new Date(p.createdAt),
                    updatedAt: new Date(p.updatedAt)
                })),
                labels: parsed.labels.map((l: LabelMaster) => ({
                    ...l,
                    createdAt: new Date(l.createdAt),
                    updatedAt: new Date(l.updatedAt)
                })),
                partCodes: parsed.partCodes.map((pc: PartCodeMaster) => ({
                    ...pc,
                    createdAt: new Date(pc.createdAt),
                    updatedAt: new Date(pc.updatedAt)
                })),
                models: parsed.models.map((m: ModelMaster) => ({
                    ...m,
                    createdAt: new Date(m.createdAt),
                    updatedAt: new Date(m.updatedAt)
                })),
                testingData: parsed.testingData ? {
                    ...parsed.testingData,
                    revisionDate: new Date(parsed.testingData.revisionDate),
                    createdAt: new Date(parsed.testingData.createdAt),
                    updatedAt: new Date(parsed.testingData.updatedAt)
                } : null
            };
        } catch {
            console.error('Failed to parse stored data, using seed data');
        }
    }

    // Return seed data
    return {
        classes: [...seedClasses],
        vas: [...seedVAs],
        iecStandards: [...seedIECStandards],
        parties: [...seedParties],
        labels: [...seedLabels],
        partCodes: [...seedPartCodes],
        models: [...seedModels],
        testingData: { ...defaultTestingData }
    };
};

// Save data to localStorage
export const saveData = (data: AppData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// CRUD operations for Classes
export const addClass = (data: AppData, item: Omit<ClassMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: ClassMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, classes: [...data.classes, newItem] };
    saveData(newData);
    return newData;
};

export const updateClass = (data: AppData, id: string, item: Partial<ClassMaster>): AppData => {
    const newData = {
        ...data,
        classes: data.classes.map(c => c.id === id ? { ...c, ...item, updatedAt: new Date() } : c)
    };
    saveData(newData);
    return newData;
};

export const deleteClass = (data: AppData, id: string): AppData => {
    const newData = { ...data, classes: data.classes.filter(c => c.id !== id) };
    saveData(newData);
    return newData;
};

// CRUD operations for VAs
export const addVA = (data: AppData, item: Omit<VAMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: VAMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, vas: [...data.vas, newItem] };
    saveData(newData);
    return newData;
};

export const updateVA = (data: AppData, id: string, item: Partial<VAMaster>): AppData => {
    const newData = {
        ...data,
        vas: data.vas.map(v => v.id === id ? { ...v, ...item, updatedAt: new Date() } : v)
    };
    saveData(newData);
    return newData;
};

export const deleteVA = (data: AppData, id: string): AppData => {
    const newData = { ...data, vas: data.vas.filter(v => v.id !== id) };
    saveData(newData);
    return newData;
};

// CRUD operations for IEC Standards
export const addIECStandard = (data: AppData, item: Omit<IECStandardMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: IECStandardMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, iecStandards: [...data.iecStandards, newItem] };
    saveData(newData);
    return newData;
};

export const updateIECStandard = (data: AppData, id: string, item: Partial<IECStandardMaster>): AppData => {
    const newData = {
        ...data,
        iecStandards: data.iecStandards.map(i => i.id === id ? { ...i, ...item, updatedAt: new Date() } : i)
    };
    saveData(newData);
    return newData;
};

export const deleteIECStandard = (data: AppData, id: string): AppData => {
    const newData = { ...data, iecStandards: data.iecStandards.filter(i => i.id !== id) };
    saveData(newData);
    return newData;
};

// CRUD operations for Parties
export const addParty = (data: AppData, item: Omit<PartyMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: PartyMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, parties: [...data.parties, newItem] };
    saveData(newData);
    return newData;
};

export const updateParty = (data: AppData, id: string, item: Partial<PartyMaster>): AppData => {
    const newData = {
        ...data,
        parties: data.parties.map(p => p.id === id ? { ...p, ...item, updatedAt: new Date() } : p)
    };
    saveData(newData);
    return newData;
};

export const deleteParty = (data: AppData, id: string): AppData => {
    const newData = { ...data, parties: data.parties.filter(p => p.id !== id) };
    saveData(newData);
    return newData;
};

// CRUD operations for Labels
export const addLabel = (data: AppData, item: Omit<LabelMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: LabelMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, labels: [...data.labels, newItem] };
    saveData(newData);
    return newData;
};

export const updateLabel = (data: AppData, id: string, item: Partial<LabelMaster>): AppData => {
    const newData = {
        ...data,
        labels: data.labels.map(l => l.id === id ? { ...l, ...item, updatedAt: new Date() } : l)
    };
    saveData(newData);
    return newData;
};

export const deleteLabel = (data: AppData, id: string): AppData => {
    const newData = { ...data, labels: data.labels.filter(l => l.id !== id) };
    saveData(newData);
    return newData;
};

// CRUD operations for Part Codes
export const addPartCode = (data: AppData, item: Omit<PartCodeMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: PartCodeMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, partCodes: [...data.partCodes, newItem] };
    saveData(newData);
    return newData;
};

export const updatePartCode = (data: AppData, id: string, item: Partial<PartCodeMaster>): AppData => {
    const newData = {
        ...data,
        partCodes: data.partCodes.map(pc => pc.id === id ? { ...pc, ...item, updatedAt: new Date() } : pc)
    };
    saveData(newData);
    return newData;
};

export const deletePartCode = (data: AppData, id: string): AppData => {
    const newData = { ...data, partCodes: data.partCodes.filter(pc => pc.id !== id) };
    saveData(newData);
    return newData;
};

// CRUD operations for Models
export const addModel = (data: AppData, item: Omit<ModelMaster, 'id' | 'createdAt' | 'updatedAt'>): AppData => {
    const newItem: ModelMaster = {
        ...item,
        id: generateId(),
        createdAt: new Date(),
        updatedAt: new Date()
    };
    const newData = { ...data, models: [...data.models, newItem] };
    saveData(newData);
    return newData;
};

export const updateModel = (data: AppData, id: string, item: Partial<ModelMaster>): AppData => {
    const newData = {
        ...data,
        models: data.models.map(m => m.id === id ? { ...m, ...item, updatedAt: new Date() } : m)
    };
    saveData(newData);
    return newData;
};

export const deleteModel = (data: AppData, id: string): AppData => {
    const newData = { ...data, models: data.models.filter(m => m.id !== id) };
    saveData(newData);
    return newData;
};

// Testing Screen Data operations
export const updateTestingData = (data: AppData, testingData: Partial<TestingScreenData>): AppData => {
    const newTestingData = data.testingData
        ? { ...data.testingData, ...testingData, updatedAt: new Date() }
        : { ...defaultTestingData, ...testingData, updatedAt: new Date() };
    const newData = { ...data, testingData: newTestingData };
    saveData(newData);
    return newData;
};

export const resetTestingData = (data: AppData): AppData => {
    const newData = { ...data, testingData: { ...defaultTestingData, id: generateId() } };
    saveData(newData);
    return newData;
};

// Email validation
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
