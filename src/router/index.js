import Vue from 'vue' 
import Router from 'vue-router' 
 
const DashboardLayout = () => import(/* webpackChunkName: "dashboard" */ '../components/dashboardLayout.vue') 
const LoginPageLayout = () => import('../components/LoginPageLayout.vue')

function loadView(view) { 
    return () => import(/* webpackChunkName: "view[request]" */ `../components/dashboardContents/${view}.vue`) 
} 

function loadLoginPage(view){
    return () => import(`../components/LoginPageContents/${view}.vue`)
}
 
const routes = [
    { 
        path: '/',
        component: LoginPageLayout,
        children: [
            {
                name: 'LoginPage',
                path: '',
                component: loadLoginPage('LoginPage')
            }
        ]
    },     
    {       
        path: '/',       
        component: DashboardLayout,       
        children: [  
            {           
                name: 'UserController',           
                path: 'dashboard',           
                component: loadView('userController')         
            },
            {           
                name: 'ServicesController',           
                path: 'service',           
                component: loadView('servicesController')         
            }       
        ],   
    },   
]   

Vue.use(Router) 
 
const router = new Router({mode: 'history', routes: routes}) 
 
export default router 