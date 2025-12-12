using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using ERPTestingApp.Models.Masters;

namespace ERPTestingApp.Services
{
    /// <summary>
    /// Interface for data management operations across all masters
    /// </summary>
    public interface IDataService
    {
        // Class Master
        ObservableCollection<ClassMaster> GetAllClasses();
        ClassMaster? GetClassById(Guid id);
        void AddClass(ClassMaster classMaster);
        void UpdateClass(ClassMaster classMaster);
        void DeleteClass(Guid id);

        // VA Master
        ObservableCollection<VAMaster> GetAllVAs();
        VAMaster? GetVAById(Guid id);
        void AddVA(VAMaster vaMaster);
        void UpdateVA(VAMaster vaMaster);
        void DeleteVA(Guid id);

        // IEC Standard Master
        ObservableCollection<IECStandardMaster> GetAllIECStandards();
        IECStandardMaster? GetIECStandardById(Guid id);
        void AddIECStandard(IECStandardMaster iecStandard);
        void UpdateIECStandard(IECStandardMaster iecStandard);
        void DeleteIECStandard(Guid id);

        // Party Master
        ObservableCollection<PartyMaster> GetAllParties();
        PartyMaster? GetPartyById(Guid id);
        void AddParty(PartyMaster party);
        void UpdateParty(PartyMaster party);
        void DeleteParty(Guid id);

        // Label Master
        ObservableCollection<LabelMaster> GetAllLabels();
        LabelMaster? GetLabelById(Guid id);
        void AddLabel(LabelMaster label);
        void UpdateLabel(LabelMaster label);
        void DeleteLabel(Guid id);

        // Part Code Master
        ObservableCollection<PartCodeMaster> GetAllPartCodes();
        PartCodeMaster? GetPartCodeById(Guid id);
        void AddPartCode(PartCodeMaster partCode);
        void UpdatePartCode(PartCodeMaster partCode);
        void DeletePartCode(Guid id);

        // Model Master
        ObservableCollection<ModelMaster> GetAllModels();
        ModelMaster? GetModelById(Guid id);
        void AddModel(ModelMaster model);
        void UpdateModel(ModelMaster model);
        void DeleteModel(Guid id);

        // Persistence
        void SaveToJson();
        void LoadFromJson();
    }
}
