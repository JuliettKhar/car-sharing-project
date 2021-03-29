import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/order",
    name: "Order",
    redirect: { name: "Location" },
    /*
     * route level code-splitting
     * this generates a separate chunk (about.[hash].js) for this route
     * which is lazy-loaded when the route is visited.
     */
    component: () =>
      import(/* webpackChunkName: "Order" */ "../views/OrderForm.vue"),
    children: [
      {
        path: "location",
        name: "Location",
        meta: { title: "location" },
        component: () =>
          import(
            /* webpackChunkName: "Location" */ "../components/common/order/Location.vue"
          ),
      },
      {
        path: "model",
        name: "Model",
        meta: { title: "model" },
        component: () =>
          import(
            /* webpackChunkName: "Model" */ "../components/common/order/Model.vue"
          ),
      },
      {
        path: "extra",
        name: "Extra",
        meta: { title: "extra" },
        component: () =>
          import(
            /* webpackChunkName: "Extra" */ "../components/common/order/Extra.vue"
          ),
      },
      {
        path: "amount",
        name: "Amount",
        meta: { title: "amount" },
        component: () =>
          import(
            /* webpackChunkName: "Amount" */ "../components/common/order/Amount.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export const useRouter = () => {
  return {
    routes,
    router,
  };
};

export default router;
