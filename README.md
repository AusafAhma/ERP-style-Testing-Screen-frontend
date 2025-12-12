# ERP Testing Screen - WPF Application

A comprehensive desktop **ERP-style Testing Screen** frontend built with **C#.NET WPF** using the **MVVM pattern**. Features 7 master CRUD modules, auto-calculation, data grid operations, validation, and Excel export.

---

## 📋 Overview of All Screens

### 1. Testing Screen (Main)

The primary data entry interface for electrical testing workflows:

- **Top Input Area**: Port Name, Amber, CT/PT, Part Code, Company, Phase, Ratio
- **Auto-Calculation Section**: Points × Set = Quantity (instant updates)
- **Data Grid**: Test results with BD%, Pri.Vol%, Excitation%, Ratio Error%, Phase Error, Class, Status
- **Right Panel**: Settings (Revision, Prefix, Auto Printing, VF, HSV)
- **Action Buttons**: Save, New, Print, Export to Excel

### 2. Class Master

Manage electrical component classes with Add/Edit/Delete operations.

### 3. VA Master

Manage VA (Volt-Ampere) ratings for electrical components.

### 4. IEC Standard Master

Manage IEC standards (e.g., IEC 60044-1, IEC 61869).

### 5. Party Master

Manage companies/customers with contact info and **email validation**.

### 6. Label Master

Configure label types (Square/Rect) with file path or URL links.

### 7. Part Code Master

Manage part codes with references to **Class** and **VA** masters.

### 8. Model Master

Manage models with references to **Class**, **VA**, and **Phase** (1 Phase/3 Phase).

---

## 📁 Folder Structure

```text
ERP-Testing-Screen-WPF/
├── README.md                      # This file
├── BUILD_INSTRUCTIONS.md          # Platform-specific build guide
├── QUICK_START.md                 # Fast onboarding guide
├── PROJECT_STATUS.md              # Implementation checklist
│
├── src/                           # Source code
│   ├── ERPTestingApp.sln          # Visual Studio solution
│   └── ERPTestingApp/
│       ├── App.xaml               # Application entry point
│       ├── App.xaml.cs            # Startup logic & DI
│       ├── ERPTestingApp.csproj   # Project file
│       │
│       ├── Models/                # Data models
│       │   ├── Enums/             # LabelType, Phase
│       │   ├── Masters/           # 7 master entity models
│       │   ├── TestingScreenData.cs
│       │   └── TestingGridRow.cs
│       │
│       ├── ViewModels/            # MVVM ViewModels
│       │   ├── Base/              # ViewModelBase
│       │   ├── Masters/           # 7 master ViewModels
│       │   ├── MainWindowViewModel.cs
│       │   └── TestingScreenViewModel.cs
│       │
│       ├── Views/                 # WPF XAML Views
│       │   ├── Masters/           # 7 master views
│       │   ├── MainWindow.xaml
│       │   └── TestingScreenView.xaml
│       │
│       ├── Services/              # Business logic
│       │   ├── IDataService.cs
│       │   ├── DataService.cs     # In-memory + JSON persistence
│       │   ├── IExportService.cs
│       │   └── ExportService.cs   # Excel export (ClosedXML)
│       │
│       ├── Converters/            # XAML converters
│       │   └── BoolToVisibilityConverter.cs
│       │
│       └── Resources/             # Icons, images (optional)
│
└── docs/                          # Documentation
    ├── demo_notes.txt             # Video recording script
    ├── UI_TopInputs.png           # Screenshot: Top input area
    ├── UI_RightPanel.png          # Screenshot: Right settings panel
    ├── UI_MasterScreens.png       # Screenshot: Master CRUD screens
    ├── UI_Grid.png                # Screenshot: Data grid
    └── Demo.mp4                   # Demo video (3-5 min)
```

---

