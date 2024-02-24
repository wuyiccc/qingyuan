import React, { useEffect, useState } from 'react'
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
import { ConfigProvider, Form, Input, message, Modal, Upload, UploadFile } from 'antd'
import { CloseOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import FileApi from '@/infrastructure/api/FileApi.ts'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import FileUtils from '@/infrastructure/util/common/FileUtils.ts'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import UserCreateBO from '@/infrastructure/pojo/bo/UserCreateBO.ts'
import ImgCrop from 'antd-img-crop'

const Tree = molecule.component.TreeView
const Toolbar = molecule.component.Toolbar
const Collapse = molecule.component.Collapse
export default function UserManageSideBarView() {
  const [data, setData] = useState<any[]>()
  const [selectedUserId, setSelectedUserId] = useState(undefined)
  const [showCreateUserInfoModalFlag, setShowCreateUserInfoModalFlag] = useState(false)

  const [createUserForm] = Form.useForm()
  const [faceUrl, setFaceUrl] = useState<string>()
  const [uploadFaceImgLoading, setUploadFaceImgLoading] = useState<boolean>()

  useEffect(() => {
    reload()
  }, [])

  const reload = () => {
    fetchData()
  }

  const renderHeaderToolBar: IActionBarItemProps[] = [
    {
      icon: 'refresh',
      id: 'reloadUser',
      title: '刷新用户列表',
      onClick: () => reload()
    },
    {
      icon: 'add',
      id: 'addUser',
      title: '新建用户',
      onClick: () => setShowCreateUserInfoModalFlag(true)
    },
    {
      icon: 'trash',
      id: 'deleteUser',
      title: '删除用户',
      onClick: () => {
        doRemoveUser(selectedUserId)
      }
    }
  ]

  const fetchData = async () => {
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

    setData(userTreeList)
  }

  const renderCollapse: ICollapseItem[] = [
    {
      id: 'userList',
      name: '用户列表',
      renderPanel: () => {
        return <Tree data={data} onSelect={onSelectedUser} />
      }
    }
  ]

  const onSelectedUser = (node: ITreeNodeItemProps) => {
    const tableData: IEditorTab = {
      id: VegaEditorConstants.EDITOR_TAB_USER_MANAGE_EDITOR_ID_PREFIX + node.id,
      name: node.name,
      renderPane: () => {
        return <UserManageInfoEditor userId={node.id as string} />
      }
    }
    console.log('选择用户id', node.id)
    setSelectedUserId(node.id)
    molecule.editor.open(tableData)
  }

  const doRemoveUser = async (userId: string) => {
    await UserApi.removeUser(userId)
    ConsoleOutputUtils.printInfoMessage('删除用户id: ' + userId + ' 成功')
    const groupId = molecule.editor.getGroupIdByTab(
      VegaEditorConstants.EDITOR_TAB_USER_MANAGE_EDITOR_ID_PREFIX + userId
    )
    console.log('groupId: ', groupId)
    molecule.editor.closeTab(VegaEditorConstants.EDITOR_TAB_USER_MANAGE_EDITOR_ID_PREFIX + userId, groupId)
    await fetchData()
  }

  const closeShowCreateUserModal = () => {
    setShowCreateUserInfoModalFlag(false)
    createUserForm.resetFields()
    setFaceUrl(StringUtils.EMPTY)
  }

  const onCreateUser = async () => {
    await createUserForm.validateFields()

    const userCreateBO = new UserCreateBO()
    const values = createUserForm.getFieldsValue()
    userCreateBO.faceUrl = faceUrl
    userCreateBO.remark = values.remark
    userCreateBO.username = values.username
    userCreateBO.nickname = values.nickname
    userCreateBO.password = values.password

    await UserApi.addUser(userCreateBO)
    setShowCreateUserInfoModalFlag(false)
    createUserForm.resetFields()
    setFaceUrl(StringUtils.EMPTY)
    ConsoleOutputUtils.printInfoMessage('新建用户成功')
    reload()
    ConsoleOutputUtils.printInfoMessage('重新加载用户列表成功')
  }

  const normalFile = e => {
    console.log('Upload event:', e)
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
  }

  // 上传之前 接口图片处理
  const handleBeforeUpload = (file: RcFile) => {
    if (!FileUtils.checkImgFileType(file)) {
      message.error('只能上传png/jpeg/jpg格式的图片')
      return false
    }
    if (!FileUtils.checkLimit10M(file)) {
      message.error('图片大小不能超过10m')
      return false
    }
  }

  // 上传后, 图片处理
  const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
    if (info.file.status === 'uploading') {
      setUploadFaceImgLoading(true)
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === ServerBizCode.OK) {
        setFaceUrl(info.file.response.data)
        createUserForm.setFieldValue('faceUrl', info.fileList)
      } else {
        message.error(info.file.response.msg)
      }
      setUploadFaceImgLoading(false)
    } else if (info.file.status === 'error') {
      setUploadFaceImgLoading(false)
      message.error('服务器异常, 请稍后重试')
    }
  }

  return (
    <div className={styles.sideBarWrapper}>
      <Header title='用户管理' toolbar={<Toolbar data={renderHeaderToolBar} />} />
      <Content>
        <Collapse data={renderCollapse} />
      </Content>

      <Modal
        title='新建用户'
        width={600}
        open={showCreateUserInfoModalFlag}
        onCancel={closeShowCreateUserModal}
        okText='确认'
        onOk={onCreateUser}
        closeIcon={<CloseOutlined className={styles.closeIcon} />}
      >
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: '#1E2227',
              colorText: '#bdbdbd',
              colorTextPlaceholder: 'grey'
            }
          }}
        >
          <Form name='createUserForm' form={createUserForm} labelCol={{ span: 4 }} labelAlign='right'>
            <Form.Item
              label='用户头像'
              name='faceUrl'
              valuePropName='fileList'
              getValueFromEvent={normalFile}
              rules={[{ required: true, message: '请选择用户头像' }]}
            >
              <ImgCrop rotationSlider>
                <Upload
                  listType='picture-card'
                  showUploadList={false}
                  headers={{
                    token: LocalDB.getToken()
                  }}
                  action={FileApi.UPLOAD_FILE_URL}
                  beforeUpload={handleBeforeUpload}
                  onChange={handleChange}
                >
                  {StringUtils.isNotEmpty(faceUrl) ? (
                    <img src={faceUrl} style={{ width: '100px', height: '100px', borderRadius: 5 }} alt='' />
                  ) : (
                    <div>
                      {uploadFaceImgLoading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
                      <div style={{ marginTop: 5 }}>上传头像</div>
                    </div>
                  )}
                </Upload>
              </ImgCrop>
            </Form.Item>
            <Form.Item label='登录名称' name='username' rules={[{ required: true, message: '请输入登录名称' }]}>
              <Input placeholder='请输入登录名称' />
            </Form.Item>
            <Form.Item label='密码' name='password' rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder='请输入用户密码' />
            </Form.Item>
            <Form.Item label='用户昵称' name='nickname' rules={[{ required: true, message: '请输入用户昵称' }]}>
              <Input placeholder='请输入用户昵称' />
            </Form.Item>
            <Form.Item label='备注' name='remark' rules={[{ required: true, message: '请输入用户备注' }]}>
              <Input.TextArea placeholder='请输入用户备注' />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  )
}
