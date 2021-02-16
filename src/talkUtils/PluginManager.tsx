/** The type from which all plugins must extend */
export type BasePlugin = {
  name: string;
};

export class PluginManager<P extends BasePlugin> {
  private registeredPlugins: P[] = [];

  /**
   * Creates a new plugin manager, optionally registering the given plugins.
   * @param plugins
   */
  public constructor(...plugins: P[]) {
    if (plugins) {
      this.registerPlugins(plugins);
    }
  }

  /**
   * Registers a plugin with this manager, appending it to the end of the list.
   * @param name Name of the plugin. Should be unique to all the plugins in this manager
   * @param plugin The plugin
   */
  public registerPlugin(plugin: P): void {
    if (this.getPluginByKey(plugin.name)) {
      throw new Error(
        `Cannot register plugin; a plugin with name ${plugin.name} has already been registered.`
      );
    }
    this.registeredPlugins.push({ ...plugin });
  }

  /**
   * Registers multiple plugins, as if `registerPlugin` were called multiple times.
   * @param plugins
   */
  public registerPlugins(plugins: P[]): void {
    for (const p of plugins) {
      this.registerPlugin(p);
    }
  }

  /**
   * Returns the names of all registered plugins, in the order in which they were registered
   */
  public getPluginsInOrder(): ReadonlyArray<P> {
    return this.registeredPlugins;
  }

  public getPluginByKey(key: string): P | undefined {
    const plugin = this.registeredPlugins.find((p) => p.name === key);
    return plugin;
  }
}
