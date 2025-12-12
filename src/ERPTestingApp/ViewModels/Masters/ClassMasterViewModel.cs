using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels.Masters
{
    /// <summary>
    /// ViewModel for Class Master CRUD operations
    /// </summary>
    public partial class ClassMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;

        public ObservableCollection<ClassMaster> Classes { get; }

        private ClassMaster? _selectedClass;
        public ClassMaster? SelectedClass
        {
            get => _selectedClass;
            set => SetProperty(ref _selectedClass, value);
        }

        private string _className = string.Empty;
        public string ClassName
        {
            get => _className;
            set => SetProperty(ref _className, value);
        }

        private bool _isEditMode;
        public bool IsEditMode
        {
            get => _isEditMode;
            set => SetProperty(ref _isEditMode, value);
        }

        public ClassMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            Classes = _dataService.GetAllClasses();
        }

        [RelayCommand]
        private void Add()
        {
            if (string.IsNullOrWhiteSpace(ClassName))
            {
                MessageBox.Show("Class Name is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var newClass = new ClassMaster { ClassName = ClassName };
            _dataService.AddClass(newClass);
            _dataService.SaveToJson();

            // Clear form
            ClassName = string.Empty;
            MessageBox.Show("Class added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedClass == null)
            {
                MessageBox.Show("Please select a class to edit.", "Selection Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            ClassName = SelectedClass.ClassName;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedClass == null || string.IsNullOrWhiteSpace(ClassName))
            {
                MessageBox.Show("Class Name is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            SelectedClass.ClassName = ClassName;
            _dataService.UpdateClass(SelectedClass);
            _dataService.SaveToJson();

            // Clear form
            ClassName = string.Empty;
            IsEditMode = false;
            SelectedClass = null;
            MessageBox.Show("Class updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedClass == null)
            {
                MessageBox.Show("Please select a class to delete.", "Selection Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var result = MessageBox.Show(
                $"Are you sure you want to delete '{SelectedClass.ClassName}'?",
                "Confirm Delete",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                _dataService.DeleteClass(SelectedClass.Id);
                _dataService.SaveToJson();
                SelectedClass = null;
                MessageBox.Show("Class deleted successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        [RelayCommand]
        private void Cancel()
        {
            ClassName = string.Empty;
            IsEditMode = false;
            SelectedClass = null;
        }
    }
}
