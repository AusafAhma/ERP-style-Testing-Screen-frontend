using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels.Base;

namespace ERPTestingApp.ViewModels
{
    /// <summary>
    /// Main window ViewModel for navigation
    /// </summary>
    public partial class MainWindowViewModel : ViewModelBase
    {
        private readonly IDataService _dataService;
        private readonly IExportService _exportService;

        [ObservableProperty]
        private ViewModelBase? currentViewModel;

        [ObservableProperty]
        private string currentViewTitle = "Testing Screen";

        public MainWindowViewModel(IDataService dataService, IExportService exportService)
        {
            _dataService = dataService;
            _exportService = exportService;

            // Default to Testing Screen
            CurrentViewModel = new TestingScreenViewModel(_dataService, _exportService);
        }

        [RelayCommand]
        private void NavigateToTestingScreen()
        {
            CurrentViewModel = new TestingScreenViewModel(_dataService, _exportService);
            CurrentViewTitle = "Testing Screen";
        }

        [RelayCommand]
        private void NavigateToClassMaster()
        {
            CurrentViewModel = new Masters.ClassMasterViewModel(_dataService);
            CurrentViewTitle = "Class Master";
        }

        [RelayCommand]
        private void NavigateToPartyMaster()
        {
            CurrentViewModel = new Masters.PartyMasterViewModel(_dataService);
            CurrentViewTitle = "Party Master";
        }

        [RelayCommand]
        private void NavigateToVAMaster()
        {
            CurrentViewModel = new Masters.VAMasterViewModel(_dataService);
            CurrentViewTitle = "VA Master";
        }

        [RelayCommand]
        private void NavigateToIECMaster()
        {
            CurrentViewModel = new Masters.IECStandardMasterViewModel(_dataService);
            CurrentViewTitle = "IEC Standard Master";
        }

        [RelayCommand]
        private void NavigateToLabelMaster()
        {
            CurrentViewModel = new Masters.LabelMasterViewModel(_dataService);
            CurrentViewTitle = "Label Master";
        }

        [RelayCommand]
        private void NavigateToPartCodeMaster()
        {
            CurrentViewModel = new Masters.PartCodeMasterViewModel(_dataService);
            CurrentViewTitle = "Part Code Master";
        }

        [RelayCommand]
        private void NavigateToModelMaster()
        {
            CurrentViewModel = new Masters.ModelMasterViewModel(_dataService);
            CurrentViewTitle = "Model Master";
        }

        [RelayCommand]
        private void Exit()
        {
            _dataService.SaveToJson();
            System.Windows.Application.Current.Shutdown();
        }
    }
}
