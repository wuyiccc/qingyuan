import VegaEditorConstants from '@/infrastructure/constants/VegaEditorConstants.ts'

function buildNicknameStatusBarFunction(nickname: string) {
  return {
    sortIndex: 0,
    id: VegaEditorConstants.STATUS_BAR_USER_NAME_ID,
    name: nickname,
    onClick: () => {
      console.log('yes')
    }
  }
}

export default buildNicknameStatusBarFunction
