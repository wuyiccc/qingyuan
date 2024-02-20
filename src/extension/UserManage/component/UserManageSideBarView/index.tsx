import React from 'react'
import styles from './index.module.less'
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar'
import { IActionBarItemProps, ITreeNodeItemProps } from '@dtinsight/molecule/esm/components'
import molecule from '@dtinsight/molecule'
import 'reflect-metadata'
import { ICollapseItem } from '@dtinsight/molecule/esm/components/collapse'
import UserManageApi from '@/infrastructure/api/UserManageApi.ts'
import UserManagePageQueryBO from '@/infrastructure/pojo/bo/UserManagePageQueryBO.ts'
import TreeDTO from '@/infrastructure/pojo/dto/TreeDTO.ts'
import { IEditorTab } from '@dtinsight/molecule/esm/model'
import LeftBarConstants from '@/infrastructure/constants/LeftBarConstants.ts'
import { UserManageInfoView } from '@/extension/UserManage/component/UserManageInfoView'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
const Tree = molecule.component.TreeView
const Toolbar = molecule.component.Toolbar
const Collapse = molecule.component.Collapse
export class UserManageSideBarView extends React.Component {
  state = {
    data: [],
    currentUser: undefined
  }

  render() {
    return (
      <div className={styles.sideBarWrapper}>
        <Header title='用户管理' toolbar={<Toolbar data={this.renderHeaderToolBar()} />} />
        <Content>
          <Collapse data={this.renderCollapse()} />
        </Content>
      </div>
    )
  }

  componentDidMount() {
    this.reload()
  }

  renderHeaderToolBar(): IActionBarItemProps[] {
    return [
      {
        icon: 'refresh',
        id: 'reloadUser',
        title: 'reloadUser',
        onClick: () => this.reload()
      },
      {
        icon: 'add',
        id: 'addUser',
        title: 'create user',
        onClick: () => console.log('新建用户')
      }
    ]
  }

  reload() {
    this.fetchData()
  }

  async fetchData() {
    const userEntityList = await UserManageApi.getUserList()

    const userTreeList: TreeDTO[] = []
    // 转换为tree结构
    userEntityList.forEach(e => {
      const treeData = new TreeDTO()
      treeData.id = e.id
      treeData.name = e.username
      treeData.icon = 'account'
      treeData.isLeaf = true
      treeData.fileType = 'File'
      treeData.children = null

      userTreeList.push(treeData)
    })

    this.setState({ data: userTreeList })
  }

  renderCollapse(): ICollapseItem[] {
    return [
      {
        id: 'UserList',
        name: '用户列表',
        renderPanel: () => {
          return <Tree data={this.state.data} onSelect={this.onSelectedUser} />
        }
      }
    ]
  }

  onSelectedUser(node: ITreeNodeItemProps) {
    const tableData: IEditorTab = {
      id: LeftBarConstants.LEFT_BAR_USER_MANAGE + node.id,
      name: '用户-' + node.name,
      renderPane: () => {
        return <UserManageInfoView userId={node.id as string} />
      }
    }

    molecule.editor.open(tableData)
  }
}
