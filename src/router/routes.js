const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "reports",
        component: () => import("components/reports/ReportsForm.vue"),
      },
      {
        path: "reports/new",
        component: () => import("components/reports/NewReportsForm.vue"),
      },
      {
        path: "informes",
        component: () => import("components/Reports/InformesForm.vue"),
      },
      {
        path: "informes/new",
        component: () => import("components/Reports/NewInforme.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("components/auth/LoginForm.vue"),
  },
  {
    path: "/register",
    component: () => import("components/auth/RegisterForm.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
