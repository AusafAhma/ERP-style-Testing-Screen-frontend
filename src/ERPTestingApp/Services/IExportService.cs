using System.Collections.Generic;
using ERPTestingApp.Models;

namespace ERPTestingApp.Services
{
    /// <summary>
    /// Interface for Excel export operations
    /// </summary>
    public interface IExportService
    {
        /// <summary>
        /// Exports testing grid data to Excel file
        /// </summary>
        /// <param name="data">Grid rows to export</param>
        /// <param name="filePath">Output file path</param>
        /// <returns>True if successful, false otherwise</returns>
        bool ExportToExcel(IEnumerable<TestingGridRow> data, string filePath);
    }
}
