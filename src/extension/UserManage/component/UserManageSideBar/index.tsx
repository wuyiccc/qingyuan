import React from 'react'
import styles from './index.module.less'
import { Content, Header } from '@dtinsight/molecule/esm/workbench/sidebar'
import { IActionBarItemProps, ITreeNodeItemProps } from '@dtinsight/molecule/esm/components'
import molecule from '@dtinsight/molecule'
import 'reflect-metadata'
import { ICollapseItem } from '@dtinsight/molecule/esm/components/collapse'
import UserManageApi from '@/infrastructure/api/UserManageApi.ts'
import TreeDTO from '@/infrastructure/pojo/dto/TreeDTO.ts'
import { IEditorTab } from '@dtinsight/molecule/esm/model'
import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'
import { UserManageInfoEditor } from '@/extension/UserManage/component/UserManageInfoEditor'
import UserApi from '@/infrastructure/api/UserApi.ts'
import ConsoleOutputUtils from '@/infrastructure/util/common/ConsoleOutputUtils.ts'

const Tree = molecule.component.TreeView
const Toolbar = molecule.component.Toolbar
const Collapse = molecule.component.Collapse
export class UserManageSideBarView extends React.Component {
  state = {
    data: [],
    selectedUserId: undefined
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
        title: '刷新用户列表',
        onClick: () => this.reload()
      },
      {
        icon: 'add',
        id: 'addUser',
        title: '新建用户',
        onClick: () => console.log('新建用户')
      },
      {
        icon: 'trash',
        id: 'deleteUser',
        title: '删除用户',
        onClick: () => {
          this.doRemoveUser(this.state.selectedUserId)
        }
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
        id: 'userList',
        name: '用户列表',
        renderPanel: () => {
          return <Tree data={this.state.data} onSelect={this.onSelectedUser} />
        }
      }
    ]
  }

  onSelectedUser = (node: ITreeNodeItemProps) => {
    const tableData: IEditorTab = {
      id: VegaEditorConstants.EDITOR_TAB_USER_MANAGE_EDITOR_ID_PREFIX + node.id,
      name: node.name,
      renderPane: () => {
        return <UserManageInfoEditor userId={node.id as string} />
      }
    }
    console.log('选择用户id', node.id)
    this.setState({ selectedUserId: node.id })
    molecule.editor.open(tableData)
  }

  async doRemoveUser(userId: string) {
    await UserApi.removeUser(userId)
    ConsoleOutputUtils.printInfoMessage('删除用户id: ' + userId + ' 成功')
    const groupId = molecule.editor.getGroupIdByTab(
      VegaEditorConstants.EDITOR_TAB_USER_MANAGE_EDITOR_ID_PREFIX + userId
    )
    console.log('groupId: ', groupId)
    molecule.editor.closeTab(VegaEditorConstants.EDITOR_TAB_USER_MANAGE_EDITOR_ID_PREFIX + userId, groupId)
    await this.fetchData()
  }
}
