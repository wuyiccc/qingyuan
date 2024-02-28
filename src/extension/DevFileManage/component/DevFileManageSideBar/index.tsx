import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar'
import { IActionBarItemProps, ITreeNodeItemProps } from '@dtinsight/molecule/esm/components'
import molecule from '@dtinsight/molecule'
import 'reflect-metadata'
import { ICollapseItem } from '@dtinsight/molecule/esm/components/collapse'
import TreeDTO from '@/infrastructure/pojo/dto/TreeDTO.ts'
import { ConfigProvider } from 'antd'
import { FileOutlined, CloudServerOutlined, FolderOutlined } from '@ant-design/icons'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'

const Tree = molecule.component.TreeView
const Toolbar = molecule.component.Toolbar
const Collapse = molecule.component.Collapse
export default function DevFileManageSideBarView() {
  const [data, setData] = useState<any[]>()
  const [selectedUserId, setSelectedUserId] = useState(undefined)

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    fetchData()
  }

  const renderHeaderToolBar: IActionBarItemProps[] = []

  const fetchData = async () => {
    const devFileTreeList = await DevFileApi.getDevFileTree('')

    const treeList = TreeDTO.parseDevFileTree(devFileTreeList)

    setData(treeList)
  }

  const renderCollapse: ICollapseItem[] = [
    {
      id: 'devFileList',
      name: '开发文件列表',
      renderPanel: () => {
        return <Tree data={data} onSelect={onSelectedUser} renderTitle={titleRender} />
      }
    }
  ]

  const onSelectedUser = (node: ITreeNodeItemProps) => {
    console.log('选中用户')
  }

  const titleRender = (node, index, isLeaf) => {
    console.log(node)
    return (
      <div className={styles.treeItem}>
        {node.fileType === '1' ? (
          <FolderOutlined />
        ) : node.fileType === '3' ? (
          <CloudServerOutlined />
        ) : (
          <FileOutlined />
        )}
        <span>{node.name}</span>
      </div>
    )
  }

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
        <Content>
          <Collapse data={renderCollapse} />
        </Content>
      </div>
    </ConfigProvider>
  )
}
