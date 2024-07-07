# Reducers and State Machines in Local UI

This repo contains the slides and code examples for a talk I gave in February 2021. At my then-workplace (where dozens of teams across different orgs worked on React code), I noticed that although developers were familiar with using Redux reducers to manage app-wide state, they were using more haphazard patterns to manage the state of local UI components (forms, dialog boxes, buttons, etc.). This talk aims to demonstrate that reducers and state machines are useful at any level of the component hierarchy to manage state and decouple state-transition code from display code.

The main artifact from the talk is the [`useStateMachineReducer`](https://github.com/drbr/state-machine-talk/blob/main/src/examples/UseStateMachineReducer.tsx) hook,
which I encouraged my peers to copy-paste into their own projects.

## Codesandbox

The presentation is designed to be viewed in [codesandbox.io](https://codesandbox.io).

- If you're logged in to code sandbox, use [this link](https://codesandbox.io/s/github/drbr/state-machine-talk?moduleview=1&file=/src/slides/Introduction.tsx) to view the talk in "Current Module View" (enabled by default in the link below). Click on each slide in the `slides` directory to view it, and the rendered output will stay in sync with that file.
- If you're not logged in, use [this link](https://codesandbox.io/p/sandbox/github/drbr/state-machine-talk/tree/main/?file=%2Fsrc%2Findex.tsx) to view the talk and switch slides via the menu at the top. But you'll have to separately manually navigate to each file on the left to see its source.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

All the usual scripts are available, including:

- `yarn start`
- `yarn test`
- `yarn build`
- `yarn eject`
