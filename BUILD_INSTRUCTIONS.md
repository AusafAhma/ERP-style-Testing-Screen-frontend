# Building and Running the ERP Testing Screen Application

## For Windows Users (Recommended Path)

### Prerequisites

1. **Install .NET 7 SDK**
   - Download from: <https://dotnet.microsoft.com/download/dotnet/7.0>
   - Choose "Windows x64" installer
   - Run installer and follow prompts

2. **Install Visual Studio 2022 (Community Edition - Free)**
   - Download from: <https://visualstudio.microsoft.com/downloads/>
   - During installation, select:
     - ".NET desktop development" workload
     - "Desktop development with C++" (optional)

### Building the Project

#### Option 1: Using Visual Studio (GUI)

1. Double-click `ERPTestingApp.sln` to open in Visual Studio
2. Wait for NuGet packages to restore (status bar shows progress)
3. Click **Build** → **Build Solution** (or press `Ctrl+Shift+B`)
4. Check Output window for build success
5. Click **Debug** → **Start Debugging** (or press `F5`)
6. Application window should appear

#### Option 2: Using Command Line

```cmd
cd C:\path\to\ERP
dotnet restore ERPTestingApp.sln
dotnet build ERPTestingApp.sln --configuration Release
dotnet run --project ERPTestingApp\ERPTestingApp.csproj
```

### Troubleshooting

**Problem**: "The type or namespace name 'CommunityToolkit' could not be found"
**Solution**: Restore NuGet packages

```cmd
dotnet restore
```

**Problem**: "System.Windows namespace not found"
**Solution**: Ensure you're targeting `net7.0-windows` in `.csproj`

**Problem**: Build succeeds but app doesn't run
**Solution**: Check that Windows Defender or antivirus isn't blocking the .exe

---

## For macOS Users (Transfer to Windows Required)

### Current Situation

- WPF applications are **Windows-only**
- The project files have been created on macOS but cannot run natively

### Options to Proceed

#### Option A: Transfer to Windows Machine

1. Copy the entire `ERP` folder to a Windows machine (USB drive, cloud, network)
2. Follow the "For Windows Users" instructions above

#### Option B: Use Windows VM on Mac

1. Install **Parallels Desktop**, **VMware Fusion**, or **VirtualBox**
2. Create a Windows 10/11 VM
3. Install .NET 7 SDK and Visual Studio in the VM
4. Share the `ERP` folder with the VM
5. Build and run inside the VM

#### Option C: Use Cloud Development Environment

1. Use **GitHub Codespaces** or **Gitpod** (limited WPF support)
2. Upload project to GitHub
3. Build via command line (GUI won't work in cloud)

#### Option D: Convert to Cross-Platform (Avalonia UI)

- Requires significant refactoring
- Replace WPF with Avalonia UI framework
- Not recommended for this project scope

**Recommended**: **Option A or B** for full functionality and testing

---

## Data File Location

After first run, data is saved to:

```
Windows: C:\Users\<YourUsername>\AppData\Local\ERPTestingApp\data.json
```

You can delete this file to reset to seed data.

---

## Next Steps After Building

1. **Explore the UI**:
   - Navigate through Class Master and Party Master
   - Add/edit/delete records to test CRUD operations

2. **Test Auto-Calculation**:
   - Go to Testing Screen
   - Enter values in "Points" and "Set" fields
   - Observe "Quantity" updating instantly

3. **Test Excel Export**:
   - Add rows to the data grid
   - Click "Export to Excel"
   - Open the generated `.xlsx` file

4. **Record Demo Video** (see `docs/demo_notes.txt`)

---

## Building for Distribution

### Create Release Build

```cmd
dotnet publish ERPTestingApp\ERPTestingApp.csproj -c Release -r win-x64 --self-contained false -p:PublishSingleFile=true
```

Output: `ERPTestingApp\bin\Release\net7.0-windows\win-x64\publish\ERPTestingApp.exe`

### Create Self-Contained Package (includes .NET runtime)

```cmd
dotnet publish ERPTestingApp\ERPTestingApp.csproj -c Release -r win-x64 --self-contained true -p:PublishSingleFile=true
```

This creates a **single .exe file** that doesn't require .NET to be installed on the target machine.

---

**Ready to build!** 🚀
