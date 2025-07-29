import { EditorState, ViewMode } from './types';

interface StatusBarProps {
  code: EditorState;
  fontSize: number;
  isDark: boolean;
  viewMode: ViewMode;
}

export function StatusBar({ code, fontSize, isDark, viewMode }: StatusBarProps) {
  const totalLines = Object.values(code).reduce((acc, val) => acc + val.split('\n').length, 0);
  const totalChars = Object.values(code).reduce((acc, val) => acc + val.length, 0);

  return (
    <div className="bg-editor-status border-t border-editor-border px-6 py-2 text-xs text-muted-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="font-medium">Monaco Editor v1.84.0</span>
          <span className="text-border">•</span>
          <span>View: {viewMode.charAt(0).toUpperCase() + viewMode.slice(1)}</span>
          <span className="text-border">•</span>
          <span>Font: {fontSize}px</span>
          <span className="text-border">•</span>
          <span>Theme: {isDark ? 'Dark' : 'Light'}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span>Lines: {totalLines}</span>
          <span className="text-border">•</span>
          <span>Characters: {totalChars.toLocaleString()}</span>
          <span className="text-border">•</span>
          <span className="text-primary font-medium">Ready</span>
        </div>
      </div>
    </div>
  );
}