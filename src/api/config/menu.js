//菜单接口
import Axios from '../request'

//菜单树
export function menuTree() {
    return Axios({
        url: '/menu/selMenuTree',
        method: 'get',
    })
}

//菜单list
export function menuList() {
    return Axios({
        url: '/menu/selMenuList',
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

//根据id查询
export function menuById(id) {
    return Axios({
        url: `/menu/selMenuById?id=${id}`,
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

//保存或修改菜单
export function menuSaveOrUpd(data){
    return Axios({
        url: `/menu/operationMenu`,
        method: 'post',
        data
    })
}