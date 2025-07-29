import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Play, 
  Download, 
  Moon, 
  Sun, 
  ZoomIn, 
  ZoomOut,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Layout,
  Columns,
  Rows,
  Focus
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ErrorInfo, ViewMode } from './types';

interface EditorHeaderProps {
  errors: ErrorInfo[];
  fontSize: number;
  isDark: boolean;
  isRunning: boolean;
  viewMode: ViewMode;
  onFontSizeChange: (delta: number) => void;
  onThemeToggle: () => void;
  onViewModeChange: (mode: ViewMode) => void;
  onReset: () => void;
  onDownload: () => void;
  onRun: () => void;
}

const viewModeIcons = {
  horizontal: Columns,
  vertical: Rows,
  tabs: Layout,
  focus: Focus
};

const viewModeLabels = {
  horizontal: 'Horizontal Split',
  vertical: 'Vertical Split',
  tabs: 'Tab View',
  focus: 'Focus Mode'
};

export function EditorHeader({
  errors,
  fontSize,
  isDark,
  isRunning,
  viewMode,
  onFontSizeChange,
  onThemeToggle,
  onViewModeChange,
  onReset,
  onDownload,
  onRun
}: EditorHeaderProps) {
  const CurrentViewIcon = viewModeIcons[viewMode];

  return (
    <div className="border-b bg-card/95 backdrop-blur-sm border-editor-border sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Live Code Editor
          </h1>
          {errors.length === 0 ? (
            <Badge variant="secondary" className="text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              No Errors
            </Badge>
          ) : (
            <Badge variant="destructive" className="animate-pulse">
              <AlertTriangle className="w-3 h-3 mr-1" />
              {errors.length} Error{errors.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {/* View Mode Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <CurrentViewIcon className="w-4 h-4" />
                <span className="hidden sm:inline">{viewModeLabels[viewMode]}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {Object.entries(viewModeLabels).map(([mode, label]) => {
                const Icon = viewModeIcons[mode as ViewMode];
                return (
                  <DropdownMenuItem
                    key={mode}
                    onClick={() => onViewModeChange(mode as ViewMode)}
                    className={viewMode === mode ? 'bg-accent' : ''}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {label}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Font Size Controls */}
          <div className="flex items-center space-x-1 border rounded-md bg-background">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFontSizeChange(-1)}
              disabled={fontSize <= 10}
              className="h-8 w-8 p-0"
            >
              <ZoomOut className="w-3 h-3" />
            </Button>
            <span className="text-sm text-muted-foreground w-8 text-center font-mono">
              {fontSize}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFontSizeChange(1)}
              disabled={fontSize >= 24}
              className="h-8 w-8 p-0"
            >
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>
          
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          
          <Button variant="outline" size="sm" onClick={onDownload}>
            <Download className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onThemeToggle}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            onClick={onRun}
            disabled={isRunning}
            className="bg-gradient-primary hover:opacity-90 shadow-md"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Running...' : 'Run'}
          </Button>
        </div>
      </div>
    </div>
  );
}