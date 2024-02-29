import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar'
import { IActionBarItemProps, ITreeNodeItemProps } from '@dtinsight/molecule/esm/components'
import molecule from '@dtinsight/molecule'
import 'reflect-metadata'
import { ICollapseItem } from '@dtinsight/molecule/esm/components/collapse'
import TreeDTO from '@/infrastructure/pojo/dto/TreeDTO.ts'
import { ConfigProvider, Tree, TreeDataNode } from 'antd'
import { FileOutlined, CloudServerOutlined, FolderOutlined } from '@ant-design/icons'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import IconFont from '@/component/icon/IconFont.tsx'
import { DirectoryTreeProps } from 'antd/lib/tree'
import AntdTreeDTO from '@/infrastructure/pojo/dto/AntdTreeDTO.tsx'
const { DirectoryTree } = Tree
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

    const treeList = AntdTreeDTO.parseDevFileTree(devFileTreeList)

    setData(treeList)
  }

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const treeData: TreeDataNode[] = [
    {
      title: 'parent 0',
      key: '0-0',
      children: []
    },
    {
      title: 'parent 1',
      key: '0-1',
      children: [
        { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
        { title: 'leaf 1-1', key: '0-1-1', isLeaf: true }
      ]
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
    </ConfigProvider>
  )
}
