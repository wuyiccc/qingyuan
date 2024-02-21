import { Button, Form, Input, message, Modal, Select, Space, Table, TreeSelect } from 'antd'
import React, { useEffect, useState } from 'react'
import { ColumnsType } from 'antd/lib/table'
import SelectEntity from '@/infrastructure/pojo/entity/SelectEntity.ts'
import DevFileApi from '@/infrastructure/api/DevFileApi.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import DevFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'
import DevFileCreateBO from '@/infrastructure/pojo/bo/DevFileCreateBO.ts'
import DevFileUpdateBO from '@/infrastructure/pojo/bo/DevFileUpdateBO.ts'
import DbConstants from '@/infrastructure/constants/DbConstants.ts'
import devFileTreeEntity from '@/infrastructure/pojo/entity/DevFileTreeEntity.ts'

export default function DevFileManage() {
  /**
   * 页面结构定义
   */
  const [fileTypeList, setFileTypeList] = useState<SelectEntity<number>[]>([])

  useEffect(() => {
    doGetFileTypeList()
  }, [])

  const doGetFileTypeList = async () => {
    const fileTypeList = await DevFileApi.getDevFileTypeList()
    setFileTypeList(fileTypeList)
  }

  const [fileManageQueryForm] = Form.useForm()
  const columns: ColumnsType<DevFileTreeEntity> = [
    {
      title: '文件id',
      dataIndex: 'id',
      key: 'id',
      render: text => <a>{text}</a>
    },
    {
      title: '文件名称',
      dataIndex: 'filename',
      key: 'filename'
    },
    {
      title: '文件类型',
      dataIndex: 'fileType',
      key: 'fileType',
      render: text => (
        <a>
          {!fileTypeList.find(e => e.key === text) ? StringUtils.EMPTY : fileTypeList.find(e => e.key === text).desc}{' '}
        </a>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate'
    },
    {
      title: '修改时间',
      dataIndex: 'gmtModified',
      key: 'gmtModified'
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(_, record: DevFileTreeEntity) {
        return (
          <Space>
            <Button
              type='text'
              onClick={() => {
                openEditFileModal(record)
              }}
            >
              编辑
            </Button>
            <Button
              type='text'
              danger
              onClick={() => {
                handleFileDel(record)
              }}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  ]

  /**
   * 数据定义
   */
  const [fileEntityList, setFileEntityList] = useState<DevFileTreeEntity[]>()
  useEffect(() => {
    doQueryFileTree()
  }, [])
  const onClickSearch = () => {
    doQueryFileTree()
  }
  const doQueryFileTree = async () => {
    const values = fileManageQueryForm.getFieldsValue()

    let filename: string = values.filename
    if (StringUtils.isEmpty(filename)) {
      filename = StringUtils.EMPTY
    }
    const fileList: DevFileTreeEntity[] = await DevFileApi.getDevFileTree(filename)

    // 设置虚拟节点
    const virtualTopFile = new DevFileTreeEntity()
    virtualTopFile.id = DbConstants.VIRTUAL_TOP_FILE_ID
    virtualTopFile.parentId = StringUtils.EMPTY
    virtualTopFile.filename = '顶级目录'

    virtualTopFile.children = fileList

    setTreeFileEntityList([virtualTopFile])

    setFileEntityList(fileList)
  }

  const handleClickReset = () => {
    fileManageQueryForm.resetFields()
  }

  const handleFileDel = async (record: DevFileTreeEntity) => {
    await DevFileApi.removeDevFile(record.id)
    message.success('删除成功')
    // 重新搜索
    onClickSearch()
  }

  /**
   * 新增弹窗页面
   */
  const [treeFileEntityList, setTreeFileEntityList] = useState<DevFileTreeEntity[]>()

  const [createFileModalFlag, setCreateFileModalFlag] = useState<boolean>()
  const [createFileForm] = Form.useForm()
  const [createFileParentId, setCreateFileParentId] = useState<string>()

  const onCreateFileParentChange = (newValue: string) => {
    setCreateFileParentId(newValue)
  }
  const openCreateFileModal = () => {
    setCreateFileModalFlag(true)
  }

  const handleSubmitCreateFile = async () => {
    await createFileForm.validateFields()

    const devFileCreateBO = new DevFileCreateBO()
    const values = createFileForm.getFieldsValue()
    devFileCreateBO.parentId = values.parentId
    devFileCreateBO.filename = values.filename
    devFileCreateBO.fileType = values.fileType

    await DevFileApi.addDevFile(devFileCreateBO)

    message.success('新建成功')
    createFileForm.resetFields()
    setCreateFileModalFlag(false)
    onClickSearch()
  }

  const handleCancelCreateFile = () => {
    createFileForm.resetFields()
    setCreateFileModalFlag(false)
  }

  /**
   * 编辑弹窗页面
   */

  const [editFileModalFlag, setEditFileModalFlag] = useState<boolean>()
  const [editFileForm] = Form.useForm()
  const [editFileParentId, setEditFileParentId] = useState<string>()

  const onEditFileChangeParentId = (newValue: string) => {
    setEditFileParentId(newValue)
  }
  const openEditFileModal = (record: DevFileTreeEntity) => {
    editFileForm.setFieldsValue({
      id: record.id,
      parentId: record.parentId,
      filename: record.filename
    })
    setEditFileModalFlag(true)
  }

  const handleSubmitEditFile = async () => {
    await editFileForm.validateFields()

    const devFileUpdateBO = new DevFileUpdateBO()
    const values = editFileForm.getFieldsValue()
    devFileUpdateBO.id = values.id
    devFileUpdateBO.parentId = values.parentId
    devFileUpdateBO.filename = values.filename

    await DevFileApi.updateDevFile(devFileUpdateBO)

    message.success('更新成功')
    editFileForm.resetFields()
    setEditFileModalFlag(false)
    onClickSearch()
  }

  const handleCancelEditFile = () => {
    editFileForm.resetFields()
    setEditFileModalFlag(false)
  }

  return (
    <div className='fileManage'>
      <Form name='fileManageQueryForm' layout='inline' className='searchForm' form={fileManageQueryForm}>
        <Form.Item name='filename' label='文件名称'>
          <Input placeholder='请输入文件名称' allowClear />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type='primary' onClick={onClickSearch}>
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
          <div className='title'>文件列表</div>
          <div className='action'>
            <Button type='primary' onClick={openCreateFileModal}>
              新增
            </Button>
          </div>
        </div>
        <Table indentSize={25} rowKey='id' dataSource={fileEntityList} columns={columns} pagination={false}></Table>
      </div>

      <Modal
        title='新建文件'
        width={800}
        okText='确定'
        cancelText='取消'
        open={createFileModalFlag}
        onOk={handleSubmitCreateFile}
        onCancel={handleCancelCreateFile}
      >
        <Form name='createFileForm' form={createFileForm} labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item
            label='父文件'
            name='parentId'
            rules={[
              { required: true, message: '请选择父文件' },
              { max: 128, message: '不能超过128字符' }
            ]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={createFileParentId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='请选择父目录'
              allowClear
              treeDefaultExpandAll
              onChange={onCreateFileParentChange}
              treeData={treeFileEntityList}
              fieldNames={{ label: 'filename', value: 'id', children: 'children' }}
            />
          </Form.Item>
          <Form.Item
            label='文件名称'
            name='filename'
            rules={[
              { required: true, message: '请输入文件名称' },
              { max: 128, message: '不能超过128字符' }
            ]}
          >
            <Input placeholder='请输入文件名称' />
          </Form.Item>
          <Form.Item label='文件类型' name='fileType'>
            <Select
              placeholder='请选择文件类型'
              allowClear={true}
              style={{ width: 210 }}
              options={fileTypeList?.map(fileType => ({ label: fileType.desc, value: fileType.key }))}
            ></Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title='编辑文件'
        width={800}
        okText='确定'
        cancelText='取消'
        open={editFileModalFlag}
        onOk={handleSubmitEditFile}
        onCancel={handleCancelEditFile}
      >
        <Form name='editFileForm' form={editFileForm} labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item label='文件id' name='id' hidden={true}>
            <Input placeholder='请输入文件名称' />
          </Form.Item>
          <Form.Item
            label='父文件'
            name='parentId'
            rules={[
              { required: true, message: '请选择父文件' },
              { max: 128, message: '不能超过128字符' }
            ]}
          >
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={editFileParentId}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder='请选择父目录'
              allowClear
              treeDefaultExpandAll
              onChange={onEditFileChangeParentId}
              treeData={treeFileEntityList}
              fieldNames={{ label: 'filename', value: 'id', children: 'children' }}
            />
          </Form.Item>
          <Form.Item
            label='文件名称'
            name='filename'
            rules={[
              { required: true, message: '请输入文件名称' },
              { max: 128, message: '不能超过128字符' }
            ]}
          >
            <Input placeholder='请输入文件名称' />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
