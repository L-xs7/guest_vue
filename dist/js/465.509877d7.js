"use strict";(self["webpackChunkguest"]=self["webpackChunkguest"]||[]).push([[465],{2465:function(t,e,l){l.r(e),l.d(e,{default:function(){return c}});var a=function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"role_container"},[l("div",{staticClass:"top_operation"},[l("el-input",{staticStyle:{width:"216px"},attrs:{size:"medium",placeholder:"请输入权限名",clearable:""}}),l("el-button",{staticStyle:{"margin-left":"8px"},attrs:{size:"medium",type:"info"}},[t._v(" 搜索 ")]),l("el-button",{staticStyle:{"margin-left":"8px"},attrs:{icon:"el-icon-plus",size:"medium",type:"primary"}},[t._v(" 添加权限 ")])],1),l("div",{staticClass:"table_div"},[l("el-table",{attrs:{data:t.roleList,"row-key":"id"}},[l("el-table-column",{attrs:{prop:"roleName",label:"权限名称","min-width":"180"}}),l("el-table-column",{attrs:{prop:"roleCode",label:"权限编码","min-width":"180"}}),l("el-table-column",{attrs:{prop:"level",label:"权限等级","min-width":"180"}}),l("el-table-column",{attrs:{prop:"remake",label:"权限描述","min-width":"180"}}),l("el-table-column",{attrs:{label:"创建时间","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.$moment(e.row.createDate).format("YYYY/MM/DD h:mm:ss"))+" ")]}}])}),l("el-table-column",{attrs:{label:"是否启用","min-width":"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-switch",{attrs:{"active-color":"#13ce66","inactive-color":"#ff4949"},model:{value:e.row.status,callback:function(l){t.$set(e.row,"status",l)},expression:"scope.row.status"}})]}}])}),l("el-table-column",{attrs:{label:"编辑",width:"85",fixed:"right"}},[[l("a",{attrs:{href:"javascript:;"}},[l("svg-icon",{staticStyle:{"margin-right":"4px"},attrs:{"icon-class":"delete","class-name":"delete"}})],1),l("a",{attrs:{href:"javascript:;"}},[l("svg-icon",{attrs:{"icon-class":"update","class-name":"update"}})],1)]],2)],1)],1)])},s=[],i={name:"Role",data(){return{roleList:[]}},methods:{async getRoleList(){const t=await this.getRequest("/role/selRole");console.log(t),this.roleList=t.data.selRole}},mounted(){this.getRoleList()}},o=i,r=l(1001),n=(0,r.Z)(o,a,s,!1,null,"42ea3f76",null),c=n.exports}}]);
//# sourceMappingURL=465.509877d7.js.map