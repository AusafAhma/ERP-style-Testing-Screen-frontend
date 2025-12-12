using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using System.Text.RegularExpressions;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels.Masters
{
    /// <summary>
    /// ViewModel for Party Master CRUD operations
    /// </summary>
    public partial class PartyMasterViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;
        private static readonly Regex EmailRegex = new(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");

        public ObservableCollection<PartyMaster> Parties { get; }

        private PartyMaster? _selectedParty;
        public PartyMaster? SelectedParty
        {
            get => _selectedParty;
            set => SetProperty(ref _selectedParty, value);
        }

        private string _partyName = string.Empty;
        public string PartyName
        {
            get => _partyName;
            set => SetProperty(ref _partyName, value);
        }

        private string _contactPerson = string.Empty;
        public string ContactPerson
        {
            get => _contactPerson;
            set => SetProperty(ref _contactPerson, value);
        }

        private string _email = string.Empty;
        public string Email
        {
            get => _email;
            set => SetProperty(ref _email, value);
        }

        private string _address = string.Empty;
        public string Address
        {
            get => _address;
            set => SetProperty(ref _address, value);
        }

        private bool _isEditMode;
        public bool IsEditMode
        {
            get => _isEditMode;
            set => SetProperty(ref _isEditMode, value);
        }

        public PartyMasterViewModel(IDataService dataService)
        {
            _dataService = dataService;
            Parties = _dataService.GetAllParties();
        }

        private bool ValidateForm()
        {
            if (string.IsNullOrWhiteSpace(PartyName))
            {
                MessageBox.Show("Party Name is required.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            if (!string.IsNullOrWhiteSpace(Email) && !EmailRegex.IsMatch(Email))
            {
                MessageBox.Show("Please enter a valid email address.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            return true;
        }

        [RelayCommand]
        private void Add()
        {
            if (!ValidateForm()) return;

            var newParty = new PartyMaster
            {
                PartyName = PartyName,
                ContactPerson = ContactPerson,
                Email = Email,
                Address = Address
            };

            _dataService.AddParty(newParty);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Party added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Edit()
        {
            if (SelectedParty == null)
            {
                MessageBox.Show("Please select a party to edit.", "Selection Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            PartyName = SelectedParty.PartyName;
            ContactPerson = SelectedParty.ContactPerson;
            Email = SelectedParty.Email;
            Address = SelectedParty.Address;
            IsEditMode = true;
        }

        [RelayCommand]
        private void Update()
        {
            if (SelectedParty == null || !ValidateForm()) return;

            SelectedParty.PartyName = PartyName;
            SelectedParty.ContactPerson = ContactPerson;
            SelectedParty.Email = Email;
            SelectedParty.Address = Address;

            _dataService.UpdateParty(SelectedParty);
            _dataService.SaveToJson();
            ClearForm();
            MessageBox.Show("Party updated successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void Delete()
        {
            if (SelectedParty == null)
            {
                MessageBox.Show("Please select a party to delete.", "Selection Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var result = MessageBox.Show(
                $"Are you sure you want to delete '{SelectedParty.PartyName}'?",
                "Confirm Delete",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                _dataService.DeleteParty(SelectedParty.Id);
                _dataService.SaveToJson();
                SelectedParty = null;
                MessageBox.Show("Party deleted successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
            }
        }

        [RelayCommand]
        private void Cancel()
        {
            ClearForm();
        }

        private void ClearForm()
        {
            PartyName = string.Empty;
            ContactPerson = string.Empty;
            Email = string.Empty;
            Address = string.Empty;
            IsEditMode = false;
            SelectedParty = null;
        }
    }
}
