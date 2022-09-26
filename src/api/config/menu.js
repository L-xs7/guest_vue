//菜单接口
import Axios from '../request'

//菜单树
export function menuTree() {
    return Axios({
        url: '/menu/selMenuTree',
        method: 'get',
    })
}

//菜单名查询
export function menuByName(menuName) {
    return Axios({
        url: `/menu/selMenuByName?menuName=${menuName}`,
        method: 'get',
    })
}

//菜单删除
export function menuDel(id){
    return Axios({
        url: `/menu/delMenu?id=${id}`,
        method: 'get',
    })
}