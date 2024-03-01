import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar'
import { IActionBarItemProps } from '@dtinsight/molecule/esm/components'
import molecule from '@dtinsight/molecule'
import 'reflect-metadata'
import { ConfigProvider, Dropdown, MenuProps, Tree } from 'antd'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import { DirectoryTreeProps } from 'antd/lib/tree'
import AntdTreeDTO from '@/infrastructure/pojo/dto/AntdTreeDTO.tsx'
import { IEditorTab } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import DevFileManageCreate from '@/extension/DevFileManage/component/DevFileManageCreate'

const { DirectoryTree } = Tree
const Toolbar = molecule.component.Toolbar
const Collapse = molecule.component.Collapse
export default function DevFileManageSideBarView() {
  const [data, setData] = useState<any[]>()
  const [showRightContextMenu, setShowRightContextMenu] = useState<boolean>(false)
  const [selectedTreeNode, setSelectedTreeNode] = useState<any>()

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    setShowRightContextMenu(false)
    fetchData()
  }
  const fetchData = async () => {
    const devFileTreeList = await DevFileApi.getDevFileTree('')

    const treeList = AntdTreeDTO.parseDevFileTree(devFileTreeList)

    setData(treeList)
  }

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    setSelectedTreeNode(info.node)
  }

  const onMenuRightClick = () => {
    setShowRightContextMenu(!showRightContextMenu)
  }

  const onMenuClick = () => {
    setShowRightContextMenu(false)
  }

  const openAddDevFilePage = () => {
    setShowRightContextMenu(false)

    const groupId = molecule.editor.getGroupIdByTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID)
    molecule.editor.closeTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID, groupId)

    const tableData: IEditorTab = {
      id: VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_CREATE_ID,
      name: '新建文件',
      renderPane: () => {
        return (
          <DevFileManageCreate
            parentId={selectedTreeNode.key}
            parentDevFileName={selectedTreeNode.title}
            onCreateDevFileCallback={fetchData}
          />
        )
      }
    }

    molecule.editor.open(tableData)
  }

  const renderHeaderToolBar: IActionBarItemProps[] = [
    {
      icon: 'refresh',
      id: 'reloadDevTree',
      title: '刷新',
      onClick: () => reload()
    }
  ]

  const items: MenuProps['items'] = [
    {
      label: <div onClick={reload}>刷新</div>,
      key: '1'
    },
    {
      label: <div onClick={openAddDevFilePage}>新建</div>,
      key: '2'
    }
  ]

  return (
    <ConfigProvider
      theme={{
        token: {
          motionDurationMid: '0s',
          colorBgElevated: '#282A36',
          colorText: '#bdbdbd',
          borderRadiusLG: 0,
          borderRadiusSM: 0,
          borderRadiusXS: 0,
          fontSize: 12,
          paddingXS: 0,
          paddingXXS: 0
        }
      }}
    >
      <div className={styles.sideBarWrapper}>
        <Header title='开发文件管理' toolbar={<Toolbar data={renderHeaderToolBar} />} />
        <Dropdown menu={{ items }} trigger={['contextMenu']} open={showRightContextMenu}>
          <div onContextMenu={onMenuRightClick} onClick={onMenuClick}>
            <Content>
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainer: '#1e2227'
                  },
                  components: {
                    Tree: {
                      directoryNodeSelectedBg: '#3e4452'
                    }
                  }
                }}
              >
                <DirectoryTree treeData={data} onSelect={onSelect} />
              </ConfigProvider>
            </Content>
          </div>
        </Dropdown>
      </div>
    </ConfigProvider>
  )
}
