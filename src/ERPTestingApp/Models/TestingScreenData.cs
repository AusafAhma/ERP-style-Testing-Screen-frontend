using System;
using System.Collections.ObjectModel;
using CommunityToolkit.Mvvm.ComponentModel;

namespace ERPTestingApp.Models
{
    /// <summary>
    /// Represents the complete Testing Screen data
    /// </summary>
    public partial class TestingScreenData : ObservableObject
    {
        // Top Input Fields
        [ObservableProperty]
        private string portName = string.Empty;

        [ObservableProperty]
        private string amber = string.Empty;

        [ObservableProperty]
        private string ctPt = string.Empty;

        [ObservableProperty]
        private Guid? partCodeId;

        [ObservableProperty]
        private string company = string.Empty;

        [ObservableProperty]
        private string phase = string.Empty;

        [ObservableProperty]
        private string ratio = string.Empty;

        [ObservableProperty]
        private string jobcardNo = string.Empty;

        [ObservableProperty]
        private decimal sec;

        private decimal points;
        public decimal Points
        {
            get => points;
            set
            {
                if (SetProperty(ref points, value))
                {
                    OnPropertyChanged(nameof(Quantity));
                }
            }
        }

        private decimal set;
        public decimal Set
        {
            get => set;
            set
            {
                if (SetProperty(ref this.set, value))
                {
                    OnPropertyChanged(nameof(Quantity));
                }
            }
        }

        // Auto-calculated property
        public decimal Quantity => Points * Set;

        [ObservableProperty]
        private string poNo = string.Empty;

        [ObservableProperty]
        private string invoiceNo = string.Empty;

        [ObservableProperty]
        private string serialNo = string.Empty;

        [ObservableProperty]
        private decimal jcQty;

        [ObservableProperty]
        private decimal partialQty;

        [ObservableProperty]
        private Guid? iecStandardId;

        [ObservableProperty]
        private Guid? modelId;

        [ObservableProperty]
        private string fs = string.Empty;

        [ObservableProperty]
        private decimal kv;

        [ObservableProperty]
        private decimal il;

        // Right Panel Fields
        [ObservableProperty]
        private string revisionNo = string.Empty;

        [ObservableProperty]
        private DateTime? revisionDate;

        [ObservableProperty]
        private bool prefixEnabled;

        [ObservableProperty]
        private string prefixText = string.Empty;

        [ObservableProperty]
        private bool autoPrinting;

        [ObservableProperty]
        private string vf = string.Empty;

        [ObservableProperty]
        private string hsv = string.Empty;

        // Grid Data
        public ObservableCollection<TestingGridRow> GridRows { get; set; } = new();

        public TestingScreenData()
        {
            RevisionDate = DateTime.Today;
        }
    }
}
