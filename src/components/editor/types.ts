export interface EditorState {
  html: string;
  css: string;
  javascript: string;
}

export interface ErrorInfo {
  type: 'syntax' | 'runtime';
  message: string;
  line?: number;
  column?: number;
}

export type ViewMode = 'horizontal' | 'vertical' | 'tabs' | 'focus';

export interface EditorSettings {
  fontSize: number;
  isDark: boolean;
  viewMode: ViewMode;
  focusedEditor?: 'html' | 'css' | 'javascript' | 'preview';
}