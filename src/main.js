// Bootstrap Vue Next necessary css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "../src/router";
import axios from "axios";
import { createBootstrap } from "bootstrap-vue-next";

import "bootstrap/dist/js/bootstrap.js";

createApp(App).use(createBootstrap()).use(router).use(axios).mount("#app");
