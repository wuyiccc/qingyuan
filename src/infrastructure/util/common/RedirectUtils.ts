import StringUtils from '@/infrastructure/util/common/StringUtils.ts'
import LocalDB from '@/infrastructure/db/LocalDB.ts'

class RedirectUtils {
  private static readonly CALLBACK_SEARCH_PARAMS_NAME = 'callbackUrl'

  public static toHomePage() {
    location.href = '/'
  }

  public static toLoginPage() {
    const callbackUrl = encodeURIComponent(location.href)
    if (StringUtils.isNotEmpty(callbackUrl)) {
      location.href = 'login?' + RedirectUtils.CALLBACK_SEARCH_PARAMS_NAME + StringUtils.EQUAL + callbackUrl
    }
    location.href = '/login'
  }

  public static toCallbackUrl() {
    const params = new URLSearchParams(location.search)
    location.href = params.get(RedirectUtils.CALLBACK_SEARCH_PARAMS_NAME) || '/'
  }
}

export default RedirectUtils
