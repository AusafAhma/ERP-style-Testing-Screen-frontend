# 📖 Complete Step-by-Step  for Windows

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

---

## 🍎 STEP 6: For Mac Users

Since WPF is Windows-only, Mac users have the following options:

### Option 1: Use the Cross-Platform Web Version (Recommended)

A React web version is available in the `web/` folder that runs on any platform:

```bash
cd web
npm install
npm run dev
# Open http://localhost:5173
```

### Option 2: Windows Virtual Machine

Set up a Windows VM on your Mac. See **[MACOS_GUIDE.md](./MACOS_GUIDE.md)** for detailed instructions:

- **UTM** (Free) - Recommended for Apple Silicon Macs
- **Parallels Desktop** (Paid) - Best performance
- **VMware Fusion** (Free for personal use)

### Option 3: Boot Camp (Intel Macs Only)

If you have an Intel-based Mac, you can dual-boot Windows:

1. Go to **Applications > Utilities > Boot Camp Assistant**
2. Follow the prompts to install Windows 10/11
3. Restart and select Windows from the boot menu

### Option 4: Remote Windows Access

- Use a Windows PC remotely via **Remote Desktop**
- Azure Virtual Desktop or Windows 365 (paid cloud options)

---

**Your repository is ready!** 🎉

<https://github.com/AusafAhma/ERP-style-Testing-Screen-frontend>
