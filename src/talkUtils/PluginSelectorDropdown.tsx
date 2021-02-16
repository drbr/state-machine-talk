import React from 'react';
import { Dropdown } from './Dropdown';
import { BasePlugin, PluginManager } from './PluginManager';

export type PluginSelectorDropdownProps<P extends BasePlugin> = {
  label: string;
  pluginManager: PluginManager<P>;
  selectedPlugin: P;
  onChange: (plugin: P) => void;
};

export function PluginSelectorDropdown<P extends BasePlugin>(
  props: PluginSelectorDropdownProps<P>
) {
  const { pluginManager, selectedPlugin, onChange } = props;

  const dropdownItems = React.useMemo(() => {
    return pluginManager.getPluginsInOrder().map((p) => ({
      value: p.name,
      name: p.name,
    }));
  }, [pluginManager]);

  const setSelectedPlugin = React.useCallback(
    (key: string) => onChange(pluginManager.getPluginByKey(key)!),
    [onChange, pluginManager]
  );

  return (
    <Dropdown
      label={props.label}
      items={dropdownItems}
      selectedValue={selectedPlugin.name}
      onChange={setSelectedPlugin}
    />
  );
}
