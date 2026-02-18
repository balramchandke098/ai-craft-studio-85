import { useState } from "react";

export interface WebProject {
  id: string;
  name: string;
  description: string;
  thumbnail?: string;
  lastEdited: string;
  status: "draft" | "published";
  pages: number;
}

export interface EditorComponent {
  id: string;
  type: string;
  label: string;
  icon: string;
  category: "layout" | "content" | "media" | "form" | "block";
  props: Record<string, any>;
  children?: EditorComponent[];
}

export interface CanvasElement {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: CanvasElement[];
  style: Record<string, string>;
}

export interface PageData {
  id: string;
  name: string;
  slug: string;
  elements: CanvasElement[];
}

export type DeviceMode = "desktop" | "tablet" | "mobile";

export const DEVICE_WIDTHS: Record<DeviceMode, number> = {
  desktop: 1280,
  tablet: 768,
  mobile: 375,
};
