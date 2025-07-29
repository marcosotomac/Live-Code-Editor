# Live Code Editor

A modern, feature-rich web-based code editor for HTML, CSS, and JavaScript with real-time preview capabilities. Built with React, TypeScript, and Monaco Editor.

🌟 **[Live Demo](https://live-code-editor-dun-one.vercel.app)**

![Live Code Editor](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## ✨ Features

### 🎨 **Multi-Language Support**
- **HTML Editor** with syntax highlighting
- **CSS Editor** with auto-completion
- **JavaScript Editor** with error detection
- Real-time preview in an isolated iframe

### 🔧 **Editor Capabilities**
- **Live Preview** - See changes instantly as you type (500ms debounce)
- **Error Handling** - Real-time syntax and runtime error detection with line numbers
- **Multiple View Modes**:
  - Horizontal split
  - Vertical split
  - Tabbed interface
  - Focus mode (single editor)
- **Theme Support** - Light and dark themes
- **Adjustable Font Size** - From 10px to 24px
- **Code Export** - Download your work as a complete HTML file

### 🎯 **User Experience**
- **Copy to Clipboard** - Easy code sharing
- **Reset Functionality** - Quick template restoration
- **Status Bar** - Shows character counts and editor statistics
- **Error Console** - Captures and displays runtime errors
- **Console Integration** - Captures console.log outputs from preview

### 🎨 **Design Features**
- Beautiful gradient backgrounds
- Responsive design
- Professional UI with smooth animations
- Syntax highlighting with custom color schemes
- Clean, modern interface

## 🚀 Getting Started

### Prerequisites
- Node.js (recommended: install with [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marcosotomac/Live-Code-Editor.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Live-Code-Editor
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## 🛠️ Built With

- **React 18** - UI framework
- **TypeScript** - Type safety and better development experience
- **Monaco Editor** - VS Code's editor for the web
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── CodeEditor.tsx          # Main editor component
│   ├── editor/
│   │   ├── EditorHeader.tsx    # Header with controls
│   │   ├── EditorPanel.tsx     # Individual editor panels
│   │   ├── ViewModeRenderer.tsx # View mode handling
│   │   ├── StatusBar.tsx       # Bottom status bar
│   │   └── types.ts            # TypeScript interfaces
│   └── ui/                     # Reusable UI components
├── hooks/
│   └── use-toast.ts            # Toast notification hook
├── pages/
│   └── Index.tsx               # Main page component
└── main.tsx                    # Application entry point
```

## 🎮 Usage

1. **Write Code**: Use the HTML, CSS, and JavaScript editors to create your web content
2. **Real-time Preview**: See your changes instantly in the preview pane
3. **Switch Views**: Use the toolbar to change between different layout modes
4. **Adjust Settings**: Modify font size, toggle dark mode, or change view modes
5. **Export**: Download your creation as a complete HTML file
6. **Reset**: Clear everything and start with a fresh template

### Default Template

The editor comes with a beautiful starter template featuring:
- Responsive HTML structure
- Gradient CSS styling
- Interactive JavaScript functionality
- Demonstration of all three languages working together

## 🎨 View Modes

- **Horizontal**: Side-by-side editors with preview on the right
- **Vertical**: Stacked editors with preview at the bottom
- **Tabs**: Switch between editors and preview in tabs
- **Focus**: Concentrate on one editor at a time

## 🔍 Error Handling

The editor provides comprehensive error detection:
- **Syntax Errors**: Highlighted in real-time as you type
- **Runtime Errors**: Caught from the preview iframe with line numbers
- **Console Capture**: JavaScript console.log outputs are captured and displayed

## 🎯 Development Features

### Code Quality
- TypeScript for type safety
- ESLint configuration
- Modular component architecture
- Custom hooks for reusable logic

## 🌐 Deployment

This project is deployed on Vercel and automatically updates with every push to the main branch.

To deploy your own instance:

1. Fork this repository
2. Connect it to Vercel
3. Deploy with default settings
