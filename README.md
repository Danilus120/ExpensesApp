# 💰 Expenses App 💰

## Table of contents

- ℹ️ [General info](#ℹ️-general-info)
- 🎉[Project overview](#-project-overview)
- 📖 [What I learned during this project?](#-what-i-learned-during-this-project)
- ⚙️ [Technologies](#️-technologies-used-in-project)
- 📷 [Screenshots](#-screenshots)
- 💾 [Installation](#-installation)
- 📜 [Available scripts](#-available-scripts)
- 🔴 [Live](#-live)

## ℹ️ General info

The expenses app was created to help people control their finances. The app is writed on next.js + Typescript + Firebase + PWA.

## 🎉 Project Overview

The project I created took me about 2 months. I created it after coming home from my actual job. It has a homepage, authentication, and dashboard with applications. After authentification, the user can move around the dashboard. The project have confirm modal and toast notifications.

Functions at the dashboard:

- Dashboard -> You can see your statistics about the actual month and move to other months by navigating at top of the page.
- Expenses -> You can add your expenses with a specified date, category, name of expense, value, and description. Later you can edit or delete expenses.
- Income -> You can add income with specified data, category, title, income value, and description. There are buttons for editing or deleting too.
- Investments -> You can add crypto investment for the 20 most popular cryptocurrencies. In active investments, you will see what profit/loss can you pay out (it will count toward statistics). After the payout, you can edit your investment with the correct payout value (the program will calculate payout exchange by your payout value) or you can roll back the investment to still active if it wasn't done by purpose. While it's active, you can delete it.
- Reminders -> You can add a reminder of future bills to your account. It will remind you if the date of the event will be in past. Then will be modal, where you can add a reminder to your expenses or dismiss it. If you picked recursive, reminders will go to the next date. On the reminders page, you will have a calendar, which will show all the events. If you click on an event, the edit modal will show. That's space where you can edit or delete the reminder.
- Goals -> You can calculate the time to achieve a savings goal by your average of savings from your statistics.
- Statistics -> You can track your money flow by daily, monthly, and yearly statistics. On that page, you can see your charts with legends and percentage expenses for all user categories.

## 📖 What I learned during this project?

During this project, I used Context API for the state management of my application. Statistics are handled by charts. I had many difficulties in this project, but it not discouraged me. The most difficult problem that I had, was creating a generic Form, which I can easily connect in templates without a compound with a react-hook-form controller. One of the others difficulties was creating logic in ContextAPI for updating data in user DB. The next problem that I encountered was customizing the react table, to create a CRUD table with it.

## ⚙️ Technologies used in project:

| Tech                                                                 | Description                                                                                                                           |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| [Next.js](https://nextjs.org/)                                       | Next.js is a flexible React framework that gives you building blocks to create fast web applications.                                 |
| [Next-pwa](https://github.com/shadowwalker/next-pwa)                 | Allows you to create PWA from Next.js                                                                                                 |
| [React](https://reactjs.org/)                                        | A JavaScript library for building user interfaces                                                                                     |
| [Typescript](https://www.typescriptlang.org/)                        | Javascript superset language                                                                                                          |
| [Sass](https://sass-lang.com/)                                       | Css extension                                                                                                                         |
| [Cypress](https://www.cypress.io/)                                   | Cypress is a purely JavaScript-based front-end testing tool built for the modern web.                                                 |
| [Cypress-firebase](https://github.com/prescottprue/cypress-firebase) | Cypress plugin and custom commands for testing Firebase projects                                                                      |
| [Firebase](https://github.com/firebase/firebase-js-sdk)              | The Firebase JavaScript SDK implements the client-side libraries used by applications using Firebase services.                        |
| [Firebase-admin](https://github.com/firebase/firebase-admin-node)    | The Firebase Admin Node.js SDK enables access to Firebase services from privileged environments.                                      |
| [React-hook-form](https://react-hook-form.com/)                      | React Hook Form is a library that helps validate forms in React.                                                                      |
| [Yup](https://github.com/jquense/yup)                                | Yup is a schema builder for runtime value parsing and validation.                                                                     |
| [Uuidv4](https://github.com/thenativeweb/uuidv4)                     | uuidv4 creates v4 UUIDs.                                                                                                              |
| [Chart.js](https://www.chartjs.org/)                                 | Chart.js is a Javascript library that allows designers and developers to draw all kinds of charts using the HTML5 canvas element.     |
| [React-chartjs-2](https://react-chartjs-2.js.org/)                   | React components for Chart.js                                                                                                         |
| [Date-fns](https://date-fns.org/)                                    | date-fns provides the most comprehensive, yet simple and consistent toolset for manipulating JavaScript dates in a browser & Node.js. |
| [React-hot-toast](https://react-hot-toast.com/)                      | Toast notifications                                                                                                                   |
| [React-icons](https://react-icons.github.io/react-icons/)            | React Icons                                                                                                                           |
| [React-loading](https://github.com/fakiolinho/react-loading)         | React loading spinner                                                                                                                 |
| [React-select](https://react-select.com/home)                        | A flexible and beautiful Select Input control for ReactJS with multiselect, autocomplete, async and creatable support.                |
| [React-table](https://react-table-v7.tanstack.com/)                  | Lightweight and extensible data tables for React                                                                                      |
| [Eslint](https://eslint.org/)                                        | Javascript Linter                                                                                                                     |
| [Prettier](https://prettier.io/)                                     | Code formatter                                                                                                                        |

## 📷 Screenshots

<p align="center">
    <img src="screenshots/1.png" alt="Screen Shot">
</p>

<p align="center">
    <img src="screenshots/2.png" alt="Screen Shot">
</p>

<p align="center">
    <img src="screenshots/3.png" alt="Screen Shot">
</p>

## 💾 Installation

To run this project, install it locally using npm:

```
git clone https://github.com/Danilus120/ExpensesApp.git

npm install

```

Then add firebase config to enviroment variables in .env.local file

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

Now you can open dev with:

```
npm run dev
```

For config cypress add 3 files:

- serviceAccount.json (you can get this file in firebase -> project settings -> service accounts -> generate new private key ):

```
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```

- cypress.env.json:

```
{
  "TEST_UID": "YOUR_AUTHENTICATED_USER_ID_FOR_TESTING"
}
```

- cypress/support/fbConfig.ts:

```
const firebaseConfig = {
 apiKey: "",
 authDomain: "",
 projectId: "",
 storageBucket: "",
 messagingSenderId: "",
 appId: "",
};

export default firebaseConfig;
```

## 📜 Available scripts

| Command           | Description            |
| ----------------- | ---------------------- |
| `npm run dev`     | Open local server      |
| `npm run build`   | Create optimized build |
| `npm run cypress` | Open testing panel     |

## 🔴 Live

https://expenses-app-nine.vercel.app/
