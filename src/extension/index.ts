import { IExtension } from '@dtinsight/molecule/esm/model'
import { TheFirstExtension } from './TheFirstExtension'
import { DataSourceExtension } from '@/extension/DataSource'
import { TerminalExtension } from '@/extension/Terminal'
import { MenuBarExtension } from '@/extension/menubar'
import AuxiliaryBarExtensions from '@/extension/auxiliaryBar'

const extensions: IExtension[] = [
  new TheFirstExtension(),
  new DataSourceExtension(),
  new TerminalExtension(),
  new MenuBarExtension(),
  new AuxiliaryBarExtensions()
]

export default extensions
