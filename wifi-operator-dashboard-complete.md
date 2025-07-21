/frontend
├── /app
│   ├── /api
│   │   └── /auth/[...nextauth]
│   │       └── route.ts
│   ├── /auth
│   │   ├── /login
│   │   │   └── page.tsx
│   │   ├── /register
│   │   │   └── page.tsx
│   │   ├── /forgot-password
│   │   │   └── page.tsx
│   │   ├── /reset-password
│   │   │   └── page.tsx
│   ├── /dashboard
│   │   ├── /(admin)
│   │   │   ├── /all-users
│   │   │   │   └── page.tsx
│   │   │   ├── /payments
│   │   │   │   └── page.tsx
│   │   │   ├── /profile
│   │   │   │   └── page.tsx
│   │   │   ├── /notifications
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── /(user)
│   │   │   ├── /payment-history
│   │   │   │   └── page.tsx
│   │   │   ├── /profile
│   │   │   │   └── page.tsx
│   │   │   ├── /next-payments
│   │   │   │   └── page.tsx
│   │   │   ├── /notifications
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── /components
│   ├── /ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── table.tsx
│   │   ├── dialog.tsx
│   │   └── toaster.tsx
│   ├── Sidebar.tsx
│   ├── PaymentModal.tsx
│   └── NotificationCard.tsx
├── /lib
│   ├── api.ts
│   ├── auth.ts
│   ├── react-query.ts
│   └── utils.ts
├── /public
│   ├── /icons
│   │   ├── favicon.ico
│   │   └── icon.png
│   └── manifest.json
├── /types
│   └── index.ts
├── next.config.js
├── tailwind.config.js
├── package.json
└── tsconfig.json