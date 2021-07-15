import { createApp } from 'vue'
import App from './App'
// Materialize UI
import "./assets/css/materialize.css"
import "./assets/css/material-icon.css"
import "./assets/waves"
// Perfect Scrollbar
import "./assets/css/perfect-scrollbar.css"
import PerfectScrollbar from "./assets/perfect-scrollbar"
//————————————————————

createApp(App).mount("#app")

new PerfectScrollbar(".data-bar")
new PerfectScrollbar(".event-bar")

new PerfectScrollbar(".main-buildings")
new PerfectScrollbar(".main-division")
new PerfectScrollbar(".main-counter")
