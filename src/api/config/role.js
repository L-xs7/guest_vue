//权限
import Axios from '../request'

//所有权限
export function roleList() {
    return Axios({
        url: '/role/selRole',
        method: 'get',
    })
}