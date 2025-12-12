using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.IO;
using System.Linq;
using System.Text.Json;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Models.Enums;

namespace ERPTestingApp.Services
{
    /// <summary>
    /// In-memory data service with optional JSON persistence
    /// </summary>
    public class DataService : IDataService
    {
        private readonly ObservableCollection<ClassMaster> _classes = new();
        private readonly ObservableCollection<VAMaster> _vas = new();
        private readonly ObservableCollection<IECStandardMaster> _iecStandards = new();
        private readonly ObservableCollection<PartyMaster> _parties = new();
        private readonly ObservableCollection<LabelMaster> _labels = new();
        private readonly ObservableCollection<PartCodeMaster> _partCodes = new();
        private readonly ObservableCollection<ModelMaster> _models = new();

        private readonly string _dataPath;

        public DataService()
        {
            // Set data path in local app data
            var appDataPath = Path.Combine(
                Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData),
                "ERPTestingApp"
            );
            Directory.CreateDirectory(appDataPath);
            _dataPath = Path.Combine(appDataPath, "data.json");

            // Load existing data or initialize seed data
            if (File.Exists(_dataPath))
            {
                LoadFromJson();
            }
            else
            {
                InitializeSeedData();
            }
        }

        #region Class Master
        public ObservableCollection<ClassMaster> GetAllClasses() => _classes;
        public ClassMaster? GetClassById(Guid id) => _classes.FirstOrDefault(c => c.Id == id);
        public void AddClass(ClassMaster classMaster) => _classes.Add(classMaster);
        public void UpdateClass(ClassMaster classMaster)
        {
            var existing = GetClassById(classMaster.Id);
            if (existing != null)
            {
                var index = _classes.IndexOf(existing);
                _classes[index] = classMaster;
            }
        }
        public void DeleteClass(Guid id)
        {
            var item = GetClassById(id);
            if (item != null) _classes.Remove(item);
        }
        #endregion

        #region VA Master
        public ObservableCollection<VAMaster> GetAllVAs() => _vas;
        public VAMaster? GetVAById(Guid id) => _vas.FirstOrDefault(v => v.Id == id);
        public void AddVA(VAMaster vaMaster) => _vas.Add(vaMaster);
        public void UpdateVA(VAMaster vaMaster)
        {
            var existing = GetVAById(vaMaster.Id);
            if (existing != null)
            {
                var index = _vas.IndexOf(existing);
                _vas[index] = vaMaster;
            }
        }
        public void DeleteVA(Guid id)
        {
            var item = GetVAById(id);
            if (item != null) _vas.Remove(item);
        }
        #endregion

        #region IEC Standard Master
        public ObservableCollection<IECStandardMaster> GetAllIECStandards() => _iecStandards;
        public IECStandardMaster? GetIECStandardById(Guid id) => _iecStandards.FirstOrDefault(i => i.Id == id);
        public void AddIECStandard(IECStandardMaster iecStandard) => _iecStandards.Add(iecStandard);
        public void UpdateIECStandard(IECStandardMaster iecStandard)
        {
            var existing = GetIECStandardById(iecStandard.Id);
            if (existing != null)
            {
                var index = _iecStandards.IndexOf(existing);
                _iecStandards[index] = iecStandard;
            }
        }
        public void DeleteIECStandard(Guid id)
        {
            var item = GetIECStandardById(id);
            if (item != null) _iecStandards.Remove(item);
        }
        #endregion

        #region Party Master
        public ObservableCollection<PartyMaster> GetAllParties() => _parties;
        public PartyMaster? GetPartyById(Guid id) => _parties.FirstOrDefault(p => p.Id == id);
        public void AddParty(PartyMaster party) => _parties.Add(party);
        public void UpdateParty(PartyMaster party)
        {
            var existing = GetPartyById(party.Id);
            if (existing != null)
            {
                var index = _parties.IndexOf(existing);
                _parties[index] = party;
            }
        }
        public void DeleteParty(Guid id)
        {
            var item = GetPartyById(id);
            if (item != null) _parties.Remove(item);
        }
        #endregion

