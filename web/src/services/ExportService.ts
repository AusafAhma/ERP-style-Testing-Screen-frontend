import * as XLSX from 'xlsx';
import type { TestingScreenData, TestingGridRow } from '../types/models';

// Export testing screen data to Excel
export const exportToExcel = (testingData: TestingScreenData): void => {
    // Create workbook
    const wb = XLSX.utils.book_new();

    // Header information sheet
    const headerData = [
        ['ERP Testing Screen - Export'],
        [''],
        ['Port Name', testingData.portName],
        ['Amber', testingData.amber],
        ['CT/PT', testingData.ctPt],
        ['Company', testingData.company],
        ['Phase', testingData.phase],
        ['Ratio', testingData.ratio],
        ['Jobcard No', testingData.jobcardNo],
        [''],
        ['Points', testingData.points],
        ['Set', testingData.set],
        ['Quantity (Auto)', testingData.points * testingData.set],
        [''],
        ['PO No', testingData.poNo],
        ['Invoice No', testingData.invoiceNo],
        ['Serial No', testingData.serialNo],
        ['JC Qty', testingData.jcQty],
        [''],
        ['Settings'],
        ['Revision No', testingData.revisionNo],
        ['Revision Date', testingData.revisionDate?.toLocaleDateString() || ''],
        ['Prefix Enabled', testingData.prefixEnabled ? 'Yes' : 'No'],
        ['Prefix Text', testingData.prefixText],
        ['Auto Printing', testingData.autoPrinting ? 'Yes' : 'No'],
        ['VF', testingData.vf],
        ['HSV', testingData.hsv],
        ['kV', testingData.kv],
        ['IL', testingData.il],
    ];

    const wsHeader = XLSX.utils.aoa_to_sheet(headerData);
    XLSX.utils.book_append_sheet(wb, wsHeader, 'Header Info');

    // Grid data sheet
    if (testingData.gridRows && testingData.gridRows.length > 0) {
        const gridHeaders = ['Sr.No', 'BD %', 'Pri.Vol %', 'Excitation %', 'Ratio Error %', 'Phase Error (MIN)', 'Class', 'Status'];
        const gridData = testingData.gridRows.map((row: TestingGridRow) => [
            row.srNo,
            row.bdPercent,
            row.priVolPercent,
            row.excitationPercent,
            row.ratioErrorPercent,
            row.phaseErrorMin,
            row.classValue,
            row.status
        ]);

        const wsGrid = XLSX.utils.aoa_to_sheet([gridHeaders, ...gridData]);

        // Set column widths
        wsGrid['!cols'] = [
            { wch: 8 },  // Sr.No
            { wch: 10 }, // BD %
            { wch: 12 }, // Pri.Vol %
            { wch: 14 }, // Excitation %
            { wch: 14 }, // Ratio Error %
            { wch: 16 }, // Phase Error (MIN)
            { wch: 10 }, // Class
            { wch: 12 }, // Status
        ];

        XLSX.utils.book_append_sheet(wb, wsGrid, 'Test Data');
    }

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().slice(0, 10);
    const filename = `ERP_Testing_Export_${timestamp}.xlsx`;

    // Trigger download
    XLSX.writeFile(wb, filename);
};

// Export master data to Excel
export const exportMasterToExcel = <T extends Record<string, unknown>>(
    data: T[],
    sheetName: string,
    filename: string
): void => {
    if (data.length === 0) {
        alert('No data to export');
        return;
    }

    // Get headers from first item
    const headers = Object.keys(data[0]).filter(key => key !== 'id' && key !== 'createdAt' && key !== 'updatedAt');

    // Format headers for display
    const formattedHeaders = headers.map(h =>
        h.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()
    );

    // Create data rows
    const rows = data.map(item =>
        headers.map(header => {
            const value = item[header];
            if (value instanceof Date) {
                return value.toLocaleDateString();
            }
            return value;
        })
    );

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet([formattedHeaders, ...rows]);

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);

    // Trigger download
    XLSX.writeFile(wb, filename);
};
