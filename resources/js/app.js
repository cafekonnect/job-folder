
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
window.Fire = new Vue();//this is anew istance of global custom event
import moment from 'moment';
import swal from 'sweetalert2';
import { Form, HasError, AlertError } from 'vform'
Window.form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

Vue.filter('upText', function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
});
Vue.filter('myDate', function (created) {
    return moment(created).format('MMMM Do YYYY');
});
import vueProgressBar from 'vue-progressbar'
Vue.use(vueProgressBar, {
    color: 'rgb(143,255,199)',
    failedColor: 'red',
    height: '3px'
})


window.swal = swal;

const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
});
window.toast = toast;



import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = [
    { path: '/dashboard', component: require('./components/Dashboard.vue') },
    { path: '/developer', component: require('./components/Developer.vue') },
    { path: '/about', component: require('./components/About.vue') },
    { path: '/services', component: require('./components/Services.vue') },
    { path: '/contact', component: require('./components/Contact.vue') },
    { path: '/users', component: require('./components/Users.vue') },
    { path: '/profile', component: require('./components/Profile.vue') }
]


const router = new VueRouter({

    routes

})


/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


Vue.component(
    'passport-clients',
    require('./components/passport/Clients.vue')
);

Vue.component(
    'passport-authorized-clients',
    require('./components/passport/AuthorizedClients.vue')
);

Vue.component(
    'passport-personal-access-tokens',
    require('./components/passport/PersonalAccessTokens.vue')
);

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
    el: '#app',
    router
});
