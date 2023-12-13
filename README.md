# Overview

This repository contains a collection of all components developed and provided by Cognigy to facilitate a seamless integration with Salesforce.

## Copilot Integration

This component will integrate Cognigy Copilot directly into Chat Layouts

# Setup

## Install CLI

To start with, you need to install the Salesforce CLI. Find the setup guide here: https://developer.salesforce.com/docs/atlas.en-us.sfdx_setup.meta/sfdx_setup/sfdx_setup_intro.htm

## Setup Editor

For a smooth developer experience, it is recommended to follow the Salesforce setup guide for Visual Studio Code: https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/set-up-visual-studio-code

## Setup languages

The components have been built and tested on nodeJS version 21.4.0. You can check your version with `node -v`. Make sure you have a matching version number through your preferred method.

To manage language runtimes on your machine, this repository uses [asdf](https://asdf-vm.com/). To run it on your machine:

1. Follow the installation guide: https://asdf-vm.com/guide/getting-started.html
2. Install the NodeJS plugin and install the right version by running the following command in a terminal window

```bash
asdf plugin-add nodejs
```

3. Restart your terminal
4. Open a terminal in the project root directory and run the following commands:

```bash
asdf install
npm i
```

# Installation

## Deploy component to Salesforce

### Authorize

To deploy the component into your Salesforce installation, you need to authorize it first. In Visual Studio Code:

1. Run `sf org login`
2. Chose a preferred authorization method
3. Done

### Deployment

After you have authorized the repository, you can deploy the included components into your Salesforce installation. This will enable you to drop Cognigy components into your Salesforce pages. It will not change any existing pages.

1. Open a shell in the project root directory.
2. Run `sf deploy`
3. Specify the org you want to deploy into. If you have kept to the instructions so far, only one organization should be selectable.
4. Hit enter.
5. Automated tests will run. If they are successful, the component will be deployed into your Salesforce instance.

## Set up component

### Add custom attribute

TODO: add explanation for receiving copilot embed url

### Integrate into Livechats

TODO: add explanation for adding component to LiveChatTranscript record pages

# Development

## VSCode

For a smooth developer experience, it is recommended to follow the Salesforce setup guide for Visual Studio Code: https://trailhead.salesforce.com/content/learn/projects/quick-start-lightning-web-components/set-up-visual-studio-code

## Linting

You can lint the project by running `npm run lint`

## Tests

The components in this repositories are developed under a test-driven approach. You can run the tests with `npm run test:unit`

## Sandbox

For demo purposes and maintaining visual consistency, the component(s) in this repository can be previewed in a sandboxed environment. To start it, run `npm run storybook`.
