import { IActivityBarItem, IEditorTab, ISidebarPane } from '@dtinsight/molecule/esm/model'
import DataSourceSidebarView from '@/view/DataSource/dataSourceSidebar.tsx'
import React from 'react'
import CreateDataSourceView from '@/view/DataSource/createDataSource.tsx'
import molecule from '@dtinsight/molecule'

export const DATA_SOURCE_ID = 'DataSource'

export const dataSourceActivityBar: IActivityBarItem = {
  id: DATA_SOURCE_ID,
  sortIndex: 1,
  name: 'Data Source',
  title: 'Data Source Management',
  render: () => <div style={{ textAlign: 'center', lineHeight: '48px' }}>用户</div>
}

export const dataSourceSideBar: ISidebarPane = {
  id: DATA_SOURCE_ID,
  title: 'DataSourcePane',
  render: () => {
    return <DataSourceSidebarView />
  }
}

export const createDataSourceTab: IEditorTab = {
  id: DATA_SOURCE_ID,
  name: 'Create Data Source',
  renderPane: () => {
    return <CreateDataSourceView />
  }
}

export function openCreateDataSourceView() {
  molecule.editor.open(createDataSourceTab)
}
export function existCreateDataSourceView() {
  const group = molecule.editor.getState().current
  if (group) {
    molecule.editor.closeTab(createDataSourceTab.id!, group.id!)
  }
}
