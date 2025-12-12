using System.Windows;
using ERPTestingApp.Services;
using ERPTestingApp.ViewModels;

namespace ERPTestingApp
{
    public partial class App : Application
    {
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);

            // Initialize services
            var dataService = new DataService();
            var exportService = new ExportService();

            // Create main window with ViewModel
            var mainWindow = new Views.MainWindow();
            var viewModel = new MainWindowViewModel(dataService, exportService);
            mainWindow.DataContext = viewModel;
            mainWindow.Show();
        }

        protected override void OnExit(ExitEventArgs e)
        {
            // Save data on exit
            base.OnExit(e);
        }
    }
}
