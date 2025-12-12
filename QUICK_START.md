# Quick Start Guide

## 📦 What You Have

A complete **C# WPF ERP Testing Screen application** with:

- ✅ 7 Master CRUD modules
- ✅ Testing Screen with auto-calculation (Points × Set = Quantity)
- ✅ Excel export
- ✅ Data validation
- ✅ JSON persistence

## 🚨 Important: Windows Required

This is a **WPF application** (Windows-only). Created on macOS but **must run on Windows**.

## 🚀 Quick Start (Windows Machine)

### 1. Prerequisites

```
✓ Windows 10/11
✓ .NET 7 SDK: https://dotnet.microsoft.com/download/dotnet/7.0
✓ Visual Studio 2022 (Community - free): https://visualstudio.microsoft.com/
```

### 2. Transfer Files

Copy the entire `ERP` folder to your Windows machine

### 3. Build & Run

```cmd
# Method 1: Visual Studio (Recommended)
1. Double-click ERPTestingApp.sln
2. Press F5

# Method 2: Command Line
cd C:\path\to\ERP
dotnet run --project ERPTestingApp\ERPTestingApp.csproj
```

### 4. Test Auto-Calculation

1. Click "🧪 Testing Screen"
2. Enter **Points = 10**
3. Enter **Set = 5**
4. **Quantity** instantly shows **50** ✓

## 📁 Project Files

```
ERP/
├── ERPTestingApp.sln          ← Open this in Visual Studio
├── ERPTestingApp/             ← Main application folder
│   ├── Models/                ← Data models (7 masters)
│   ├── ViewModels/            ← MVVM logic
│   ├── Views/                 ← XAML UI files
│   ├── Services/              ← Data & Excel services
│   └── App.xaml               ← Entry point
├── README.md                  ← Full documentation
├── BUILD_INSTRUCTIONS.md      ← Detailed build guide
├── PROJECT_STATUS.md          ← Implementation status
└── docs/
    └── demo_notes.txt         ← Video recording script
```

## 🔑 Key Features

### Master Modules

Navigate via sidebar → Add/Edit/Delete records

### Auto-Calculation ⚡

**Formula**: Quantity = Points × Set

- Type in `Points` → instant update
- Type in `Set` → instant update
- No manual calculation needed!

### Excel Export

1. Add rows to grid
2. Click "📊 Export to Excel"
3. Choose location → Done!

## 📖 Documentation

| File | Purpose |
|------|---------|
| `README.md` | Complete user guide |
| `BUILD_INSTRUCTIONS.md` | Build steps for Windows/Mac users |
| `PROJECT_STATUS.md` | Implementation checklist |
| `docs/demo_notes.txt` | Video recording script |

## 🎬 Demo Video

Follow `docs/demo_notes.txt` for a detailed 3-5 minute demo script covering:

- Master CRUD operations
- **Auto-calculation demonstration** (critical!)
- Grid operations
- Excel export
- Validation

## 📝 Next Steps

1. ✅ Transfer to Windows
2. ✅ Install .NET 7 + Visual Studio
3. ✅ Build the solution
4. ✅ Test auto-calculation
5. ✅ Test Excel export
6. ✅ Record demo video
7. ✅ Add screenshots to README

## 💡 Tips

- **Data Location**: `%LOCALAPPDATA%\ERPTestingApp\data.json`
- **Reset Data**: Delete `data.json` to restore seed data
- **Seed Data**: 5 Classes, 5 VAs, 3 IEC Standards, 3 Parties pre-loaded

## 🐛 Troubleshooting

**"dotnet not found"**
→ Install .NET 7 SDK from Microsoft

**"WPF not supported"**
→ Must use Windows (WPF doesn't work on Mac/Linux)

**"NuGet packages missing"**
→ Run: `dotnet restore`

**"Application doesn't start"**
→ Check Visual Studio Output window for errors

## 📞 Support

1. Check `README.md` for detailed docs
2. Review `BUILD_INSTRUCTIONS.md` for platform-specific steps
3. Check `PROJECT_STATUS.md` for implementation details

---

**Ready to build! Transfer to Windows and press F5 in Visual Studio.** 🚀