        #region Label Master
        public ObservableCollection<LabelMaster> GetAllLabels() => _labels;
        public LabelMaster? GetLabelById(Guid id) => _labels.FirstOrDefault(l => l.Id == id);
        public void AddLabel(LabelMaster label) => _labels.Add(label);
        public void UpdateLabel(LabelMaster label)
        {
            var existing = GetLabelById(label.Id);
            if (existing != null)
            {
                var index = _labels.IndexOf(existing);
                _labels[index] = label;
            }
        }
        public void DeleteLabel(Guid id)
        {
            var item = GetLabelById(id);
            if (item != null) _labels.Remove(item);
        }
        #endregion

        #region Part Code Master
        public ObservableCollection<PartCodeMaster> GetAllPartCodes() => _partCodes;
        public PartCodeMaster? GetPartCodeById(Guid id) => _partCodes.FirstOrDefault(p => p.Id == id);
        public void AddPartCode(PartCodeMaster partCode)
        {
            // Populate navigation properties
            if (partCode.ClassId.HasValue)
            {
                var classItem = GetClassById(partCode.ClassId.Value);
                partCode.ClassName = classItem?.ClassName;
            }
            if (partCode.VAId.HasValue)
            {
                var vaItem = GetVAById(partCode.VAId.Value);
                partCode.VAName = vaItem?.VAName;
            }
            _partCodes.Add(partCode);
        }
        public void UpdatePartCode(PartCodeMaster partCode)
        {
            var existing = GetPartCodeById(partCode.Id);
            if (existing != null)
            {
                // Populate navigation properties
                if (partCode.ClassId.HasValue)
                {
                    var classItem = GetClassById(partCode.ClassId.Value);
                    partCode.ClassName = classItem?.ClassName;
                }
                if (partCode.VAId.HasValue)
                {
                    var vaItem = GetVAById(partCode.VAId.Value);
                    partCode.VAName = vaItem?.VAName;
                }
                var index = _partCodes.IndexOf(existing);
                _partCodes[index] = partCode;
            }
        }
        public void DeletePartCode(Guid id)
        {
            var item = GetPartCodeById(id);
            if (item != null) _partCodes.Remove(item);
        }
        #endregion

        #region Model Master
        public ObservableCollection<ModelMaster> GetAllModels() => _models;
        public ModelMaster? GetModelById(Guid id) => _models.FirstOrDefault(m => m.Id == id);
        public void AddModel(ModelMaster model)
        {
            // Populate navigation properties
            if (model.ClassId.HasValue)
            {
                var classItem = GetClassById(model.ClassId.Value);
                model.ClassName = classItem?.ClassName;
            }
            if (model.VAId.HasValue)
            {
                var vaItem = GetVAById(model.VAId.Value);
                model.VAName = vaItem?.VAName;
            }
            _models.Add(model);
        }
        public void UpdateModel(ModelMaster model)
        {
            var existing = GetModelById(model.Id);
            if (existing != null)
            {
                // Populate navigation properties
                if (model.ClassId.HasValue)
                {
                    var classItem = GetClassById(model.ClassId.Value);
                    model.ClassName = classItem?.ClassName;
                }
                if (model.VAId.HasValue)
                {
                    var vaItem = GetVAById(model.VAId.Value);
                    model.VAName = vaItem?.VAName;
                }
                var index = _models.IndexOf(existing);
                _models[index] = model;
            }
        }
        public void DeleteModel(Guid id)
        {
            var item = GetModelById(id);
            if (item != null) _models.Remove(item);
        }
        #endregion

