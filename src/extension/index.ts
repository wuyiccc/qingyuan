import { IExtension } from '@dtinsight/molecule/esm/model'
import { TheFirstExtension } from './TheFirstExtension'
import { DataSourceExtension } from '@/extension/DataSource'
import { TerminalExtension } from '@/extension/Terminal'
import { MenuBarExtension } from '@/extension/menubar'
import AuxiliaryBarExtensions from '@/extension/auxiliaryBar'
import VegaTheme from '@/extension/VegaTheme'
import InitializeExtension from '@/extension/Initialize'

const extensions: IExtension[] = [
  VegaTheme,
  new InitializeExtension(),
  new TheFirstExtension(),
  new DataSourceExtension(),
  new TerminalExtension(),
  new AuxiliaryBarExtensions()
]

export default extensions
