import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar'
import { IActionBarItemProps, ITreeNodeItemProps } from '@dtinsight/molecule/esm/components'
import molecule from '@dtinsight/molecule'
import 'reflect-metadata'
import { ICollapseItem } from '@dtinsight/molecule/esm/components/collapse'
import TreeDTO from '@/infrastructure/pojo/dto/TreeDTO.ts'
import { ConfigProvider, Dropdown, MenuProps, Tree, TreeDataNode } from 'antd'
import { FileOutlined, CloudServerOutlined, FolderOutlined } from '@ant-design/icons'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import IconFont from '@/component/icon/IconFont.tsx'
import { DirectoryTreeProps } from 'antd/lib/tree'
import AntdTreeDTO from '@/infrastructure/pojo/dto/AntdTreeDTO.tsx'
import DevFileCreateBO from '@/infrastructure/pojo/bo/DevFileCreateBO.ts'
import DateUtils from '@/infrastructure/util/common/DateUtils.ts'
const { DirectoryTree } = Tree
const Toolbar = molecule.component.Toolbar
const Collapse = molecule.component.Collapse
export default function DevFileManageSideBarView() {
  const [data, setData] = useState<any[]>()
  const [showRightContextMenu, setShowRightContextMenu] = useState<boolean>(false)

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    console.log('刷新数据')
    setShowRightContextMenu(false)
    fetchData()
  }
  const fetchData = async () => {
    const devFileTreeList = await DevFileApi.getDevFileTree('')

    const treeList = AntdTreeDTO.parseDevFileTree(devFileTreeList)

    setData(treeList)
  }

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const onMenuRightClick = () => {
    setShowRightContextMenu(!showRightContextMenu)
  }

  const onMenuClick = () => {
    setShowRightContextMenu(false)
  }

  const onAddRootDevFile = async () => {
    const devFile = new DevFileCreateBO()
    devFile.fileType = 1
    devFile.filename = DateUtils.toDateTime(new Date())
    devFile.parentId = '0'
    await DevFileApi.addDevFile(devFile)
  }

  const renderHeaderToolBar: IActionBarItemProps[] = [
    {
      icon: 'refresh',
      id: 'reloadDevTree',
      title: '刷新',
      onClick: () => reload()
    },
    {
      icon: 'add',
      id: 'addDevFile',
      title: '新增',
      onClick: () => onAddRootDevFile()
    }
  ]

  const items: MenuProps['items'] = [
    {
      label: <div onClick={reload}>刷新</div>,

      key: '1'
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
