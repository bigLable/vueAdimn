import Login from './views/Login.vue'

import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/seerkerList.vue'
import Page5detail from './components/seekerMent/seerkerListRecomed.vue'
import seekerResume from './components/seekerMent/seekerResume.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
import Businessmanagement from './views/organizationalmanagement/Businessmanagement.vue'
import ListRecruitmentcertification from './components/applicationprocessing/detail-ListRecruitmentcertification.vue'
import detailBusinessmanagement from './components/organizationalmanagement/Businessmanagement/detailBusinessmanagement.vue'
import Recruitmentcertification from './views/Applicationprocessing/Recruitmentcertification.vue'
import ChecKresumeapplication from './views/Applicationprocessing/ChecKresumeapplication.vue'
import detailViewResume from './components/applicationprocessing/detail-ViewResume.vue'
import Checkposition from './views/Applicationprocessing/Checkposition.vue' 
import DetailCheckposition from './components/applicationprocessing/detail-Checkposition.vue'
import applicationPostIssuance from './views/Applicationprocessing/applicationPostIssuance.vue'
import detailapplicationPostIssuance from './components/applicationprocessing/detail-applicationPostIssuance.vue'
import Joinagencies from './views/Applicationprocessing/Joinagencies.vue'
import NotFound from './views/404.vue'
import RecruiterManagement from './views/nav2/RecruiterManagement.vue'




let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    
    //{ path: '/main', component: Main },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航一',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/main', component: Main, name: '主页', hidden: true },
    //         { path: '/table', component: Table, name: 'Table' },
    //         { path: '/form', component: Form, name: 'Form' },
    //         { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: `求职者管理`,
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page5', component: Page5, name: `求职者管理 ` },
            // { path: '/page5detail', component:Page5detail,name:'推荐公司' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: `招聘者管理`,
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/RecruiterManagement', component: RecruiterManagement, name: `招聘者管理 ` },
    //         // { path: '/page5detail', component:Page5detail,name:'推荐公司' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '机构管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path:'/Businessmanagement', component:Businessmanagement,name:'企业管理' },
          
        ]
    },
    {
        path: '/',
        component: Home,
        name: '申请处理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path:'/Recruitmentcertification', component:Recruitmentcertification,name:'机构认证申请' },
            { path:'/ChecKresumeapplication', component:ChecKresumeapplication,name:'查看简历申请' },
            { path:'/Checkposition', component:Checkposition,name:'查看职位申请' },
            { path:'/applicationPostIssuance', component:applicationPostIssuance,name:'发布职位申请' },
            { path:'/Joinagencies', component:Joinagencies,name:'加入机构申请' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '页面详情集合',
        iconCls: 'fa fa-id-card-o',
        children: [
            // { path: '/page4', component: Page4, name: '页面4' },
            // { path: '/page5', component: Page5, name: '求职者管理' },
            { path: '/page5detail', component:Page5detail,name:'推荐公司' },
            { path: '/seekerResume', component:seekerResume,name:'求职者简历' },
            { path:'/detailBusinessmanagement',component:detailBusinessmanagement,name:'企业详情'},
            { path:'/ListRecruitmentcertification',component:ListRecruitmentcertification,name:'申请人机构详情'},
            { path:'/detailViewResume',component:detailViewResume,name:'简历查看申请详情'},
            { path:'/DetailCheckposition',component:DetailCheckposition,name:'查看职位申请详情'},
            { path:'/detailapplicationPostIssuance',component:detailapplicationPostIssuance,name:'发布职位申请详情'} 
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;