import { Form, Input, Modal, Upload, UploadFile } from 'antd'
import React, { useImperativeHandle, useState } from 'react'
import TextArea from 'antd/lib/input/TextArea'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import FileUtils from '@/infrastructure/util/common/FileUtils.ts'
import { message } from '@/component/message/AntdGlobal.tsx'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import CreateUserModalDTO from '@/infrastructure/pojo/dto/CreateUserModalDTO.ts'
import UserCreateBO from '@/infrastructure/pojo/bo/UserCreateBO.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'

export default function CreateUser(props: CreateUserModalDTO<UserCreateBO>) {
  // 基础ui定义
  const [createUserForm] = Form.useForm()

  // 页面数据定义
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [faceUrl, setFaceUrl] = useState<string>(StringUtils.EMPTY)
  const [visible, setVisible] = useState<boolean>(false)
  const baseURL = import.meta.env.VITE_BASE_API

  const handleSubmit = async () => {
    await createUserForm.validateFields()

    const userCreateBO = new UserCreateBO()
    userCreateBO.username = createUserForm.getFieldsValue().username // 回调处理
    userCreateBO.password = createUserForm.getFieldsValue().password
    userCreateBO.nickname = createUserForm.getFieldsValue().nickname
    userCreateBO.remark = createUserForm.getFieldsValue().remark
    userCreateBO.faceUrl = faceUrl

    await UserApi.addUser(userCreateBO)

    message.success('创建成功')

    handleCancel()
  }

  const handleCancel = () => {
    setVisible(false)
    createUserForm.resetFields()
    setFaceUrl(StringUtils.EMPTY)
    // 回调处理
    props.callback()
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
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      if (info.file.response.code === ServerBizCode.OK) {
        console.log(info.file.response.data)
        setFaceUrl(info.file.response.data)
      } else {
        message.error(info.file.response.msg)
      }
      setLoading(false)
    } else if (info.file.status === 'error') {
      setLoading(false)
      message.error('服务器异常, 请稍后重试')
    }
  }

  // 暴露mRef的open对象函数
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 定义open函数
  const open = (data?: UserCreateBO) => {
    setVisible(true)
  }

  return (
    <Modal
      title='创建用户'
      width={800}
      okText='确定'
      cancelText='取消'
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form name='createUserForm' form={createUserForm} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item label='用户头像' rules={[{ required: true, message: '请输入用户头像' }]}>
          <Upload
            listType='picture-card'
            showUploadList={false}
            headers={{
              token: LocalDB.get(LocalDBConstants.TOKEN)
            }}
            action={baseURL + '/file/uploadFile'}
            beforeUpload={handleBeforeUpload}
            onChange={handleChange}
          >
            {StringUtils.isNotEmpty(faceUrl) ? (
              <img src={faceUrl} style={{ width: '100%', borderRadius: 5 }} alt='' />
            ) : (
              <div>
                {loading ? <LoadingOutlined rev={undefined} /> : <PlusOutlined rev={undefined} />}
                <div style={{ marginTop: 5 }}>上传头像</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          label='用户名'
          name='username'
          rules={[
            { required: true, message: '请输入用户名称' },
            { max: 128, message: '不能超过128字符' }
          ]}
        >
          <Input placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item
          label='用户昵称'
          name='nickname'
          rules={[
            { required: true, message: '请输入用户昵称' },
            { max: 128, message: '不能超过128字符' }
          ]}
        >
          <Input placeholder='请输入用户昵称' />
        </Form.Item>

        <Form.Item
          label='用户密码'
          name='password'
          rules={[
            { required: true, message: '请输入用户密码' },
            { max: 128, message: '不能超过128字符' }
          ]}
        >
          <Input.Password
            placeholder='请输入用户密码'
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            autoComplete='off'
          />
        </Form.Item>

        <Form.Item
          label='备注'
          name='remark'
          rules={[
            { required: true, message: '请输入用户备注' },
            { max: 500, message: '不能超过500字符' }
          ]}
        >
          <TextArea rows={4} placeholder='请输入用户备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
