using System;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows;
using Microsoft.Win32;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Models;
using ERPTestingApp.Models.Masters;
using ERPTestingApp.Models.Enums;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels
{
    /// <summary>
    /// ViewModel for the Testing Screen with auto-calculation logic
    /// </summary>
    public partial class TestingScreenViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;
        private readonly IExportService _exportService;

        public TestingScreenData TestingData { get; }
        public ObservableCollection<PartCodeMaster> PartCodes { get; }
        public ObservableCollection<PartyMaster> Parties { get; }
        public ObservableCollection<IECStandardMaster> IECStandards { get; }
        public ObservableCollection<ModelMaster> Models { get; }
        public ObservableCollection<string> PhaseOptions { get; } = new() { "1 Phase", "3 Phase" };

        public TestingScreenViewModel(IDataService dataService, IExportService exportService)
        {
            _dataService = dataService;
            _exportService = exportService;

            TestingData = new TestingScreenData();

            // Load master data for combo boxes
            PartCodes = _dataService.GetAllPartCodes();
            Parties = _dataService.GetAllParties();
            IECStandards = _dataService.GetAllIECStandards();
            Models = _dataService.GetAllModels();

            // Add sample grid rows for demo
            AddSampleGridRows();
        }

        private void AddSampleGridRows()
        {
            TestingData.GridRows.Add(new TestingGridRow
            {
                SrNo = 1,
                BdPercent = 100.5m,
                PriVolPercent = 99.8m,
                ExcitationPercent = 1.2m,
                RatioErrorPercent = 0.5m,
                PhaseErrorMin = 2.1m,
                ClassValue = "Class 0.2",
                Status = "Pass"
            });
        }

        [RelayCommand]
        private void AddGridRow()
        {
            var newRow = new TestingGridRow
            {
                SrNo = TestingData.GridRows.Count + 1
            };
            TestingData.GridRows.Add(newRow);
        }

        [RelayCommand]
        private void DeleteGridRow(TestingGridRow? row)
        {
            if (row == null)
            {
                MessageBox.Show("Please select a row to delete.", "Selection Required", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var result = MessageBox.Show(
                "Are you sure you want to delete this row?",
                "Confirm Delete",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                TestingData.GridRows.Remove(row);
                // Renumber rows
                for (int i = 0; i < TestingData.GridRows.Count; i++)
                {
                    TestingData.GridRows[i].SrNo = i + 1;
                }
            }
        }

        [RelayCommand]
        private void Save()
        {
            if (!ValidateData())
                return;

            MessageBox.Show(
                "Testing data saved successfully!\n" +
                $"Points: {TestingData.Points}\n" +
                $"Set: {TestingData.Set}\n" +
                $"Quantity (Calculated): {TestingData.Quantity}",
                "Success",
                MessageBoxButton.OK,
                MessageBoxImage.Information);
        }

        [RelayCommand]
        private void New()
        {
            var result = MessageBox.Show(
                "This will clear all current data. Are you sure?",
                "Confirm New",
                MessageBoxButton.YesNo,
                MessageBoxImage.Question);

            if (result == MessageBoxResult.Yes)
            {
                // Create new instance
                foreach (var prop in typeof(TestingScreenData).GetProperties())
                {
                    if (prop.PropertyType == typeof(string) && prop.CanWrite)
                        prop.SetValue(TestingData, string.Empty);
                    else if (prop.PropertyType == typeof(decimal) && prop.CanWrite)
                        prop.SetValue(TestingData, 0m);
                }

                TestingData.GridRows.Clear();
                AddSampleGridRows();
            }
        }

        [RelayCommand]
        private void Print()
        {
            MessageBox.Show("Print functionality would be implemented here.", "Print", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        [RelayCommand]
        private void ExportToExcel()
        {
            if (TestingData.GridRows.Count == 0)
            {
                MessageBox.Show("No data to export.", "Export", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            var saveFileDialog = new SaveFileDialog
            {
                Filter = "Excel Files (*.xlsx)|*.xlsx",
                DefaultExt = ".xlsx",
                FileName = $"TestingGrid_{DateTime.Now:yyyyMMdd_HHmmss}.xlsx"
            };

            if (saveFileDialog.ShowDialog() == true)
            {
                var success = _exportService.ExportToExcel(TestingData.GridRows, saveFileDialog.FileName);
                if (success)
                {
                    var result = MessageBox.Show(
                        $"Data exported successfully to:\n{saveFileDialog.FileName}\n\nWould you like to open the file?",
                        "Export Success",
                        MessageBoxButton.YesNo,
                        MessageBoxImage.Information);

                    if (result == MessageBoxResult.Yes)
                    {
                        System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
                        {
                            FileName = saveFileDialog.FileName,
                            UseShellExecute = true
                        });
                    }
                }
                else
                {
                    MessageBox.Show("Error exporting data to Excel.", "Export Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
        }

        private bool ValidateData()
        {
            // Minimal validation - can be expanded
            if (TestingData.GridRows.Count == 0)
            {
                MessageBox.Show("Please add at least one grid row.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return false;
            }

            return true;
        }
    }
}
