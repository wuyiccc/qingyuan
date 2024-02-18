import { constants } from '@dtinsight/molecule/esm/services/builtinService/const'
import { useEffect, useState } from 'react'
import KeyDisplayDTO from '@/infrastructure/pojo/dto/KeyDisplayDTO.ts'
import { KeybindingHelper } from '@dtinsight/molecule/esm/services/keybinding'
import styles from './index.module.less'
import { Utils } from '@dtinsight/dt-utils/lib'

const commands: KeyDisplayDTO[] = [{ id: constants.ACTION_SELECT_THEME, label: '切换主题颜色' }]

function WorkbenchEntry() {
  const [keys, setKeys] = useState<KeyDisplayDTO[]>([])

  useEffect(() => {
    setKeys(
      commands.map((command: KeyDisplayDTO) => {
        const simpleKeybindings = KeybindingHelper.queryGlobalKeybinding(command.id)
        if (simpleKeybindings?.length) {
          const keybindings = KeybindingHelper.convertSimpleKeybindingToString(simpleKeybindings)
          return { ...command, keybindings }
        }
        return null
      })
    )
  }, [])

  return (
    <div className={styles.entry}>
      <img className={styles.logo} width={200} src='img/workbench-entry.png' />
      <div className={styles.commands}>
        {keys.map(key => (
          <div className={styles.command} key={key.id}>
            <div className={styles.label}>{key.label}</div>
            <div className={styles.keybindings}>
              {key.keybindings
                .split(Utils.isMacOs() ? '' : '+')
                .filter(Boolean)
                .map(keyCode => (
                  <code key={keyCode} className={styles.keyCode}>
                    {keyCode}
                  </code>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default WorkbenchEntry
