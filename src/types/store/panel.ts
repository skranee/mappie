export type PanelMode = 'search' | 'saved' | 'landmark';

export interface PanelSlice {
  isOpen: boolean;
  mode: PanelMode;
}
