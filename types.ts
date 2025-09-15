
export interface Slide {
  title: string;
  content: string[];
  notes: string;
}

export interface Theme {
  name: string;
  bg: string;
  title: string;
  text: string;
  accent: string;
  font: {
    title: string;
    body: string;
  };
}

export enum View {
  INPUT = 'INPUT',
  EDITOR = 'EDITOR',
}