## 🛠️ Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| **.NET** | 7.0 | Runtime framework |
| **WPF** | (Windows-only) | Desktop UI framework |
| **C#** | 11 | Programming language |
| **CommunityToolkit.Mvvm** | 8.2.2 | MVVM scaffolding (ObservableObject, RelayCommand) |
| **ClosedXML** | 0.102.1 | Excel export (no Office required) |
| **System.Text.Json** | 7.0.3 | JSON data persistence |
| **Visual Studio** | 2022 | IDE (recommended) |

---

## 🧮 Calculation Logic

### Formula: `Quantity = Points × Set`

The auto-calculation is implemented using **property change notifications** for instant UI updates.

#### Implementation (TestingScreenData.cs)

```csharp
private decimal points;
public decimal Points
{
    get => points;
    set
    {
        if (SetProperty(ref points, value))
        {
            OnPropertyChanged(nameof(Quantity));  // Trigger recalculation
        }
    }
}

private decimal set;
public decimal Set
{
    get => this.set;
    set
    {
        if (SetProperty(ref this.set, value))
        {
            OnPropertyChanged(nameof(Quantity));  // Trigger recalculation
        }
    }
}

// Calculated property - no backing field needed
public decimal Quantity => Points * Set;
```

#### XAML Binding (TestingScreenView.xaml)

```xml
<!-- Points input with instant update -->
<TextBox Text="{Binding TestingData.Points, UpdateSourceTrigger=PropertyChanged}"/>

<!-- Set input with instant update -->
<TextBox Text="{Binding TestingData.Set, UpdateSourceTrigger=PropertyChanged}"/>

<!-- Quantity read-only output -->
<TextBox Text="{Binding TestingData.Quantity, Mode=OneWay}" IsReadOnly="True"/>
```

#### Behavior

- Changes to `Points` or `Set` **instantly** update `Quantity`
- Empty or invalid inputs are treated as `0`
- Uses `decimal` type for precision
- **No manual calculate button needed**

---
# Demo Video

## 📺 Watch on YouTube

