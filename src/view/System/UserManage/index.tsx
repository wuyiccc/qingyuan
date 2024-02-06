import { Button, Form, Input, Space, Table, TableProps, Tag } from 'antd'
import React from 'react'

export default function UserManage() {
  interface DataType {
    key: string
    name: string
    age: number
    address: string
    tags: string[]
  }

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green'
            if (tag === 'loser') {
              color = 'volcano'
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            )
          })}
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      )
    }
  ]

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer']
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser']
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher']
    }
  ]

  return (
    <div className='userManage'>
      <div className='searchForm'>
        <Form layout='inline'>
          <Form.Item name='userId' label='用户id'>
            <Input />
          </Form.Item>
        </Form>
      </div>
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
        <Table dataSource={data} columns={columns}></Table>
      </div>
    </div>
  )
}
