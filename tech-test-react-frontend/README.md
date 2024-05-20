# 3D Group technical assessment - React frontend

## What have we provided you

We have provided you with a simple React, TypeScript and Tailwind setup using Vite.

## Setup

We recommend using [nvm](https://github.com/nvm-sh/nvm) to manage the node version required by this application. Once you have nvm available on your computer, run the following command to install the correct node version provided in `.nvmrc`:

```sh
nvm install
```

Once the correct node version is installed, you can run the following command to use this version:

```sh
nvm use
```

## What is your task

Below is an overview of what is required:

- Read data from the api. The api is the express app that you should have completed as the first part of the technical assessment. If you have not completed this yet, please do that first.
- Display the entries from the data in a list or table.
- Provide the ability to change the `status` of any entry.
- Provide the ability to remove any entry.
- Styling is required; however, we only expect styles that enhance the user interface readability as a minimum. Elements should not rely on default browser styles.

## What should you do once you have completed the task

Please upload the app to your GitHub account and provide us with a link.

## Additional notes

- You are not required to persist data mutations of any kind (editing and removing items) to localStorage or a database (via the api). Data mutations should only be managed via frontend state, and we expect them to be reset if we refresh the page.
- Although we have provided you with Tailwind for convenience, feel free to use any styling approach that you are comfortable with.
- This is one part of the technical assessment (the frontend part). This is to accompany the other part of the technical assessment (the backend part).