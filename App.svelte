<script lang="ts">
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;

  const { store } = runtime;
</script>

{#if $store}
  <div class="header">
    <h1>Keyboard Shortcuts</h1>
    <p>Get more work done faster with these handy shortcuts!</p>
  </div>
  <div class="shortcuts">
    {#each $store as [name, shortcuts]}
      <div class="app">
        <h1 class="name">{name}</h1>
        <div class="app-shortcuts">
          {#each shortcuts as [keys, description]}
            <div class="shortcut">
              <div class="keys">
                {#each keys as key}
                  {#if key !== "+"}
                    <div class="key key-{key}">{key}</div>
                  {:else}
                    <span class="plus">+</span>
                  {/if}
                {/each}
              </div>
              <div class="description">{description}</div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
{/if}
