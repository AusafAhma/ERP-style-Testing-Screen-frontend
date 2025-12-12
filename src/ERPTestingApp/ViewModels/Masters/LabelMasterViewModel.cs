using System;
using System.Collections.ObjectModel;
using System.Windows;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Models.Enums;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;
using System.Linq;

namespace ERPTestingApp.ViewModels.Masters
{
    public partial class LabelMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;

        public ObservableCollection<LabelMaster> Labels { get; }
        public ObservableCollection<LabelType> LabelTypes { get; }

        private LabelMaster? _selectedLabel;
        public LabelMaster? SelectedLabel
        {
            get => _selectedLabel;
            set => SetProperty(ref _selectedLabel, value);
        }

        private LabelType _labelType;
        public LabelType SelectedLabelType
        {
            get => _labelType;
            set => SetProperty(ref _labelType, value);
        }

        private string _labelLink = string.Empty;
        public string LabelLink
        {
            get => _labelLink;
            set => SetProperty(ref _labelLink, value);
        }

        private bool _isEditMode;
        public bool IsEditMode
        {
            get => _isEditMode;
            set => SetProperty(ref _isEditMode, value);
        }

        public LabelMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            Labels = _dataService.GetAllLabels();
            LabelTypes = new ObservableCollection<LabelType>(Enum.GetValues(typeof(LabelType)).Cast<LabelType>());
        }

        [RelayCommand]
        private void Add()
        {
            var newLabel = new LabelMaster { LabelType = SelectedLabelType, LabelLink = LabelLink };
            _dataService.AddLabel(newLabel);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Label added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedLabel == null) return;
            SelectedLabelType = SelectedLabel.LabelType;
            LabelLink = SelectedLabel.LabelLink;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedLabel == null) return;
            SelectedLabel.LabelType = SelectedLabelType;
            SelectedLabel.LabelLink = LabelLink;
            _dataService.UpdateLabel(SelectedLabel);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Label updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedLabel == null) return;
            if (MessageBox.Show("Delete this label?", "Confirm", MessageBoxButton.YesNo) == MessageBoxResult.Yes)
            {
                _dataService.DeleteLabel(SelectedLabel.Id);
                _dataService.SaveToJson();
                SelectedLabel = null;
            }
        }

        [RelayCommand]
        private void Cancel() => ClearForm();

        private void ClearForm()
        {
            SelectedLabelType = LabelType.Square;
            LabelLink = string.Empty;
            IsEditMode = false;
            SelectedLabel = null;
        }
    }
}
