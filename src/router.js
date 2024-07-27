import { createMemoryHistory, createRouter } from "vue-router";

import MapScreen from "./components/MapScreen.vue";

const routes = [{ path: "/", name: "mapScreen", component: MapScreen }];

export default createRouter({
	history: createMemoryHistory(process.env.VUE_APP_BASE_URL),
	routes,
});
