import { splitAcceleratorString } from "$ts/apps/accelerators";
import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { appLibrary } from "$ts/stores/apps";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";

export class Runtime extends AppRuntime {
  // S<R<id, R<accelerator, description>>>
  public store = Store<[string, [string[], string][]][]>()

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    process.accelerator.store.push({
      key: "escape",
      action() {
        if (app.isOverlay)
          process.handler.kill(process.pid, true);
      }
    })

    appLibrary.subscribe((v) => this.populate(v));
  }

  public populate(v: Map<string, App>) {
    const store: [string, [string[], string][]][] = [];

    for (const [_, app] of [...v]) {
      if (!app.acceleratorDescriptions) continue;

      const strings = Object.keys(app.acceleratorDescriptions);

      let shortcuts = [];

      for (const string of strings) {
        shortcuts.push([splitAcceleratorString(string), app.acceleratorDescriptions[string]])
      }

      store.push([app.metadata.name, shortcuts]);
    }

    this.store.set(store);
  }
}