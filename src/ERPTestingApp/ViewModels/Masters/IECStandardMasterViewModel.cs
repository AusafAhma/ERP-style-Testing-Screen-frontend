using System;
using System.Collections.ObjectModel;
using System.Windows;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels.Masters
{
    public partial class IECStandardMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;

        public ObservableCollection<IECStandardMaster> IECStandards { get; }

        private IECStandardMaster? _selectedStandard;
        public IECStandardMaster? SelectedStandard
        {
            get => _selectedStandard;
            set => SetProperty(ref _selectedStandard, value);
        }

        private string _standardName = string.Empty;
        public string StandardName
        {
            get => _standardName;
            set => SetProperty(ref _standardName, value);
        }

        private bool _isEditMode;
        public bool IsEditMode
        {
            get => _isEditMode;
            set => SetProperty(ref _isEditMode, value);
        }

        public IECStandardMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            IECStandards = _dataService.GetAllIECStandards();
        }

        [RelayCommand]
        private void Add()
        {
            if (string.IsNullOrWhiteSpace(StandardName))
            {
                MessageBox.Show("Standard Name is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var newStandard = new IECStandardMaster { IECStandard = StandardName };
            _dataService.AddIECStandard(newStandard);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("IEC Standard added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedStandard == null) return;
            StandardName = SelectedStandard.IECStandard;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedStandard == null || string.IsNullOrWhiteSpace(StandardName)) return;

            SelectedStandard.IECStandard = StandardName;
            _dataService.UpdateIECStandard(SelectedStandard);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedStandard == null) return;
            if (MessageBox.Show($"Delete '{SelectedStandard.IECStandard}'?", "Confirm", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                _dataService.DeleteIECStandard(SelectedStandard.Id);
                _dataService.SaveToJson();
                SelectedStandard = null;
            }
        }

        [RelayCommand]
        private void Cancel() => ClearForm();

        private void ClearForm()
        {
            StandardName = string.Empty;
            IsEditMode = false;
            SelectedStandard = null;
        }
    }
}