        #region Seed Data
        private void InitializeSeedData()
        {
            // Class Master
            _classes.Add(new ClassMaster { ClassName = "Class 0.2" });
            _classes.Add(new ClassMaster { ClassName = "Class 0.5" });
            _classes.Add(new ClassMaster { ClassName = "Class 1.0" });
            _classes.Add(new ClassMaster { ClassName = "Class 3.0" });
            _classes.Add(new ClassMaster { ClassName = "Class 5.0" });

            // VA Master
            _vas.Add(new VAMaster { VAName = "5 VA" });
            _vas.Add(new VAMaster { VAName = "10 VA" });
            _vas.Add(new VAMaster { VAName = "15 VA" });
            _vas.Add(new VAMaster { VAName = "30 VA" });
            _vas.Add(new VAMaster { VAName = "50 VA" });

            // IEC Standard Master
            _iecStandards.Add(new IECStandardMaster { IECStandard = "IEC 60044-1" });
            _iecStandards.Add(new IECStandardMaster { IECStandard = "IEC 61869-2" });
            _iecStandards.Add(new IECStandardMaster { IECStandard = "IEC 60076" });

            // Party Master
            _parties.Add(new PartyMaster
            {
                PartyName = "ABC Electronics Ltd",
                ContactPerson = "John Smith",
                Email = "john.smith@abcelectronics.com",
                Address = "123 Industrial Area, Mumbai"
            });
            _parties.Add(new PartyMaster
            {
                PartyName = "XYZ Transformers",
                ContactPerson = "Sarah Johnson",
                Email = "sarah@xyztransformers.com",
                Address = "456 Power Street, Delhi"
            });
            _parties.Add(new PartyMaster
            {
                PartyName = "Global Power Systems",
                ContactPerson = "Michael Brown",
                Email = "michael.brown@globalpowersystems.com",
                Address = "789 Grid Road, Bangalore"
            });

            // Label Master
            _labels.Add(new LabelMaster { LabelType = LabelType.Square, LabelLink = "templates/square_label.pdf" });
            _labels.Add(new LabelMaster { LabelType = LabelType.Rect, LabelLink = "templates/rect_label.pdf" });

            // Part Code Master (with references)
            var class1 = _classes[0];
            var va1 = _vas[0];
            _partCodes.Add(new PartCodeMaster
            {
                PartCode = "PT-001",
                ItemDescription = "Potential Transformer 11kV",
                Ratio = 11000,
                ClassId = class1.Id,
                VAId = va1.Id,
                LabelType = LabelType.Square,
                ClassName = class1.ClassName,
                VAName = va1.VAName
            });

            // Model Master (with references)
            _models.Add(new ModelMaster
            {
                ModelName = "PT-11kV-S1",
                Ratio = 11000,
                ClassId = class1.Id,
                VAId = va1.Id,
                Phase = Phase.OnePhase,
                ClassName = class1.ClassName,
                VAName = va1.VAName
            });
        }
        #endregion

        #region Persistence
        public void SaveToJson()
        {
            try
            {
                var data = new
                {
                    Classes = _classes.ToList(),
                    VAs = _vas.ToList(),
                    IECStandards = _iecStandards.ToList(),
                    Parties = _parties.ToList(),
                    Labels = _labels.ToList(),
                    PartCodes = _partCodes.ToList(),
                    Models = _models.ToList()
                };

                var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
                File.WriteAllText(_dataPath, json);
            }
            catch (Exception ex)
            {
                // Log error (in production, use proper logging)
                Console.WriteLine($"Error saving data: {ex.Message}");
            }
        }

        public void LoadFromJson()
        {
            try
            {
                var json = File.ReadAllText(_dataPath);
                var data = JsonSerializer.Deserialize<JsonElement>(json);

                // Load Classes
                if (data.TryGetProperty("Classes", out var classes))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<ClassMaster>>(classes.GetRawText()) ?? new())
                        _classes.Add(item);
                }

                // Load VAs
                if (data.TryGetProperty("VAs", out var vas))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<VAMaster>>(vas.GetRawText()) ?? new())
                        _vas.Add(item);
                }

                // Load IEC Standards
                if (data.TryGetProperty("IECStandards", out var iecStandards))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<IECStandardMaster>>(iecStandards.GetRawText()) ?? new())
                        _iecStandards.Add(item);
                }

                // Load Parties
                if (data.TryGetProperty("Parties", out var parties))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<PartyMaster>>(parties.GetRawText()) ?? new())
                        _parties.Add(item);
                }

                // Load Labels
                if (data.TryGetProperty("Labels", out var labels))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<LabelMaster>>(labels.GetRawText()) ?? new())
                        _labels.Add(item);
                }

                // Load Part Codes
                if (data.TryGetProperty("PartCodes", out var partCodes))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<PartCodeMaster>>(partCodes.GetRawText()) ?? new())
                        _partCodes.Add(item);
                }

                // Load Models
                if (data.TryGetProperty("Models", out var models))
                {
                    foreach (var item in JsonSerializer.Deserialize<List<ModelMaster>>(models.GetRawText()) ?? new())
                        _models.Add(item);
                }
            }
            catch (Exception ex)
            {
                // Log error and initialize seed data
                Console.WriteLine($"Error loading data: {ex.Message}");
                InitializeSeedData();
            }
        }
        #endregion
    }
}
