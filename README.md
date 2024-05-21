# project_minori-next-deployment-repo

## Directory Structure
```
.
├── Dockerfile
├── README.md
├── tests
│ ├── snapshots
│ ├── api
│ └── snapshot.js
├── public
│ ├── fonts
│ ├── gif
│ ├── images
│ └── svgs
├── src
│ ├── api
│ ├── app
│ │ ├── classes
│ │ ├── components
│ │ ├── googleLogin
│ │ ├── layout.tsx
│ │ ├── not-found.tsx
│ │ └── page.tsx
│ ├── components
│ ├── constants
│ ├── hooks
│ ├── interfaces
│ ├── model
│ ├── recoil
│ └── styles
├── commitlint.config.js
├── jest.config.ts
├── jest.setup.ts
├── minori-next-task.json
├── next-env.d.ts
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## Scripts
- `dev`: Runs the development server
- `build`: Builds the production application
- `start`: Starts the production server
- `lint`: Lints the code using GTS
- `test`: Runs the tests using Jest
- `test:watch`: Runs the tests in watch mode
- `postinstall`: Sets up Husky for Git hooks
- `lint-staged`: Runs ESLint on staged files

## Version
- Next.js: 14.0.4
- TypeScript: 5.3.3
- GTS: 5.2.0
- Commitlint: 18.4.4
- Husky: 8.0.3
- Jest: 29.7.0
