export default class DevFileTypeConstants {
  public type?: number
  public desc?: string

  constructor(type: number, desc: string) {
    this.type = type
    this.desc = desc
  }

  public static readonly DIRECTORY = new DevFileTypeConstants(1, '目录')

  public static readonly NGINX_CONFIG_FILE = new DevFileTypeConstants(2, 'Nginx配置文件')

  public static readonly REMOTE_SERVER = new DevFileTypeConstants(3, '远程主机文件')

  public static readonly NGINX_SERVICE = new DevFileTypeConstants(4, 'Nginx服务')
}
