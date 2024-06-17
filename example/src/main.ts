import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";

const env = import.meta.env;
console.log(env);

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import WwwDemoUi from "@www-demo-ui/www-demo-ui";

// createApp(App).mount("#app");
const app = createApp(App);
app.use(ElementPlus);
app.use(WwwDemoUi);
app.mount("#app");
