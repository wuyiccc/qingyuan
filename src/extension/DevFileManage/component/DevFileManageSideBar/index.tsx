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
import { BuiltInEditorTabDataType, IEditorTab } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import DevFileManageCreate from '@/extension/DevFileManage/component/DevFileManageCreate'
import DevFileManageUpdate from '@/extension/DevFileManage/component/DevFileManageUpdate'
import DevFileManageNginxConfFileEditor from '@/extension/DevFileManage/component/DevFileManageNginxConfFileEditor'
import CurrentEditorDataDTO from '@/infrastructure/pojo/dto/CurrentEditorDataDTO.ts'
import EditorDataTypeEnum from '@/infrastructure/pojo/enumeration/EditorDataTypeEnum.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import DevFileTypeConstants from '@/infrastructure/constants/DevFileTypeConstants.ts'
import DevFileRemoteServerEditor from '@/extension/DevFileManage/component/DevFileRemoteServerEditor'
import DevFileNginxServiceEditor from '@/extension/DevFileManage/component/DevFileNginxServiceEditor'

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

    LocalDB.set(LocalDBConstants.DEV_FILE_MANAGE_ANTD_TREE, treeList)
  }

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    setSelectedTreeNode(info.node)

    // 如果选中的是目录, 则不打开页面
    const selectedData = AntdTreeDTO.findAntdTreeDTOByKey(data, info.node.key as string)
    if (selectedData.type === 1) {
      return
    }

    const tableData: IEditorTab = {
      id: VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX + info.node.key,
      name: info.node.title as string,
      breadcrumb: info.node.title
        ? (info.node.title as string).split('/').map((local: string) => ({ id: local, name: local }))
        : [],
      renderPane: doRenderEditorPane(selectedData.type, selectedData.key, selectedData.parentId)
    }

    molecule.editor.open(tableData)
  }

  const doRenderEditorPane = (type, id, parentId) => {
    if (type === DevFileTypeConstants.REMOTE_SERVER.type) return () => <DevFileRemoteServerEditor id={id} />
    if (type === DevFileTypeConstants.NGINX_SERVICE.type)
      return () => <DevFileNginxServiceEditor id={id} parentId={parentId} />

    if (type === DevFileTypeConstants.NGINX_CONFIG_FILE.type) {
      return () => <DevFileManageNginxConfFileEditor id={id} />
    }

    return <div>空页面</div>
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

  const doRemoveDevFile = async () => {
    setShowRightContextMenu(false)

    await DevFileApi.removeDevFile(selectedTreeNode.key)

    const groupId = molecule.editor.getGroupIdByTab(
      VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX + selectedTreeNode.key
    )
    molecule.editor.closeTab(
      VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX + selectedTreeNode.key,
      groupId
    )

    fetchData()
  }

  const openUpdateDevFilePage = () => {
    setShowRightContextMenu(false)

    const groupId = molecule.editor.getGroupIdByTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_UPDATE_ID)
    molecule.editor.closeTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_UPDATE_ID, groupId)

    const tableData: IEditorTab = {
      id: VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_UPDATE_ID,
      name: '更新文件',
      renderPane: () => {
        return (
          <DevFileManageUpdate
            id={selectedTreeNode.key}
            parentId={selectedTreeNode.parentId}
            filename={selectedTreeNode.title}
            onUpdateDevFileCallback={(id, filename) => openUpdateDevFilePageCallback(id, filename)}
          />
        )
      }
    }

    molecule.editor.open(tableData)
  }

  const openUpdateDevFilePageCallback = (id, filename) => {
    molecule.editor.closeTab(
      VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_UPDATE_ID,
      molecule.editor.getGroupIdByTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_UPDATE_ID)
    )
    fetchData()

    // 更新tab名称
    const groupId = molecule.editor.getGroupIdByTab(VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX + id)
    const isValidGroupId = !!groupId || groupId === 0
    if (isValidGroupId) {
      const prevTab = molecule.editor.getTabById<BuiltInEditorTabDataType>(
        VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX + id,
        groupId
      )
      const newTab: IEditorTab = {
        id: VegaEditorConstants.EDITOR_TAB_DEV_FILE_MANAGE_EDIT_ID_PREFIX + id,
        name: filename
      }
      // const prevTabData = prevTab?.data
      // if (prevTabData && prevTabData.path) {
      //   newTab.data = { ...prevTabData }
      // }
      molecule.editor.updateTab(newTab)
    }
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
      label: <div onClick={openAddDevFilePage}>新建</div>,
      key: '1'
    },
    {
      label: <div onClick={openUpdateDevFilePage}>修改</div>,
      key: '2'
    },
    {
      label: <div onClick={doRemoveDevFile}>删除</div>,
      key: '4'
    },
    {
      label: <div onClick={reload}>刷新</div>,
      key: '5'
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
