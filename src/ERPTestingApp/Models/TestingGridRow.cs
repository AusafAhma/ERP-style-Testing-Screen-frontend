using System;
using CommunityToolkit.Mvvm.ComponentModel;

namespace ERPTestingApp.Models
{
    /// <summary>
    /// Represents a row in the Testing Screen data grid
    /// </summary>
    public partial class TestingGridRow : ObservableObject
    {
        [ObservableProperty]
        private int srNo;

        [ObservableProperty]
        private decimal bdPercent;

        [ObservableProperty]
        private decimal priVolPercent;

        [ObservableProperty]
        private decimal excitationPercent;

        [ObservableProperty]
        private decimal ratioErrorPercent;

        [ObservableProperty]
        private decimal phaseErrorMin;

        [ObservableProperty]
        private string classValue = string.Empty;

        [ObservableProperty]
        private string status = string.Empty;
    }
}
