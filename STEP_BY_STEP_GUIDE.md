# 📖 Complete Step-by-Step Guide

## ✅ GitHub Push Complete

Your code is now live at:
**<https://github.com/AusafAhma/ERP-style-Testing-Screen-frontend>**

---

## 🖥️ STEP 1: Run on Windows (Required)

Since this is a WPF application, you MUST use a Windows computer.

### 1.1 Install Prerequisites

**Install .NET 7 SDK:**

1. Go to: <https://dotnet.microsoft.com/download/dotnet/7.0>
2. Click "Download .NET SDK x64"
3. Run the installer
4. Restart your computer

**Install Visual Studio 2022:**

1. Go to: <https://visualstudio.microsoft.com/downloads/>
2. Download "Community" (Free)
3. During installation, select: **.NET desktop development**
4. Click Install (takes 10-20 minutes)

### 1.2 Clone the Repository

Open **Command Prompt** or **PowerShell** and run:

```cmd
cd C:\Users\YourName\Desktop
git clone https://github.com/AusafAhma/ERP-style-Testing-Screen-frontend.git
cd ERP-style-Testing-Screen-frontend
```

### 1.3 Open in Visual Studio

1. Double-click `src\ERPTestingApp.sln`
2. Wait for Visual Studio to load
3. Wait for NuGet packages to restore (see bottom status bar)
4. Press **F5** to build and run

The application window should appear!

---

## 📸 STEP 2: Take Screenshots

### Required Screenshots

| File Name | What to Capture |
|-----------|-----------------|
| UI_TopInputs.png | Testing Screen top area with Points/Set/Quantity |
| UI_RightPanel.png | Right settings panel |
| UI_MasterScreens.png | Class Master or any CRUD screen |
| UI_Grid.png | Data grid with sample rows |

### How to Capture

1. Press **Win + Shift + S** (Snipping Tool)
2. Select the area to capture
3. Save each screenshot to `docs/` folder
4. Use these exact file names

---

## 🎬 STEP 3: Record Demo Video

### Recommended Tool: Windows Game Bar (Built-in)

1. Open the ERP application
2. Press **Win + G** to open Game Bar
3. Click the **Record** button (or press **Win + Alt + R**)
4. Perform these actions:

**Demo Script (3-5 minutes):**

```
0:00 - 0:30  Application startup
             - Show Visual Studio
             - Press F5 to run
             - Show main window

0:30 - 1:30  Class Master CRUD
             - Click "Class Master" in sidebar
             - Add a new class
             - Edit the class
             - Delete the class

1:30 - 2:30  Testing Screen
             - Click "Testing Screen"
             - Show top inputs
             - TYPE Points = 10
             - TYPE Set = 5
             - SHOW Quantity = 50 (IMPORTANT!)
             - Change values to show instant update

2:30 - 3:30  Grid Operations
             - Click "Add Row" multiple times
             - Enter data in cells
             - Delete a row

3:30 - 4:30  Excel Export
             - Click "Export to Excel"
             - Choose save location
             - Open the exported file

4:30 - 5:00  Wrap up
             - Show sidebar navigation
             - Exit application
```

5. Press **Win + Alt + R** again to stop recording
6. Video saves to: `C:\Users\YourName\Videos\Captures\`
7. Rename to `Demo.mp4` and copy to `docs/` folder

---

## 📤 STEP 4: Upload Screenshots & Video to GitHub

After capturing screenshots and video:

```cmd
cd C:\Users\YourName\Desktop\ERP-style-Testing-Screen-frontend

# Add new files
git add docs/UI_TopInputs.png
git add docs/UI_RightPanel.png
git add docs/UI_MasterScreens.png
git add docs/UI_Grid.png
git add docs/Demo.mp4

# Commit
git commit -m "Add screenshots and demo video"

# Push
git push origin main
```

---

## 🔗 STEP 5: Share Your Work

### Your Repository URL

```
https://github.com/AusafAhma/ERP-style-Testing-Screen-frontend
```

### If Video is Too Large for GitHub

1. Upload to **Google Drive** or **YouTube**
2. Get shareable link
3. Add link to README.md:

   ```markdown
   ## Demo Video
   [Watch Demo Video](https://drive.google.com/your-link-here)
   ```

---

## ❓ Troubleshooting

### "dotnet not found"

→ Install .NET 7 SDK and restart computer

### "Build failed"

→ Right-click solution → Restore NuGet Packages

### Video too large

→ Use HandBrake to compress, or upload to YouTube/Drive

### Application crashes

→ Make sure you're using Windows 10/11 with .NET 7

---

## 📋 Final Checklist

- [ ] Cloned repository on Windows
- [ ] Installed .NET 7 SDK
- [ ] Installed Visual Studio 2022
- [ ] Built and ran application successfully
- [ ] Captured 4 screenshots
- [ ] Recorded 3-5 minute demo video
- [ ] Uploaded screenshots to docs/
- [ ] Uploaded or linked demo video
- [ ] Pushed all changes to GitHub

---

**Your repository is ready!** 🎉

<https://github.com/AusafAhma/ERP-style-Testing-Screen-frontend>
