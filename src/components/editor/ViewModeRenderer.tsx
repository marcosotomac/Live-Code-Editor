import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EditorPanel } from './EditorPanel';
import { PreviewPanel } from './PreviewPanel';
import { EditorState, ViewMode } from './types';

interface ViewModeRendererProps {
  viewMode: ViewMode;
  code: EditorState;
  setCode: (updater: (prev: EditorState) => EditorState) => void;
  fontSize: number;
  isDark: boolean;
  isRunning: boolean;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  onCopyToClipboard: (content: string, type: string) => void;
  onRunCode: () => void;
  focusedEditor?: 'html' | 'css' | 'javascript' | 'preview';
  onFocusChange?: (editor: 'html' | 'css' | 'javascript' | 'preview') => void;
}

export function ViewModeRenderer({
  viewMode,
  code,
  setCode,
  fontSize,
  isDark,
  isRunning,
  iframeRef,
  onCopyToClipboard,
  onRunCode,
  focusedEditor,
  onFocusChange
}: ViewModeRendererProps) {
  const handleCodeChange = (language: keyof EditorState) => (value: string) => {
    setCode(prev => ({ ...prev, [language]: value }));
  };

  const resizeHandleClass = "w-2 bg-editor-border hover:bg-primary/20 transition-colors duration-200";

  if (viewMode === 'tabs') {
    return (
      <div className="h-[calc(100vh-12rem)] p-4">
        <Tabs defaultValue="html" className="h-full">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="html">HTML</TabsTrigger>
            <TabsTrigger value="css">CSS</TabsTrigger>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="html" className="h-[calc(100%-3rem)] mt-0">
            <EditorPanel
              language="html"
              value={code.html}
              onChange={handleCodeChange('html')}
              fontSize={fontSize}
              isDark={isDark}
              onCopy={() => onCopyToClipboard(code.html, 'HTML')}
            />
          </TabsContent>
          
          <TabsContent value="css" className="h-[calc(100%-3rem)] mt-0">
            <EditorPanel
              language="css"
              value={code.css}
              onChange={handleCodeChange('css')}
              fontSize={fontSize}
              isDark={isDark}
              onCopy={() => onCopyToClipboard(code.css, 'CSS')}
            />
          </TabsContent>
          
          <TabsContent value="javascript" className="h-[calc(100%-3rem)] mt-0">
            <EditorPanel
              language="javascript"
              value={code.javascript}
              onChange={handleCodeChange('javascript')}
              fontSize={fontSize}
              isDark={isDark}
              onCopy={() => onCopyToClipboard(code.javascript, 'JavaScript')}
            />
          </TabsContent>
          
          <TabsContent value="preview" className="h-[calc(100%-3rem)] mt-0">
            <PreviewPanel
              ref={iframeRef}
              isRunning={isRunning}
              onRun={onRunCode}
            />
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  if (viewMode === 'focus' && focusedEditor) {
    return (
      <div className="h-[calc(100vh-12rem)] p-4">
        {focusedEditor === 'html' && (
          <EditorPanel
            language="html"
            value={code.html}
            onChange={handleCodeChange('html')}
            fontSize={fontSize}
            isDark={isDark}
            onCopy={() => onCopyToClipboard(code.html, 'HTML')}
          />
        )}
        {focusedEditor === 'css' && (
          <EditorPanel
            language="css"
            value={code.css}
            onChange={handleCodeChange('css')}
            fontSize={fontSize}
            isDark={isDark}
            onCopy={() => onCopyToClipboard(code.css, 'CSS')}
          />
        )}
        {focusedEditor === 'javascript' && (
          <EditorPanel
            language="javascript"
            value={code.javascript}
            onChange={handleCodeChange('javascript')}
            fontSize={fontSize}
            isDark={isDark}
            onCopy={() => onCopyToClipboard(code.javascript, 'JavaScript')}
          />
        )}
        {focusedEditor === 'preview' && (
          <PreviewPanel
            ref={iframeRef}
            isRunning={isRunning}
            onRun={onRunCode}
          />
        )}
      </div>
    );
  }

  // Horizontal or Vertical layouts
  return (
    <div className="h-[calc(100vh-12rem)] p-4">
      <PanelGroup direction={viewMode === 'vertical' ? 'vertical' : 'horizontal'}>
        <Panel defaultSize={25} minSize={15}>
          <EditorPanel
            language="html"
            value={code.html}
            onChange={handleCodeChange('html')}
            fontSize={fontSize}
            isDark={isDark}
            onCopy={() => onCopyToClipboard(code.html, 'HTML')}
            onMaximize={() => onFocusChange?.('html')}
          />
        </Panel>

        <PanelResizeHandle className={resizeHandleClass} />

        <Panel defaultSize={25} minSize={15}>
          <EditorPanel
            language="css"
            value={code.css}
            onChange={handleCodeChange('css')}
            fontSize={fontSize}
            isDark={isDark}
            onCopy={() => onCopyToClipboard(code.css, 'CSS')}
            onMaximize={() => onFocusChange?.('css')}
          />
        </Panel>

        <PanelResizeHandle className={resizeHandleClass} />

        <Panel defaultSize={25} minSize={15}>
          <EditorPanel
            language="javascript"
            value={code.javascript}
            onChange={handleCodeChange('javascript')}
            fontSize={fontSize}
            isDark={isDark}
            onCopy={() => onCopyToClipboard(code.javascript, 'JavaScript')}
            onMaximize={() => onFocusChange?.('javascript')}
          />
        </Panel>

        <PanelResizeHandle className={resizeHandleClass} />

        <Panel defaultSize={25} minSize={20}>
          <PreviewPanel
            ref={iframeRef}
            isRunning={isRunning}
            onRun={onRunCode}
            onMaximize={() => onFocusChange?.('preview')}
          />
        </Panel>
      </PanelGroup>
    </div>
  );
}