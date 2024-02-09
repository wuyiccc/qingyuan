import React from 'react'
import molecule, { create, Workbench } from '@dtinsight/molecule'
import '@dtinsight/molecule/esm/style/mo.css'
import extensions from './extension'
import { ID_EXPLORER } from '@dtinsight/molecule/esm/common/id'

const moInstance = create({
  extensions
})

const App = () => moInstance.render(<Workbench />)

export default App
