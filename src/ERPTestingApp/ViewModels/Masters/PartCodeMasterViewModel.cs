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
    public partial class PartCodeMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;

        public ObservableCollection<PartCodeMaster> PartCodes { get; }
        public ObservableCollection<ClassMaster> Classes { get; }
        public ObservableCollection<VAMaster> VAs { get; }
        public ObservableCollection<LabelType> LabelTypes { get; }

        private PartCodeMaster? _selectedPartCode;
        public PartCodeMaster? SelectedPartCode
        {
            get => _selectedPartCode;
            set => SetProperty(ref _selectedPartCode, value);
        }

        // Form Fields
        private string _partCode = string.Empty;
        public string PartCode { get => _partCode; set => SetProperty(ref _partCode, value); }

        private string _itemDescription = string.Empty;
        public string ItemDescription { get => _itemDescription; set => SetProperty(ref _itemDescription, value); }

        private decimal _ratio;
        public decimal Ratio { get => _ratio; set => SetProperty(ref _ratio, value); }

        private Guid? _selectedClassId;
        public Guid? SelectedClassId { get => _selectedClassId; set => SetProperty(ref _selectedClassId, value); }

        private Guid? _selectedVAId;
        public Guid? SelectedVAId { get => _selectedVAId; set => SetProperty(ref _selectedVAId, value); }

        private LabelType _selectedLabelType;
        public LabelType SelectedLabelType { get => _selectedLabelType; set => SetProperty(ref _selectedLabelType, value); }

        private bool _isEditMode;
        public bool IsEditMode { get => _isEditMode; set => SetProperty(ref _isEditMode, value); }

        public PartCodeMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            PartCodes = _dataService.GetAllPartCodes();
            Classes = _dataService.GetAllClasses();
            VAs = _dataService.GetAllVAs();
            LabelTypes = new ObservableCollection<LabelType>(Enum.GetValues(typeof(LabelType)).Cast<LabelType>());
        }

        [RelayCommand]
        private void Add()
        {
            if (string.IsNullOrWhiteSpace(PartCode))
            {
                MessageBox.Show("Part Code is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var newPartCode = new PartCodeMaster 
            {
                PartCode = PartCode,
                ItemDescription = ItemDescription,
                Ratio = Ratio,
                ClassId = SelectedClassId,
                VAId = SelectedVAId,
                LabelType = SelectedLabelType
            };
            _dataService.AddPartCode(newPartCode);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Part Code added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedPartCode == null) return;
            PartCode = SelectedPartCode.PartCode;
            ItemDescription = SelectedPartCode.ItemDescription;
            Ratio = SelectedPartCode.Ratio;
            SelectedClassId = SelectedPartCode.ClassId;
            SelectedVAId = SelectedPartCode.VAId;
            SelectedLabelType = SelectedPartCode.LabelType;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedPartCode == null || string.IsNullOrWhiteSpace(PartCode)) return;

            SelectedPartCode.PartCode = PartCode;
            SelectedPartCode.ItemDescription = ItemDescription;
            SelectedPartCode.Ratio = Ratio;
            SelectedPartCode.ClassId = SelectedClassId;
            SelectedPartCode.VAId = SelectedVAId;
            SelectedPartCode.LabelType = SelectedLabelType;

            _dataService.UpdatePartCode(SelectedPartCode);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Part Code updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedPartCode == null) return;
            if (MessageBox.Show($"Delete '{SelectedPartCode.PartCode}'?", "Confirm", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                _dataService.DeletePartCode(SelectedPartCode.Id);
                _dataService.SaveToJson();
                SelectedPartCode = null;
            }
        }

        [RelayCommand]
        private void Cancel() => ClearForm();

        private void ClearForm()
        {
            PartCode = string.Empty;
            ItemDescription = string.Empty;
            Ratio = 0;
            SelectedClassId = null;
            SelectedVAId = null;
            SelectedLabelType = LabelType.Square;
            IsEditMode = false;
            SelectedPartCode = null;
        }
    }
}
