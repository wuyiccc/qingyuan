import { IExtension } from '@dtinsight/molecule/esm/model'
import { TheFirstExtension } from './TheFirstExtension'
import { DataSourceExtension } from '@/extension/DataSource'
import { TerminalExtension } from '@/extension/Terminal'

const extensions: IExtension[] = [new TheFirstExtension(), new DataSourceExtension(), new TerminalExtension()]

export default extensions
