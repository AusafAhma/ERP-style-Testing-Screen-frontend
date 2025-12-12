// Data Models - TypeScript interfaces matching WPF models

// Enums as const objects for compatibility
export const LabelType = {
  Square: 'Square',
  Rect: 'Rect'
} as const;
export type LabelType = typeof LabelType[keyof typeof LabelType];

export const Phase = {
  Phase1: '1 Phase',
  Phase3: '3 Phase'
} as const;
export type Phase = typeof Phase[keyof typeof Phase];

// Master Models
export interface ClassMaster {
  id: string;
  className: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VAMaster {
  id: string;
  vaValue: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IECStandardMaster {
  id: string;
  iecStandard: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartyMaster {
  id: string;
  partyName: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LabelMaster {
  id: string;
  labelName: string;
  labelType: LabelType;
  filePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PartCodeMaster {
  id: string;
  partCode: string;
  description: string;
  classId: string;
  vaId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ModelMaster {
  id: string;
  modelName: string;
  description: string;
  classId: string;
  vaId: string;
  phase: Phase;
  createdAt: Date;
  updatedAt: Date;
}

// Testing Screen Models
export interface TestingGridRow {
  id: string;
  srNo: number;
  bdPercent: number;
  priVolPercent: number;
  excitationPercent: number;
  ratioErrorPercent: number;
  phaseErrorMin: number;
  classValue: string;
  status: string;
}

export interface TestingScreenData {
  id: string;
  portName: string;
  amber: string;
  ctPt: string;
  partCodeId: string;
  company: string;
  phase: Phase;
  ratio: string;
  jobcardNo: string;
  sec: string;
  points: number;
  set: number;
  // quantity is computed: points * set
  poNo: string;
  invoiceNo: string;
  serialNo: string;
  jcQty: number;
  partialQty: number;
  iecStandardId: string;
  modelId: string;
  fs: string;
  revisionNo: string;
  revisionDate: Date;
  prefixEnabled: boolean;
  prefixText: string;
  autoPrinting: boolean;
  vf: string;
  hsv: string;
  kv: string;
  il: string;
  gridRows: TestingGridRow[];
  createdAt: Date;
  updatedAt: Date;
}

// App Data Store
export interface AppData {
  classes: ClassMaster[];
  vas: VAMaster[];
  iecStandards: IECStandardMaster[];
  parties: PartyMaster[];
  labels: LabelMaster[];
  partCodes: PartCodeMaster[];
  models: ModelMaster[];
  testingData: TestingScreenData | null;
}
