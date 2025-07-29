import { useEffect, useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle } from 'lucide-react';
import { EditorHeader } from './editor/EditorHeader';
import { ViewModeRenderer } from './editor/ViewModeRenderer';
import { StatusBar } from './editor/StatusBar';
import { EditorState, ErrorInfo, ViewMode, EditorSettings } from './editor/types';

export default function CodeEditor() {
  const [settings, setSettings] = useState<EditorSettings>({
    fontSize: 14,
    isDark: false,
    viewMode: 'horizontal',
    focusedEditor: undefined
  });
  const [code, setCode] = useState<EditorState>({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Preview</title>
</head>
<body>
    <div class="container">
        <h1>Welcome to the Live Code Editor</h1>
        <p>Edit the HTML, CSS, and JavaScript to see real-time changes!</p>
        <button onclick="showMessage()">Click me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`,
    css: `/* CSS Styles */
.container {
    max-width: 800px;
    margin: 40px auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 12px;
    color: white;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

button {
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

button:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

#output {
    margin-top: 2rem;
    padding: 1rem;
    background: rgba(0,0,0,0.1);
    border-radius: 8px;
    min-height: 50px;
}`,
    javascript: `// JavaScript Code
function showMessage() {
    const output = document.getElementById('output');
    const messages = [
        '🎉 Great job!',
        '✨ Keep coding!',
        '🚀 You\'re awesome!',
        '💫 Nice work!',
        '🎯 Perfect!'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    output.innerHTML = \`<h3>\${randomMessage}</h3><p>Clicked at: \${new Date().toLocaleTimeString()}</p>\`;
    
    // Add some animation
    output.style.transform = 'scale(0.95)';
    setTimeout(() => {
        output.style.transform = 'scale(1)';
    }, 150);
}

// Console log for demonstration
console.log('🔥 Live Code Editor is running!');

// Error boundary example (uncomment to test error handling)
// throw new Error('This is a test error for demonstration');`
  });

  const [errors, setErrors] = useState<ErrorInfo[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { toast } = useToast();

  // Theme toggle
  useEffect(() => {
    if (settings.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.isDark]);

  // Auto-run code with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      runCode();
    }, 500);

    return () => clearTimeout(timer);
  }, [code]);

  const runCode = () => {
    if (!iframeRef.current) return;

    setIsRunning(true);
    setErrors([]);

    try {
      const fullCode = `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 0; }
                ${code.css}
            </style>
        </head>
        <body>
            ${code.html}
            <script>
                // Error boundary for runtime errors
                window.addEventListener('error', function(e) {
                    parent.postMessage({
                        type: 'runtime-error',
                        message: e.message,
                        line: e.lineno,
                        column: e.colno
                    }, '*');
                });
                
                // Capture console logs
                const originalLog = console.log;
                console.log = function(...args) {
                    originalLog.apply(console, args);
                    parent.postMessage({
                        type: 'console-log',
                        message: args.join(' ')
                    }, '*');
                };
                
                try {
                    ${code.javascript}
                } catch (error) {
                    parent.postMessage({
                        type: 'runtime-error',
                        message: error.message
                    }, '*');
                }
            </script>
        </body>
        </html>
      `;

      const iframe = iframeRef.current;
      iframe.srcdoc = fullCode;
    } catch (error) {
      setErrors([{
        type: 'syntax',
        message: error instanceof Error ? error.message : 'Unknown syntax error'
      }]);
    }

    setTimeout(() => setIsRunning(false), 300);
  };

  // Handle iframe messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'runtime-error') {
        setErrors(prev => [...prev, {
          type: 'runtime',
          message: event.data.message,
          line: event.data.line,
          column: event.data.column
        }]);
      } else if (event.data.type === 'console-log') {
        console.log('Preview:', event.data.message);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(10, Math.min(24, settings.fontSize + delta));
    setSettings(prev => ({ ...prev, fontSize: newSize }));
  };

  const toggleTheme = () => {
    setSettings(prev => ({ ...prev, isDark: !prev.isDark }));
  };

  const changeViewMode = (mode: ViewMode) => {
    setSettings(prev => ({ 
      ...prev, 
      viewMode: mode,
      focusedEditor: mode === 'focus' ? prev.focusedEditor || 'html' : undefined
    }));
  };

  const changeFocusedEditor = (editor: 'html' | 'css' | 'javascript' | 'preview') => {
    setSettings(prev => ({ 
      ...prev, 
      viewMode: 'focus',
      focusedEditor: editor
    }));
  };

  const resetCode = () => {
    setCode({
      html: '<!-- Start coding your HTML here -->\n<h1>Hello World!</h1>',
      css: '/* Start styling here */\nh1 {\n  color: #333;\n  text-align: center;\n}',
      javascript: '// Start scripting here\nconsole.log("Hello from JavaScript!");'
    });
    toast({
      title: "Code Reset",
      description: "Editor has been reset to default template."
    });
  };

  const copyToClipboard = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: `${type} code copied to clipboard.`
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard.",
        variant: "destructive"
      });
    }
  };

  const downloadCode = () => {
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Code Editor Export</title>
    <style>
${code.css}
    </style>
</head>
<body>
${code.html}
    <script>
${code.javascript}
    </script>
</body>
</html>`;

    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code-editor-export.html';
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Download Complete",
      description: "Your code has been downloaded as an HTML file."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <EditorHeader
        errors={errors}
        fontSize={settings.fontSize}
        isDark={settings.isDark}
        isRunning={isRunning}
        viewMode={settings.viewMode}
        onFontSizeChange={adjustFontSize}
        onThemeToggle={toggleTheme}
        onViewModeChange={changeViewMode}
        onReset={resetCode}
        onDownload={downloadCode}
        onRun={runCode}
      />

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-6 py-3">
          <div className="space-y-2">
            {errors.map((error, index) => (
              <div key={index} className="text-sm text-destructive flex items-start space-x-2 p-2 bg-destructive/5 rounded-md">
                <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">
                    {error.type === 'syntax' ? 'Syntax' : 'Runtime'} Error:
                  </span>
                  <span className="ml-2">{error.message}</span>
                  {error.line && (
                    <div className="text-xs text-muted-foreground mt-1">
                      Line {error.line}{error.column ? `, Column ${error.column}` : ''}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <ViewModeRenderer
        viewMode={settings.viewMode}
        code={code}
        setCode={setCode}
        fontSize={settings.fontSize}
        isDark={settings.isDark}
        isRunning={isRunning}
        iframeRef={iframeRef}
        onCopyToClipboard={copyToClipboard}
        onRunCode={runCode}
        focusedEditor={settings.focusedEditor}
        onFocusChange={changeFocusedEditor}
      />

      <StatusBar
        code={code}
        fontSize={settings.fontSize}
        isDark={settings.isDark}
        viewMode={settings.viewMode}
      />
    </div>
  );
}