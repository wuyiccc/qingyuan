import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import styles from './index.module.less'
import React, { useEffect, useState } from 'react'
import { Button, ConfigProvider, Space, Table, Tag } from 'antd'
import NginxConfFileApi from '@/infrastructure/api/NginxConfFileApi.ts'
import NginxConfFileBindNginxServiceEntity from '@/infrastructure/pojo/entity/NginxConfFileBindNginxServiceEntity.ts'
import BindStatusConstants from '@/infrastructure/constants/BindStatusConstants.ts'
import NginxConfFilePublishBO from '@/infrastructure/pojo/bo/NginxConfFilePublishBO.ts'
import ArrayUtils from '@/infrastructure/util/common/ArrayUtils.ts'
import ConsoleOutputUtils from '@/infrastructure/util/common/ConsoleOutputUtils.ts'

export default function PublishedNginxServiceTableView({
  historyFileId = StringUtils.EMPTY,
  reloadCount
}: {
  historyFileId: string
  reloadCount: number
}) {
  const [tableList, setTableList] = useState<any[]>()

  useEffect(() => {
    console.log('useEffect')
    reload()
  }, [historyFileId, reloadCount])

  const reload = async () => {
    await doGetGetNginxConfFileBindNginxServiceList()
  }

  const doGetGetNginxConfFileBindNginxServiceList = async () => {
    const dataList: NginxConfFileBindNginxServiceEntity[] =
      await NginxConfFileApi.getNginxConfFileBindNginxServiceList(historyFileId)

    const versionTableList = []
    for (let i = 0; i < dataList.length; i++) {
      const data = dataList[i]
      const versionTable = {
        key: data.nginxServiceId,
        id: data.id,
        nginxConfHistoryFileId: data.nginxConfHistoryFileId,
        nginxServiceId: data.nginxServiceId,
        nginxServiceName: data.nginxServiceName,
        bindTime: data.bindTime,
        bindStatus: data.bindStatus,
        bindStatusDesc: data.bindStatusDesc
      }
      versionTableList.push(versionTable)
    }

    setTableList(versionTableList)
  }

  const bindStatusTag = (statusFlag, statusFlagDesc) => {
    if (BindStatusConstants.BIND.type === statusFlag) {
      return <Tag color={'green'}>{statusFlagDesc}</Tag>
    } else {
      return <Tag color={'red'}>{statusFlagDesc}</Tag>
    }
  }

  const doBindNginxService = async (historyFileId, nginxServiceId) => {
    const publishBO = new NginxConfFilePublishBO()
    publishBO.historyFileId = historyFileId
    publishBO.nginxServiceId = nginxServiceId
    const res = await NginxConfFileApi.publish(publishBO)

    const msgList = res.msgList
    if (ArrayUtils.isEmpty(msgList)) {
      ConsoleOutputUtils.printInfoMessage('未获取到发布结果')
    }

    for (let i = 0; i < msgList.length; i++) {
      ConsoleOutputUtils.printInfoMessage(msgList[i])
    }
    await reload()
  }

  const columns = [
    {
      title: 'nginx服务名称',
      dataIndex: 'nginxServiceName',
      key: 'nginxServiceName'
    },
    {
      title: '绑定时间',
      dataIndex: 'bindTime',
      key: 'bindTime'
    },
    {
      title: '状态',
      dataIndex: 'bindStatus',
      key: 'bindStatus',
      render: (_, { bindStatus, bindStatusDesc }) => bindStatusTag(bindStatus, bindStatusDesc)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(_, record) {
        return (
          <ConfigProvider
            theme={{
              token: {
                colorBgContainerDisabled: '#282A36',
                colorBgContainer: '#282A36',
                colorTextDisabled: '#bdbdbd',
                colorText: '#bdbdbd',
                colorBgElevated: '#282A36'
              },
              components: {
                Select: {
                  // selectorBg: 'grey'
                  optionActiveBg: '#17181f',
                  optionSelectedBg: '#17181f'
                },
                Table: {
                  cellFontSize: 12,
                  cellFontSizeMD: 12,
                  cellFontSizeSM: 12
                }
              }
            }}
          >
            <Space>
              <Button
                size={'small'}
                onClick={() => doBindNginxService(record.nginxConfHistoryFileId, record.nginxServiceId)}
              >
                发布
              </Button>
            </Space>
          </ConfigProvider>
        )
      }
    }
  ]

  return (
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
          },
          Table: {
            cellFontSize: 12,
            cellFontSizeMD: 12,
            cellFontSizeSM: 12
          }
        }
      }}
    >
      <div className={styles.blankContentWrapper}>
        <div className={styles.buttonWrapper}>
          <Button className={styles.refreshButton} onClick={reload} size={'small'}>
            刷新
          </Button>
        </div>
        <Table dataSource={tableList} columns={columns} pagination={false} size={'small'} />
      </div>
    </ConfigProvider>
  )
}
