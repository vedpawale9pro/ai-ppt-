
import type { Theme } from './types';

export const THEMES: Theme[] = [
  {
    name: 'Professional',
    bg: '#ffffff',
    title: '#0d47a1',
    text: '#333333',
    accent: '#1565c0',
    font: {
      title: 'Georgia, serif',
      body: 'Helvetica, sans-serif',
    },
  },
  {
    name: 'Creative',
    bg: '#333333',
    title: '#fdd835',
    text: '#eeeeee',
    accent: '#f9a825',
    font: {
      title: "'Trebuchet MS', sans-serif",
      body: "'Lucida Sans Unicode', sans-serif",
    },
  },
  {
    name: 'Minimalist',
    bg: '#f5f5f5',
    title: '#212121',
    text: '#424242',
    accent: '#757575',
    font: {
      title: 'Helvetica Neue, sans-serif',
      body: 'Helvetica Neue, sans-serif',
    },
  },
  {
    name: 'Ocean',
    bg: '#e0f7fa',
    title: '#006064',
    text: '#004d40',
    accent: '#00838f',
    font: {
      title: 'Verdana, sans-serif',
      body: 'Arial, sans-serif',
    },
  },
];
