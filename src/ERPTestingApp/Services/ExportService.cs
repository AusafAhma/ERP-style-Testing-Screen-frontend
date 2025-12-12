using System;
using System.Collections.Generic;
using System.Linq;
using ClosedXML.Excel;
using ERPTestingApp.Models;

namespace ERPTestingApp.Services
{
    /// <summary>
    /// Service for exporting data to Excel using ClosedXML
    /// </summary>
    public class ExportService : IExportService
    {
        public bool ExportToExcel(IEnumerable<TestingGridRow> data, string filePath)
        {
            try
            {
                using var workbook = new XLWorkbook();
                var worksheet = workbook.Worksheets.Add("Testing Grid");

                // Add headers
                worksheet.Cell(1, 1).Value = "Sr.No";
                worksheet.Cell(1, 2).Value = "BD %";
                worksheet.Cell(1, 3).Value = "Pri.Vol %";
                worksheet.Cell(1, 4).Value = "Excitation %";
                worksheet.Cell(1, 5).Value = "Ratio Error %";
                worksheet.Cell(1, 6).Value = "Phase Error (MIN)";
                worksheet.Cell(1, 7).Value = "Class";
                worksheet.Cell(1, 8).Value = "Status";

                // Style header row
                var headerRow = worksheet.Row(1);
                headerRow.Style.Font.Bold = true;
                headerRow.Style.Fill.BackgroundColor = XLColor.LightBlue;
                headerRow.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;

                // Add data rows
                var rowIndex = 2;
                foreach (var row in data)
                {
                    worksheet.Cell(rowIndex, 1).Value = row.SrNo;
                    worksheet.Cell(rowIndex, 2).Value = row.BdPercent;
                    worksheet.Cell(rowIndex, 3).Value = row.PriVolPercent;
                    worksheet.Cell(rowIndex, 4).Value = row.ExcitationPercent;
                    worksheet.Cell(rowIndex, 5).Value = row.RatioErrorPercent;
                    worksheet.Cell(rowIndex, 6).Value = row.PhaseErrorMin;
                    worksheet.Cell(rowIndex, 7).Value = row.ClassValue;
                    worksheet.Cell(rowIndex, 8).Value = row.Status;
                    rowIndex++;
                }

                // Auto-fit columns
                worksheet.Columns().AdjustToContents();

                // Add borders to all cells with data
                var dataRange = worksheet.Range(1, 1, rowIndex - 1, 8);
                dataRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
                dataRange.Style.Border.InsideBorder = XLBorderStyleValues.Thin;

                // Save workbook
                workbook.SaveAs(filePath);
                return true;
            }
            catch (Exception ex)
            {
                // Log error (in production, use proper logging)
                Console.WriteLine($"Error exporting to Excel: {ex.Message}");
                return false;
            }
        }
    }
}
