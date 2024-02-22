import molecule from '@dtinsight/molecule'
import DateUtils from '@/infrastructure/util/common/DateUtils.ts'
import StringUtils from '@/infrastructure/util/common/StringUtils.ts'

class ConsoleOutputUtils {
  public static printInfoMessage(msg: string) {
    msg = DateUtils.toDateTime(new Date()) + StringUtils.BLANK + 'INFO' + StringUtils.BLANK + msg + StringUtils.C_LF
    molecule.panel.appendOutput(msg)
  }
}

export default ConsoleOutputUtils
