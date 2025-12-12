using System;
using System.Collections.ObjectModel;
using System.Windows;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels.Masters
{
    public partial class VAMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;

        public ObservableCollection<VAMaster> VAs { get; }

        private VAMaster? _selectedVA;
        public VAMaster? SelectedVA
        {
            get => _selectedVA;
            set => SetProperty(ref _selectedVA, value);
        }

        private string _vaName = string.Empty;
        public string VAName
        {
            get => _vaName;
            set => SetProperty(ref _vaName, value);
        }

        private bool _isEditMode;
        public bool IsEditMode
        {
            get => _isEditMode;
            set => SetProperty(ref _isEditMode, value);
        }

        public VAMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            VAs = _dataService.GetAllVAs();
        }

        [RelayCommand]
        private void Add()
        {
            if (string.IsNullOrWhiteSpace(VAName))
            {
                MessageBox.Show("VA Name is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var newVA = new VAMaster { VAName = VAName };
            _dataService.AddVA(newVA);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("VA added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedVA == null)
            {
                MessageBox.Show("Please select a VA to edit.", "Selection Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }
            VAName = SelectedVA.VAName;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedVA == null || string.IsNullOrWhiteSpace(VAName)) return;

            SelectedVA.VAName = VAName;
            _dataService.UpdateVA(SelectedVA);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("VA updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedVA == null) return;
            
            if (MessageBox.Show($"Delete '{SelectedVA.VAName}'?", "Confirm", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                _dataService.DeleteVA(SelectedVA.Id);
                _dataService.SaveToJson();
                SelectedVA = null;
            }
        }

        [RelayCommand]
        private void Cancel() => ClearForm();

        private void ClearForm()
        {
            VAName = string.Empty;
            IsEditMode = false;
            SelectedVA = null;
        }
    }
}
