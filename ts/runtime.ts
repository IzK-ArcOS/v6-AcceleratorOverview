import { splitAcceleratorString } from "$ts/apps/accelerators";
import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { appLibrary } from "$ts/stores/apps";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";

export class Runtime extends AppRuntime {
  // S<R<id, R<accelerator, description>>>
  public store = Store<[string, [string[], string][]][]>();

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    process.accelerator.store.push({
      // Set the Escape keyboard shortcut to close the app
      key: "escape",
      action() {
        if (app.isOverlay) process.handler.kill(process.pid, true);
      },
    });

    appLibrary.subscribe((v) => this.populate(v)); // Repopulate if the app library changes
  }

  public populate(v: Map<string, App>) {
    const store: [string, [string[], string][]][] = [];

    // Run through every app in the library
    for (const [_, app] of [...v]) {
      if (!app.acceleratorDescriptions) continue; // Don't bother with the app if it doens't have descriptions

      const strings = Object.keys(app.acceleratorDescriptions);

      let shortcuts = [];

      for (const string of strings) {
        shortcuts.push([splitAcceleratorString(string), app.acceleratorDescriptions[string]]);
      }

      store.push([app.metadata.name, shortcuts]); // Push the composited shortcuts to the new store
    }

    this.store.set(store); // Write the new store to the writable
  }
}
