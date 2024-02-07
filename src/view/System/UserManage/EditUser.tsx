import UpdateUserModalDTO from '@/infrastructure/pojo/dto/UpdateUserModalDTO.ts'
import { Form, Input, Modal, Upload, UploadFile } from 'antd'
import React, { useImperativeHandle, useState } from 'react'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import UserCreateBO from '@/infrastructure/pojo/bo/UserCreateBO.ts'
import UserApi from '@/infrastructure/api/UserApi.ts'
import { message } from '@/component/message/AntdGlobal.tsx'
import { RcFile, UploadChangeParam, UploadProps } from 'antd/lib/upload'
import FileUtils from '@/infrastructure/util/common/FileUtils.ts'
import ServerBizCode from '@/infrastructure/constants/ServerBizCode.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import HttpHeaderConstants from '@/infrastructure/constants/HttpHeaderConstants.ts'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import TextArea from 'antd/lib/input/TextArea'
import UserEntity from '@/infrastructure/pojo/entity/UserEntity.ts'
import UserUpdateBO from '@/infrastructure/pojo/bo/UserUpdateBO.ts'

export default function EditUser(props: UpdateUserModalDTO) {
  // 基础ui定义
  // 暴露mRef的open对象函数
  useImperativeHandle(props.mRef, () => {
    return {
      open
    }
  })

  // 定义open函数
  const open = (data?: UserEntity) => {
    editUserForm.setFieldsValue({
      id: data.id,
      username: data.username,
      nickname: data.nickname,
      password: StringUtils.EMPTY,
      remark: data.remark
    })
    setFaceUrl(data.faceUrl)
    setVisible(true)
  }

  const [editUserForm] = Form.useForm()

  // 页面数据定义
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [faceUrl, setFaceUrl] = useState<string>(StringUtils.EMPTY)
  const [visible, setVisible] = useState<boolean>(false)
  const baseURL = import.meta.env.VITE_BASE_API

  const handleSubmit = async () => {
    await editUserForm.validateFields()

    const userUpdateBO = new UserUpdateBO()
    userUpdateBO.id = editUserForm.getFieldsValue().id
    userUpdateBO.nickname = editUserForm.getFieldsValue().nickname
    userUpdateBO.remark = editUserForm.getFieldsValue().remark
    userUpdateBO.faceUrl = faceUrl

    await UserApi.updateUser(userUpdateBO)

    message.success('更新成功')

    handleCancel()
  }

  const handleCancel = () => {
    setVisible(false)
    editUserForm.resetFields()
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

  return (
    <Modal
      title='编辑用户信息'
      width={800}
      okText='确定'
      cancelText='取消'
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      <Form name='editUserForm' form={editUserForm} labelCol={{ span: 4 }} labelAlign='right'>
        <Form.Item label='用户id' name='id' rules={[{ required: true, message: '请输入用户id' }]}>
          <Input disabled={true} />
        </Form.Item>
        <Form.Item label='用户头像' rules={[{ required: true, message: '请输入用户头像' }]}>
          <Upload
            listType='picture-card'
            showUploadList={false}
            headers={{
              token: LocalDB.get(HttpHeaderConstants.TOKEN)
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
        <Form.Item label='用户名' name='username' rules={[{ required: true, message: '请输入用户名称' }]}>
          <Input disabled={true} placeholder='请输入用户名称' />
        </Form.Item>
        <Form.Item label='用户昵称' name='nickname' rules={[{ required: true, message: '请输入用户昵称' }]}>
          <Input placeholder='请输入用户昵称' />
        </Form.Item>

        <Form.Item label='用户密码' name='password' rules={[{ required: true, message: '请输入用户密码' }]}>
          <Input.Password
            placeholder='请输入用户密码'
            visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
            autoComplete='off'
          />
        </Form.Item>

        <Form.Item label='备注' name='remark' rules={[{ required: true, message: '请输入用户备注' }]}>
          <TextArea rows={4} placeholder='请输入用户备注' />
        </Form.Item>
      </Form>
    </Modal>
  )
}
