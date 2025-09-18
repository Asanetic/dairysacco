// sidebarConfig.js

export const sidebarConfig = [
  // Dashboard
  { 
    type: "link", 
    label: "Dashboard", 
    icon: "fa fa-home", 
    href: (routes) => `${routes.cms}/dashboard/main`, 
    roles: [] 
  },

  // Farmers
  {
    type: "submenu",
    label: "Farmers",
    icon: "fa fa-user",
    roles: [],
    items: [
      { label: "Add Farmer", href: (routes) => `${routes.cms}/farmers/profile`, roles: [] },
      { label: "All Farmers", href: (routes) => `${routes.cms}/farmers/list`, roles: [] },
    ],
  },

  // Graders
  {
    type: "submenu",
    label: "Graders",
    icon: "fa fa-id-card",
    roles: [],
    items: [
      { label: "Add Grader", href: (routes) => `${routes.cms}/graders/profile`, roles: [] },
      { label: "All Graders", href: (routes) => `${routes.cms}/graders/list`, roles: [] },
    ],
  },

  // Collections
  {
    type: "submenu",
    label: "Milk Collections",
    icon: "fa fa-tint",
    roles: [],
    items: [
      { label: "Record Collection", href: (routes) => `${routes.cms}/milkcollections/profile`, roles: [] },
      { label: "All Collections", href: (routes) => `${routes.cms}/milkcollections/list`, roles: [] },
    ],
  },

  // SMS
  {
    type: "submenu",
    label: "SMS",
    icon: "fa fa-envelope",
    roles: [],
    items: [
      { label: "Send SMS", href: (routes) => `${routes.cms}/smsbox/profile`, roles: [] },
      { label: "SMS History", href: (routes) => `${routes.cms}/smsbox/list`, roles: [] },
    ],
  },

  // Reports
  {
    type: "submenu",
    label: "Reports",
    icon: "fa fa-copy",
    roles: [],
    items: [
      { label: "Farmer Report", href: (routes) => `${routes.cms}/farmercollections/list`, roles: [] },
      { label: "Grader Report", href: (routes) => `${routes.cms}/graderscollections/list`, roles: [] },
      { label: "Milk Collection Report", href: (routes) => `${routes.cms}/milkcollections/list`, roles: [] },
    ],
  },

  // Users & Settings
  {
    type: "submenu",
    label: "Users & Settings",
    icon: "fa fa-gear",
    roles: [],
    items: [
      { label: "Add user", href: (routes) => `${routes.cms}/users/profile`, roles: [] },
      { label: "User Management", href: (routes) => `${routes.cms}/users/list`, roles: [] },
    ],
  },

  // Actions
  { type: "link", label: "My Account", icon: "fa fa-shield", href: (routes) => `${routes.cms}/users/list`, roles: [] },
];
