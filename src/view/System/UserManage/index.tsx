import { Button, Form, Input, Select, Space, Table, TableProps } from 'antd'
import React, { useEffect, useState } from 'react'
import UserManageApi from '@/infrastructure/api/UserManageApi.ts'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import { ColumnsType } from 'antd/lib/table'
import userEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import UserManagePageQueryBO from '@/infrastructure/pojo/bo/UserManagePageQueryBO.ts'
import PageEntity from '@/infrastructure/pojo/entity/PageEntity.ts'
import styles from './index.module.less'

export default function UserManage() {
  const [userIdList, setUserIdList] = useState<string[]>()
  const [userEntityList, setUserEntityList] = useState<UserEntity[]>()
  const [selectedUserIdList, setSelectedUserIdList] = useState<string[]>()

  const doGetUserIdList = async () => {
    const userIdList: string[] = await UserManageApi.getUserIdList()
    setUserIdList(userIdList)
  }

  const doGetUserEntityList = async () => {
    const pageEntity: PageEntity<UserEntity> = await UserManageApi.pageQueryUser(new UserManagePageQueryBO())
    setUserEntityList(pageEntity.records)
  }

  useEffect(() => {
    doGetUserIdList()
    doGetUserEntityList()
  }, [])

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

  const userList: UserEntity[] = [
    {
      id: '111',
      username: '测试用户',
      nickname: '测试昵称',
      remark: '备注'
    }
  ]

  return (
    <div className='userManage'>
      <Form layout='inline' className='searchForm'>
        <Form.Item name='userId' label='用户id'>
          <Select
            allowClear={true}
            style={{ width: 210 }}
            options={userIdList?.map(userId => ({ label: userId, value: userId }))}
          ></Select>
        </Form.Item>
        <Form.Item name='username' label='用户名'>
          <Input placeholder='请输入用户名' />
        </Form.Item>
        <Form.Item name='nickname' label='用户昵称'>
          <Input placeholder='用户昵称' />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary'>搜索</Button>
            <Button type='default'>重置</Button>
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
        ></Table>
      </div>
    </div>
  )
}
