import { SafeMode } from "$state/Desktop/ts/store";
import { KeyboardIcon } from "$ts/images/general";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const KeyboardShortcuts: App = {
  metadata: {
    name: "Keyboard Shortcuts",
    description: "View the keyboard shortcuts in ArcOS",
    author: "The ArcOS Team",
    version: "1.0.0",
    icon: KeyboardIcon,
    hidden: true,
    dependsOn: ["ArcShell"],
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "KeyboardShortcuts",
  size: { w: 1000, h: 750 },
  minSize: { w: 1000, h: 750 },
  maxSize: { w: 1000, h: 750 },
  pos: { x: 60, y: 60 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: false,
  },
  controls: {
    minimize: true,
    maximize: true,
    close: true,
  },
  singleInstance: true,
  loadCondition: () => !SafeMode.get(),
};
