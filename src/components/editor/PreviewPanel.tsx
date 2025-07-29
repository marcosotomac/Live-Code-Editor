import { forwardRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Maximize2 } from 'lucide-react';

interface PreviewPanelProps {
  isRunning: boolean;
  onRun: () => void;
  onMaximize?: () => void;
  className?: string;
}

export const PreviewPanel = forwardRef<HTMLIFrameElement, PreviewPanelProps>(
  ({ isRunning, onRun, onMaximize, className = '' }, ref) => {
    return (
      <Card className={`h-full bg-editor-panel border-editor-border shadow-sm ${className}`}>
        <div className="flex items-center justify-between p-3 border-b border-editor-border bg-gradient-secondary/50">
          <div className="flex items-center space-x-3">
            <Badge variant="default" className="bg-gradient-primary text-white shadow-sm">
              Live Preview
            </Badge>
            {isRunning && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span>Running</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onRun}
              className="h-7 w-7 p-0"
            >
              <Play className="w-3 h-3" />
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
        <div className="h-[calc(100%-3.5rem)] bg-background rounded-b-lg overflow-hidden">
          <iframe
            ref={ref}
            className="w-full h-full border-0"
            title="Live Preview"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      </Card>
    );
  }
);

PreviewPanel.displayName = 'PreviewPanel';