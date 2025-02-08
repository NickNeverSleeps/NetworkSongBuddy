# 🎵 Network Song Buddy

**Network Song Buddy** is a lightweight Node.js tool designed for **ESL FaceIt Group** as part of the **Overwatch Championship Series** (OWCS). It reads the latest entry from a media log CSV file from Ableton Live and serves it as a JSON API on **port 3009**.

## 🚀 Features
- Reads the latest media log entry from `Z:/OWCS 2025 media log.csv`
- Cleans up song titles by **removing bracketed text** (e.g., `[Remix]`, `(Live)`)
- Calculates the **percentage completed** based on playback time and duration
- Serves the processed data as a **JSON API** at `http://localhost:3009/`

## 📦 Installation

1. **Clone this repository**:
   ```sh
   git clone https://github.com/YOUR_USERNAME/network-song-buddy.git
   cd network-song-buddy
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the server**:
   ```sh
   node server.js
   ```

4. **Access the API**:
   - Open your browser or use `curl`:
     ```sh
     curl http://localhost:3009/
     ```
   - The response will be in JSON format:
     ```json
     {
       "title": "Song Name",
       "time": "120",
       "duration": "240",
       "perc_complete": "50.00"
     }
     ```

## 🔧 Packaging to an Executable (Windows)

You can package **Network Song Buddy** as a standalone `.exe` file using **pkg**.

### **1️⃣ Install `pkg` Globally**
```sh
npm install -g pkg
```

### **2️⃣ Build the Executable**
```sh
pkg . --targets win --output songbuddy.exe
```
> This will generate `songbuddy.exe` in the current directory.

### **3️⃣ Run the Executable**
```sh
songbuddy.exe
```
Then, visit `http://localhost:3009/` in your browser.

## 📝 Configuration
- **CSV File Path:** The script currently reads from `Z:/OWCS 2025 media log.csv`.  
  If your file is in a different location, update this line in `server.js`:
  ```javascript
  const FILE_PATH = "Z:/OWCS 2025 media log.csv";
  ```

## 🤝 Contributing
Feel free to fork this repo and submit a pull request if you have improvements or fixes!

## 🐝 License
Do whatever - this took 15 mins to write.

