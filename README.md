# 🖥️ Nara

**Nara** is a simple and elegant desktop app for monitoring your system’s performance, built with [Electron](https://www.electronjs.org/). It gives you real-time insights into CPU, RAM, and storage usage — all presented through a clean and modern graphical interface.

---

## 🚀 Features

- **Live CPU Monitoring**  
  View current usage, core activity, and temperature stats (where available).

- **Memory (RAM) Overview**  
  Track used, free, and cached memory with real-time graphs.

- **Disk & Storage Insights**  
  Monitor usage across drives with clear visual indicators.

- **Minimal & Intuitive UI**  
  Built for clarity — perfect for keeping an eye on your system without distractions.

---

## 🛠️ Installation

### 🧪 Development (for contributors)

```bash
# Clone the repo
git clone https://github.com/your-username/nara.git
cd nara

# Install dependencies
npm install

# Run the app in development mode
npm run dev

# To build the app in production mode
npm run transpile:electron

# Build the app for your operating system
npm run dist:mac     # For macOS (.dmg)
npm run dist:win     # For Windows (.exe / .msi)
npm run dist:linux   # For Linux (.AppImage / .deb / .rpm)
