import { IExtension } from '@dtinsight/molecule/esm/model'
import { TheFirstExtension } from './TheFirstExtension'
import { DataSourceExtension } from '@/extension/DataSource'

const extensions: IExtension[] = [new TheFirstExtension(), new DataSourceExtension()]

export default extensions
