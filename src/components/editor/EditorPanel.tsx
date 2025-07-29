import { Editor } from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Maximize2 } from 'lucide-react';

interface EditorPanelProps {
  language: 'html' | 'css' | 'javascript';
  value: string;
  onChange: (value: string) => void;
  fontSize: number;
  isDark: boolean;
  onCopy: () => void;
  onMaximize?: () => void;
  className?: string;
}

const languageConfig = {
  html: {
    label: 'HTML',
    color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
    monacoLang: 'html'
  },
  css: {
    label: 'CSS', 
    color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
    monacoLang: 'css'
  },
  javascript: {
    label: 'JavaScript',
    color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
    monacoLang: 'javascript'
  }
};

export function EditorPanel({
  language,
  value,
  onChange,
  fontSize,
  isDark,
  onCopy,
  onMaximize,
  className = ''
}: EditorPanelProps) {
  const config = languageConfig[language];
  const lineCount = value.split('\n').length;

  return (
    <Card className={`h-full bg-editor-panel border-editor-border shadow-sm ${className}`}>
      <div className="flex items-center justify-between p-3 border-b border-editor-border bg-gradient-secondary/50">
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className={config.color}>
            {config.label}
          </Badge>
          <span className="text-xs text-muted-foreground font-mono">
            {lineCount} lines
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCopy}
            className="h-7 w-7 p-0"
          >
            <Copy className="w-3 h-3" />
          </Button>
          {onMaximize && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMaximize}
              className="h-7 w-7 p-0"
            >
              <Maximize2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      <div className="h-[calc(100%-3.5rem)]">
        <Editor
          height="100%"
          defaultLanguage={config.monacoLang}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          theme={isDark ? 'vs-dark' : 'light'}
          options={{
            fontSize,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            lineNumbers: 'on',
            renderWhitespace: 'boundary',
            automaticLayout: true,
            suggestOnTriggerCharacters: true,
            quickSuggestions: true,
            tabSize: 2,
            insertSpaces: true,
            folding: true,
            bracketMatching: 'always',
            autoIndent: 'full',
          }}
        />
      </div>
    </Card>
  );
}