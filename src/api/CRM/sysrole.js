import RestModel from '@/api/restmodel'
import { parseTime } from '@/utils'

const AppModel = {
  'id': 0,
  'roleCode': null,
  'roleName': null,
  'description': null,
  'createDate': parseTime(new Date()),
  'updateDate': null,
  'status': 1
}

const sysApp = new RestModel('SysRole', AppModel)

export default sysApp
