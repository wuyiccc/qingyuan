import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import TextArea from 'antd/lib/input/TextArea'
import { Button, Card, ConfigProvider, Input, Space } from 'antd'
import MonacoEditor from 'react-monaco-editor'
import styles from './index.module.less'

export default function HistoryVersionContentView({ fileContent = StringUtils.EMPTY }: { fileContent: string }) {
  const options: any = {
    // selectOnLineNumbers: true,
    // roundedSelection: false,
    // readOnly: false,
    // cursorStyle: 'line',
    // automaticLayout: true,
    // selectOnLineNumbers: true,
    // renderSideBySide: false,
    // scrollBeyondLastLine: false,
    // formatOnPaste: true,
    // automaticLayout: true,
    // contextmenu: false, // 禁止右键
    // fixedOverflowWidgets: true, // 超出编辑器大小的使用fixed属性显示
    // quickSuggestions: true, // 默认的提示关掉
    minimap: {
      // // 缩略图
      enabled: true
    }
    // scrollbar: {
    // // 滚动条
    // horizontalScrollbarSize: 6,
    // verticalScrollbarSize: 6,
    // },
    // lineNumbersMinChars: 3, // 最少显示3位长的行号
    // lineNumbers: 'on', // 是否显示行号
  }
  return (
    <div className={styles.historyContentWrapper}>
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
        <MonacoEditor
          width='100%'
          height='100%'
          theme='VegaMonacoTheme'
          value={fileContent}
          options={options}
          //editorDidMount={editorDidMount}
        />
      </ConfigProvider>
    </div>
  )
}
