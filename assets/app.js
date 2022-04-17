/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.scss';
import './bootstrap';

require('@fortawesome/fontawesome-free/css/all.min.css');
require('@fortawesome/fontawesome-free/js/all.js');

const $ = require('jquery');
require('bootstrap');
global.$ = global.jQuery = $;
// start the Stimulus application
$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});
//clear flash messages after 4sec
let alertMessage = document.querySelectorAll('.alert');
    setTimeout(()=>{
        if (alertMessage.length > 0) {
            alertMessage.forEach((am)=>{
                am.remove()
            })
        }
    }, 4000)





