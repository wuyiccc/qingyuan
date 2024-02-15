import LocalDB from '@/infrastructure/db/LocalDB.ts'
import RedirectUtils from '@/infrastructure/util/common/RedirectUtils.ts'

export default async function AuthLoader() {
  const token = LocalDB.getToken()
  if (!token) {
    RedirectUtils.toLoginPage()
  }
  return null
}
