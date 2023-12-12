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

To manage language runtimes on your machine, this repository uses [asdf](https://asdf-vm.com/). To run it on your machine:

1. Follow the installation guide:
2. Install the NodeJS and Java plugins. Java is only necessary for certain functions of the debug server. Development and Deployment will work just fine without it.

```bash
asdf plugin-add nodejs
asdf plugin-add java
asdf install
```

# Installation

## General

### Authorize

To deploy the component into your Salesforce installation, you need to authorize it first. In Visual Studio Code:

1. Hit `Ctrl` + `P` (win) or `Cmd` + `P` (mac) to open the prompt.
2. Type `>SFDX: Authorize an Org` and confirm with enter.
3. This will open a browser window, asking you to log into your Salesforce account.
4. Done

⚠️ If you are running an on-premise installation or use a non-standard url to log into Salesforce, open the `sfdx-project.json` file and change the value of the `sfdcLoginUrl` property to your login url.

### Deployment

After you have authorized the repository, you can deploy the included components into your Salesforce installation. This will enable you to drop Cognigy components into your Salesforce pages. It will not change any existing pages.

1. Hit `Ctrl` + `P` (win) or `Cmd` + `P` (mac) to open the prompt.
2. Type `>SFDX: Deploy This Source to Org` and confirm with enter.
3. Done

## Cognigy Copilot

### Add custom attribute

TODO: add explanation for receiving copilot embed url
