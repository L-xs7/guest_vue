//地区接口
import Axios from '../request'

//所有省份
export function listRegion(params) {
    return Axios({
        url: '/region/selAll',
        method: 'get',
        params
    })
}

export function selRegion() {
    return Axios({
        url: '/district/selRegion',
        method: 'get',
    })
}

//添加或修改省份信息
export function saveRegion(saveOrUpdate, data) {
    return Axios({
        url: `/region/provinceau?operation=${saveOrUpdate}`,
        method: 'post',
        data
    })
}

//删除省份信息
export function deleteRegion(params) {
    return Axios({
        url: `/region/operationdu`,
        method: 'get',
        params
    })
}

//省份状态修改
export function statusRegion(params) {
    return Axios({
        url: `/region/operationdu`,
        method: 'get',
        params
    })
}

//城市删除和状态修改
export function cityDelOrSta(params) {
    return Axios({
        url: `/ciyts/citysdu`,
        method: 'get',
        params
    })
}

//城市添加和修改
export function citySaveOrUpd(citySaveOrUpdate, data) {
    return Axios({
        url: `/ciyts/citysau?operation=${citySaveOrUpdate}`,
        method: 'post',
        data
    })
}



//省份下级城市--select
export function listCityByRegion_name(regionName) {
    return Axios({
        url: `/district/selByName?provinceName=${regionName}`,
        method: 'get',
    })
}

//省份下级城市--id
export function listCityByRegion_id(id) {
    return Axios({
        url: `/ciyts/selByPIdD?regionId=${id}`,
        method: 'get',
    })
}