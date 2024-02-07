import { Button, Form, Input, Select, Space, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import UserManageApi from '@/infrastructure/api/UserManageApi.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import { ColumnsType } from 'antd/lib/table'
import UserManagePageQueryBO from '@/infrastructure/pojo/bo/UserManagePageQueryBO.ts'
import PageEntity from '@/infrastructure/pojo/entity/PageEntity.ts'
import styles from './index.module.less'
import CreateUser from '@/view/System/UserManage/CreateUser.tsx'

export default function UserManage() {
  const columns: ColumnsType<UserEntity> = [
    {
      title: '用户id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>
    },
    {
      title: '用户头像',
      dataIndex: 'faceUrl',
      key: 'faceUrl',
      render: faceUrl => <img src={faceUrl} alt='' className={styles.userImg} />
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname'
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate'
    },
    {
      title: '用户备注',
      dataIndex: 'remark',
      key: 'remark'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(record, userEntity) {
        return (
          <Space>
            <Button type='text'>编辑</Button>
            <Button type='text' danger>
              删除
            </Button>
          </Space>
        )
      }
    }
  ]
  const [userManagePageQueryForm] = Form.useForm()

  const [userIdList, setUserIdList] = useState<string[]>()
  const [userEntityList, setUserEntityList] = useState<UserEntity[]>()
  const [selectedUserIdList, setSelectedUserIdList] = useState<string[]>()
  const [currentPageNum, setCurrentPageNum] = useState<number>(1)
  const [totalRecordNums, setTotalRecordNums] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(10)

  const doGetUserIdList = async () => {
    const userIdList: string[] = await UserManageApi.getUserIdList()
    setUserIdList(userIdList)
  }

  const doPageQueryUser = async (current: number, size: number) => {
    const values = userManagePageQueryForm.getFieldsValue()
    const userManagePageQueryBO = new UserManagePageQueryBO()
    userManagePageQueryBO.userId = values.userId
    userManagePageQueryBO.username = values.username
    userManagePageQueryBO.nickname = values.nickname
    userManagePageQueryBO.current = current
    userManagePageQueryBO.size = size

    const pageEntity: PageEntity<UserEntity> = await UserManageApi.pageQueryUser(userManagePageQueryBO)
    setCurrentPageNum(pageEntity.currentPageNum)
    setTotalRecordNums(pageEntity.totalRecordNums)
    setUserEntityList(pageEntity.records)
  }

  useEffect(() => {
    doGetUserIdList()
  }, [])

  useEffect(() => {
    doPageQueryUser(currentPageNum, pageSize)
  }, [currentPageNum, pageSize])

  const onClickPageSearch = () => {
    doPageQueryUser(currentPageNum, pageSize)
  }

  const handleClickReset = () => {
    userManagePageQueryForm.resetFields()
  }

  return (
    <div className='userManage'>
      <Form name='userManagePageQueryForm' layout='inline' className='searchForm' form={userManagePageQueryForm}>
        <Form.Item name='userId' label='用户id'>
          <Select
            allowClear={true}
            style={{ width: 210 }}
            options={userIdList?.map(userId => ({ label: userId, value: userId }))}
          ></Select>
        </Form.Item>
        <Form.Item name='username' label='用户名'>
          <Input placeholder='请输入用户名' allowClear />
        </Form.Item>
        <Form.Item name='nickname' label='用户昵称'>
          <Input placeholder='用户昵称' allowClear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={onClickPageSearch}>
              搜索
            </Button>
            <Button type='default' onClick={handleClickReset}>
              重置
            </Button>
          </Space>
        </Form.Item>
      </Form>
      <div className='baseTable'>
        <div className='headerWrapper'>
          <div className='title'>用户列表</div>
          <div className='action'>
            <Button type='primary'>新增</Button>
            <Button type='primary' danger>
              删除
            </Button>
          </div>
        </div>
        <Table
          rowSelection={{
            type: 'checkbox',
            selectedRowKeys: selectedUserIdList,
            onChange: (selectedRowKeys: React.Key[]) => {
              setSelectedUserIdList(selectedRowKeys as string[])
            }
          }}
          rowKey='id'
          dataSource={userEntityList}
          columns={columns}
          pagination={{
            current: currentPageNum,
            pageSize: pageSize,
            total: totalRecordNums,
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: function (total) {
              return `总共 ${total} 条`
            },
            onChange: (page, pageSize) => {
              setPageSize(pageSize)
              setCurrentPageNum(page)
            }
          }}
        ></Table>
      </div>
      <CreateUser />
    </div>
  )
}
