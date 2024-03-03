import styles from './index.module.less'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import { Button, ConfigProvider, Form, Input, Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import RemoteServerApi from '@/infrastructure/api/RemoteServerApi.ts'
import RemoteServerUpdateBO from '@/infrastructure/pojo/bo/RemoteServerUpdateBO.ts'
import ConsoleOutputUtils from '@/infrastructure/util/common/ConsoleOutputUtils.ts'
import RemoteServerTestConnectBO from '@/infrastructure/pojo/bo/RemoteServerTestConnectBO.ts'
import ArrayUtils from '@/infrastructure/util/common/ArrayUtils.ts'
import CurrentEditorDataDTO from '@/infrastructure/pojo/dto/CurrentEditorDataDTO.ts'
import EditorDataTypeEnum from '@/infrastructure/pojo/enumeration/EditorDataTypeEnum.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'
import LocalDBConstants from '@/infrastructure/constants/LocalDBConstants.ts'
import NginxServiceApi from '@/infrastructure/api/NginxServiceApi.ts'
import NginxServiceUpdateBO from '@/infrastructure/pojo/bo/NginxServiceUpdateBO.ts'
import NginxServiceBindHistoryEntity from '@/infrastructure/pojo/entity/NginxServiceBindHistoryEntity.ts'
import NginxServiceTestConnectBO from '@/infrastructure/pojo/bo/NginxServiceTestConnectBO.ts'
import StatusFlagConstants from '@/infrastructure/constants/StatusFlagConstants.ts'
import NginxServiceDetailTableDTO from '@/infrastructure/pojo/dto/NginxServiceDetailTableDTO.ts'

export default function DevFileNginxServiceEditor({
  id = StringUtils.EMPTY,
  parentId = StringUtils.EMPTY
}: {
  id: string
  parentId: string
}) {
  const [updateNginxServiceForm] = Form.useForm()
  const [tableData, setTableData] = useState<NginxServiceDetailTableDTO[]>()

  useEffect(() => {
    doGetNginxServiceDetail()

    console.log('重新加载远程服务编辑页面')
    const currentEditorDataDTO = new CurrentEditorDataDTO()
    currentEditorDataDTO.editorDataType = EditorDataTypeEnum.DEV_FILE_MANAGE
    currentEditorDataDTO.jsonData = JSON.stringify(StringUtils.EMPTY)
    LocalDB.set(LocalDBConstants.CURRENT_EDIT_FILE_DATA, currentEditorDataDTO)
  }, [id])

  const doGetNginxServiceDetail = async () => {
    const nginxServiceDetailEntity = await NginxServiceApi.getNginxServiceDetail(id)

    updateNginxServiceForm.setFieldsValue({
      id: id,
      serviceName: nginxServiceDetailEntity.serviceName,
      nginxCmdPath: nginxServiceDetailEntity.nginxCmdPath,
      nginxConfPath: nginxServiceDetailEntity.nginxConfPath,
      remark: nginxServiceDetailEntity.remark,
      gmtCreate: nginxServiceDetailEntity.gmtCreate,
      gmtModified: nginxServiceDetailEntity.gmtModified
    })

    const historyList = nginxServiceDetailEntity.bindConfHistoryVOList

    const myTableData = []
    for (let i = 0; i < historyList.length; i++) {
      const entity = historyList[i]
      const dto = new NginxServiceDetailTableDTO()
      dto.key = entity.id
      dto.id = entity.id
      dto.nginxServiceId = entity.nginxServiceId
      dto.nginxConfHistoryFileId = entity.nginxConfHistoryFileId
      dto.nginxConfFilename = entity.nginxConfFilename
      dto.bindTime = entity.bindTime
      dto.statusFlag = entity.statusFlag
      dto.statusFlagDesc = entity.statusFlagDesc
      myTableData.push(dto)
    }

    setTableData(myTableData)
  }

  const doUpdateRemoteServer = async () => {
    const updateBO = new NginxServiceUpdateBO()

    const values = updateNginxServiceForm.getFieldsValue()
    updateBO.id = values.id
    updateBO.nginxCmdPath = values.nginxCmdPath
    updateBO.nginxConfPath = values.nginxConfPath
    updateBO.remark = values.remark

    await NginxServiceApi.updateNginxService(updateBO)
    ConsoleOutputUtils.printInfoMessage('更新成功')

    doGetNginxServiceDetail()
  }

  const doTestRemoteServerConnect = async () => {
    const testBO = new NginxServiceTestConnectBO()

    const values = updateNginxServiceForm.getFieldsValue()
    testBO.parentId = parentId
    testBO.nginxCmdPath = values.nginxCmdPath
    testBO.nginxConfPath = values.nginxConfPath

    const res = await NginxServiceApi.testNginxServiceConnect(testBO)

    const msgList = res.msgList
    if (ArrayUtils.isEmpty(msgList)) {
      ConsoleOutputUtils.printInfoMessage('未获取到测试结果')
    }

    for (let i = 0; i < msgList.length; i++) {
      ConsoleOutputUtils.printInfoMessage(msgList[i])
    }
  }

  const columns = [
    {
      title: 'Nginx配置文件名称',
      dataIndex: 'nginxConfFilename',
      key: 'nginxConfFilename'
    },
    {
      title: '绑定时间',
      dataIndex: 'bindTime',
      key: 'bindTime'
    },
    {
      title: '状态',
      dataIndex: 'statusFlag',
      key: 'statusFlag',
      render: (_, { statusFlag, statusFlagDesc }) => statusFlagTag(statusFlag, statusFlagDesc)
    }
  ]

  const statusFlagTag = (statusFlag, statusFlagDesc) => {
    if (StatusFlagConstants.ENABLE.type === statusFlag) {
      return <Tag color={'green'}>{statusFlagDesc}</Tag>
    } else {
      return <Tag color={'red'}>{statusFlagDesc}</Tag>
    }
  }

  return (
    <div className={styles.contentWrapper}>
      <ConfigProvider
        theme={{
          token: {
            colorBgContainerDisabled: '#282A36',
            colorBgContainer: '#282A36',
            colorTextDisabled: '#bdbdbd',
            colorText: '#bdbdbd'
          },
          components: {
            Select: {
              // selectorBg: 'grey'
              optionActiveBg: '#17181f',
              optionSelectedBg: '#17181f'
            }
          }
        }}
      >
        <Form name='updateNginxServiceForm' form={updateNginxServiceForm} labelCol={{ span: 4 }} labelAlign='right'>
          <Form.Item label='文件id' name='id' hidden={true}>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label='nginx服务名称' name='serviceName'>
            <Input disabled={true} />
          </Form.Item>

          <Form.Item label='nginx命令路径' name='nginxCmdPath'>
            <Input placeholder='请输入nginx命令路径' />
          </Form.Item>

          <Form.Item label='nginx配置文件路径' name='nginxConfPath'>
            <Input placeholder='请输入nginx配置文件路径' />
          </Form.Item>

          <Form.Item label='备注' name='remark'>
            <Input.TextArea placeholder='请输入备注' />
          </Form.Item>

          <Form.Item label='创建时间' name='gmtCreate'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label='修改时间' name='gmtModified'>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item className={styles.btnWrapper}>
            <Button className={styles.testBtn} onClick={doTestRemoteServerConnect}>
              测试连接
            </Button>
            <Button className={styles.okBtn} onClick={doUpdateRemoteServer}>
              确认
            </Button>
          </Form.Item>
        </Form>
        <Table dataSource={tableData} columns={columns} pagination={false} />
      </ConfigProvider>
    </div>
  )
}
