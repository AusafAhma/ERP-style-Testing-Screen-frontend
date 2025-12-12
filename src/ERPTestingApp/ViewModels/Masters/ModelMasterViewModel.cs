using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Models.Enums;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels.Masters
{
    public partial class ModelMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;

        public ObservableCollection<ModelMaster> Models { get; }
        public ObservableCollection<ClassMaster> Classes { get; }
        public ObservableCollection<VAMaster> VAs { get; }
        public ObservableCollection<Phase> Phases { get; }

        private ModelMaster? _selectedModel;
        public ModelMaster? SelectedModel
        {
            get => _selectedModel;
            set => SetProperty(ref _selectedModel, value);
        }

        private string _modelName = string.Empty;
        public string ModelName { get => _modelName; set => SetProperty(ref _modelName, value); }

        private decimal _ratio;
        public decimal Ratio { get => _ratio; set => SetProperty(ref _ratio, value); }

        private Guid? _selectedClassId;
        public Guid? SelectedClassId { get => _selectedClassId; set => SetProperty(ref _selectedClassId, value); }

        private Guid? _selectedVAId;
        public Guid? SelectedVAId { get => _selectedVAId; set => SetProperty(ref _selectedVAId, value); }

        private Phase _selectedPhase;
        public Phase SelectedPhase { get => _selectedPhase; set => SetProperty(ref _selectedPhase, value); }

        private bool _isEditMode;
        public bool IsEditMode { get => _isEditMode; set => SetProperty(ref _isEditMode, value); }

        public ModelMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            Models = _dataService.GetAllModels();
            Classes = _dataService.GetAllClasses();
            VAs = _dataService.GetAllVAs();
            Phases = new ObservableCollection<Phase>(Enum.GetValues(typeof(Phase)).Cast<Phase>());
        }

        [RelayCommand]
        private void Add()
        {
            if (string.IsNullOrWhiteSpace(ModelName))
            {
                MessageBox.Show("Model Name is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var newModel = new ModelMaster
            {
                ModelName = ModelName,
                Ratio = Ratio,
                ClassId = SelectedClassId,
                VAId = SelectedVAId,
                Phase = SelectedPhase
            };
            _dataService.AddModel(newModel);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Model added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedModel == null) return;
            ModelName = SelectedModel.ModelName;
            Ratio = SelectedModel.Ratio;
            SelectedClassId = SelectedModel.ClassId;
            SelectedVAId = SelectedModel.VAId;
            SelectedPhase = SelectedModel.Phase;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedModel == null || string.IsNullOrWhiteSpace(ModelName)) return;

            SelectedModel.ModelName = ModelName;
            SelectedModel.Ratio = Ratio;
            SelectedModel.ClassId = SelectedClassId;
            SelectedModel.VAId = SelectedVAId;
            SelectedModel.Phase = SelectedPhase;

            _dataService.UpdateModel(SelectedModel);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Model updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedModel == null) return;
            if (MessageBox.Show($"Delete '{SelectedModel.ModelName}'?", "Confirm", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                _dataService.DeleteModel(SelectedModel.Id);
                _dataService.SaveToJson();
                SelectedModel = null;
            }
        }

        [RelayCommand]
        private void Cancel() => ClearForm();

        private void ClearForm()
        {
            ModelName = string.Empty;
            Ratio = 0;
            SelectedClassId = null;
            SelectedVAId = null;
            SelectedPhase = Phase.OnePhase;
            IsEditMode = false;
            SelectedModel = null;
        }
    }
}