**👆 Click the image above or use this link:** [https://youtu.be/wSm0rt2lDIs](https://youtu.be/wSm0rt2lDIs)




## 🖼️ Screenshots

### Testing Screen - Top Inputs

![Top Input Area](docs/UI_TopInputs.png)
*Top input fields including Port Name, Part Code, Company, Phase, and the highlighted auto-calculation section (Points × Set = Quantity)*

### Testing Screen - Right Panel

![Right Panel](docs/UI_RightPanel.png)
*Settings panel with Revision, Prefix, Auto Printing toggle, VF, and HSV options*

### Master CRUD Screens

![Master Screens](docs/UI_MasterScreens.png)
*Class Master showing Add/Edit/Delete form and DataGrid list with action buttons*

### Data Grid

![Data Grid](docs/UI_Grid.png)
*Testing data grid with columns: Sr.No, BD%, Pri.Vol%, Excitation%, Ratio Error%, Phase Error, Class, Status*

> **Note**: Screenshots will be captured after running the application on Windows.

---

## 🚀 Instructions to Run

### Prerequisites

1. **Windows 10/11** (WPF is Windows-only)
2. **.NET 7 SDK**: [Download here](https://dotnet.microsoft.com/download/dotnet/7.0)
3. **Visual Studio 2022** (Community Edition - free): [Download here](https://visualstudio.microsoft.com/)
   - Select ".NET desktop development" workload during installation

### Build & Run

#### Option 1: Visual Studio (Recommended)

```bash
1. Double-click src/ERPTestingApp.sln
2. Wait for NuGet packages to restore
3. Press F5 to build and run
```

#### Option 2: Command Line

```bash
cd src
dotnet restore
dotnet run --project ERPTestingApp/ERPTestingApp.csproj
```

### First Run

- Application opens to **Testing Screen** by default
- Navigate using the **left sidebar**
- Seed data is pre-loaded (5 Classes, 5 VAs, 3 IEC Standards, etc.)

### Data Location

```text
%LOCALAPPDATA%\ERPTestingApp\data.json
```

Delete this file to reset to seed data.

---

## ⏱️ Time Spent

| Phase | Time |
|-------|------|
| Project setup & architecture | 1.5 hrs |
| Data models (7 masters + testing) | 2 hrs |
| DataService (CRUD + JSON) | 1.5 hrs |
| ExportService (Excel) | 1 hr |
| Master CRUD ViewModels (7 modules) | 3 hrs |
| Master CRUD Views (7 XAML) | 3 hrs |
| Testing Screen ViewModel | 1.5 hrs |
| Testing Screen View (complex layout) | 2 hrs |
| Auto-calculation implementation | 0.5 hrs |
| MainWindow navigation | 1 hr |
| Validation & error handling | 1.5 hrs |
| UI styling & polish | 1.5 hrs |
| Documentation (README, guides) | 1.5 hrs |
| Testing & bug fixes | 2 hrs |
| **Total** | **~23 hours** |

---

## 🔮 Production Improvements

If this were a production application, I would add:

### Database & Backend

- [ ] **SQL Server/SQLite** - Replace in-memory with proper database
- [ ] **Entity Framework Core** - ORM for data access
- [ ] **Repository Pattern** - Abstract data layer
- [ ] **API Backend** - REST API for multi-user support

### Authentication & Security

- [ ] **User Login** - Authentication system
- [ ] **Role-Based Access** - Admin, Operator, Viewer roles
- [ ] **Audit Trail** - Track who changed what and when
- [ ] **Data Encryption** - Secure sensitive data

### Performance & UX

- [ ] **Async/Await** - Non-blocking data operations
- [ ] **Pagination** - Handle large datasets
- [ ] **Search & Filter** - Quick find in all masters
- [ ] **Dark Mode** - Theme switching
- [ ] **Localization** - Multi-language support (i18n)

### Reporting & Integration

- [ ] **PDF Reports** - Generate printable test reports
- [ ] **Print Preview** - Show report before printing
- [ ] **Barcode Scanner** - Part Code input via scanner
- [ ] **Cloud Sync** - Azure/AWS backend

### Quality Assurance

- [ ] **Unit Tests** - xUnit/NUnit test coverage
- [ ] **Integration Tests** - End-to-end testing
- [ ] **CI/CD Pipeline** - Automated builds and deployments
- [ ] **Error Logging** - Serilog or NLog integration

### Cross-Platform

- [ ] **Avalonia UI** - Cross-platform alternative to WPF
- [ ] **MAUI** - .NET Multi-platform App UI

---

## 🎬 Demo Video

[![ERP Testing Screen Demo](https://img.youtube.com/vi/wSm0rt2lDIs/maxresdefault.jpg)](https://youtu.be/wSm0rt2lDIs)

**▶️ [Watch Demo on YouTube](https://youtu.be/wSm0rt2lDIs)**

The demo shows:

1. **Application Startup** - Opening the solution and running
2. **Master CRUD** - Add/Edit/Delete in Class and Party Master
3. **Testing Screen** - Input fields and layout
4. **Auto-Calculation** - Points × Set = Quantity (instant updates)
5. **Grid Operations** - Add/Edit/Delete rows
6. **Excel Export** - Export grid to .xlsx file
7. **Navigation** - Sidebar menu switching

---

## 📝 License

This project is provided as-is for demonstration purposes.

---

## 👤 Author

- **Project**: ERP Testing Screen WPF Application
- **Framework**: .NET 7 + WPF + MVVM
- **Date**: December 2025

---

## 📞 Support

For questions:

1. Check `BUILD_INSTRUCTIONS.md` for platform-specific help
2. Review `QUICK_START.md` for fast onboarding
3. Check code documentation (XML comments)

---

**Ready to build! Transfer to Windows and press F5.** 🚀
