# 🍎 macOS Guide - Running ERP Testing Screen on Mac

Since the WPF application is Windows-only, Mac users need one of these approaches.

---

## ✅ Option 1: Cross-Platform Web Version (Recommended)

The easiest option! A React web version runs directly on your Mac:

```bash
# Navigate to the web folder
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **<http://localhost:5173>** in your browser. Done! 🎉

---

## 🖥️ Option 2: UTM Virtual Machine (Free)

UTM is a free, open-source virtualization app that works great on Apple Silicon (M1/M2/M3) Macs.

### Step 1: Download Required Software

1. **Download UTM**: <https://mac.getutm.app/>
2. **Get Windows 11 ARM**: <https://www.microsoft.com/software-download/windows11arm64>
   - Click "Download now" under "Windows 11 ARM64"
   - You'll get a `.vhdx` file

### Step 2: Create VM in UTM

1. Open UTM
2. Click **Create a New Virtual Machine**
3. Select **Virtualize** (for ARM Windows)
4. Choose **Windows**
5. Click **Browse** and select your Windows 11 VHDX file
6. Configure resources:
   - **Memory**: 8 GB minimum (16 GB recommended)
   - **CPU Cores**: 4 minimum
   - **Storage**: 64 GB minimum
7. Click **Save**

### Step 3: Install Windows

1. Click **Play** to start the VM
2. Follow Windows setup screens
3. Create a local account when prompted
4. Complete initial setup

### Step 4: Install Development Tools

Inside Windows VM:

```powershell
# Open PowerShell as Administrator

# Install .NET 7 SDK
winget install Microsoft.DotNet.SDK.7

# Install Visual Studio 2022 Community
winget install Microsoft.VisualStudio.2022.Community

# Or download manually:
# .NET 7: https://dotnet.microsoft.com/download/dotnet/7.0
# VS 2022: https://visualstudio.microsoft.com/downloads/
```

### Step 5: Clone and Run

```cmd
cd C:\Users\YourName\Desktop
git clone https://github.com/AusafAhma/ERP-style-Testing-Screen-frontend.git
cd ERP-style-Testing-Screen-frontend
```

Open `src/ERPTestingApp.sln` in Visual Studio and press **F5** to run!

---

## 💰 Option 3: Parallels Desktop (Paid - Best Performance)

Parallels Desktop offers the best Windows experience on Mac but requires a license (~$99/year).

### Step 1: Install Parallels

1. Download from <https://www.parallels.com/>
2. Install the app
3. Start the 14-day free trial

### Step 2: Quick Windows Setup

1. Open Parallels Desktop
2. Click **Install Windows**
3. Parallels automatically downloads and installs Windows 11
4. Wait 10-15 minutes for setup to complete

### Step 3: Install Dev Tools & Run

Same as UTM Step 4 and 5 above.

**Pros**: Best performance, seamless integration, easy setup
**Cons**: Paid subscription required

---

## 🆓 Option 4: VMware Fusion (Free for Personal Use)

VMware Fusion Player is free for personal use.

### Step 1: Get VMware Fusion

1. Go to <https://www.vmware.com/products/fusion.html>
2. Click **Download** → Fusion Player (free for personal use)
3. Create a VMware account if needed
4. Install VMware Fusion

### Step 2: Get Windows

Same as UTM - download Windows 11 ARM from Microsoft.

### Step 3: Create VM

1. Open VMware Fusion
2. Click **Create a Custom Virtual Machine**
3. Select **Windows 11 ARM**
4. Configure resources (8GB RAM, 4 cores minimum)
5. Finish setup

### Step 4: Install & Run

Same as UTM Step 4 and 5.

---

## 🚀 Option 5: Boot Camp (Intel Macs Only)

If you have an **Intel Mac** (pre-2020), you can dual-boot Windows natively.

> ⚠️ **Note**: Boot Camp does NOT work on Apple Silicon Macs (M1/M2/M3).

### Steps

1. Open **Applications > Utilities > Boot Camp Assistant**
2. Download Windows 10 ISO from Microsoft
3. Allocate at least 64 GB for Windows partition
4. Follow the installation prompts
5. Restart and hold **Option** key to select Windows

---

## 📋 Comparison Table

| Option | Cost | Performance | Setup Time | Apple Silicon |
|--------|------|-------------|------------|---------------|
| **Web Version** | Free | Native | 2 min | ✅ Yes |
| **UTM** | Free | Good | 30-60 min | ✅ Yes |
| **Parallels** | $99/yr | Excellent | 15 min | ✅ Yes |
| **VMware Fusion** | Free | Good | 30-60 min | ✅ Yes |
| **Boot Camp** | Free | Native | 1-2 hrs | ❌ Intel only |

---

## ❓ Troubleshooting

### "Windows 11 won't boot in UTM"

→ Make sure you downloaded the **ARM64** version of Windows, not x64.

### "Visual Studio is slow in VM"

→ Allocate more RAM (8-16 GB) and CPU cores to the VM.

### "Can't find .NET 7 SDK"

→ Restart the VM after installation, or re-run the installer.

### "Git not found"

→ Install Git for Windows: <https://git-scm.com/download/win>

---

## 🎯 Recommendation

| Your Situation | Best Option |
|----------------|-------------|
| Just want to run the app | **Web Version** |
| Need full WPF development | **UTM** (free) or **Parallels** (paid) |
| Have Intel Mac | **Boot Camp** for native performance |
| Want easiest setup | **Parallels** (paid) |

---

**Questions?** Check the main [README.md](./README.md) or [BUILD_INSTRUCTIONS.md](./BUILD_INSTRUCTIONS.md).
