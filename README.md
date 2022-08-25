# chat-app
React Native Mobile Chat App
### Objective
To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.

### mobile view:
<img width="200" src="https://user-images.githubusercontent.com/78739948/173253161-fe62d830-ed62-41e7-8ddf-80d21e1cbc0c.png"><img width="200" src="https://user-images.githubusercontent.com/78739948/173253192-eeeeaa13-716f-4881-8b44-41a5bc2cd182.png"><img width="200" src="https://user-images.githubusercontent.com/78739948/173253206-ba874123-27e1-413d-a6a7-33f913268e64.png"><img width="200" src="https://user-images.githubusercontent.com/78739948/173253218-1d408828-0266-4979-a9eb-9e8cb33bd259.png"><img width="200" src="https://user-images.githubusercontent.com/78739948/173253226-47f49bf5-d155-46ad-a33f-6f80afb5704f.png">

### live app:


### Context
More and more people use their phones for daily tasks, such as shopping, creating to-do lists,
communicating with friends, scheduling meetings, and more. That's why many companies offer native
mobile versions of their web apps, or even skip creating a web app entirely.
In the past, building high-quality mobile apps required a lot of time and money because writing apps
for different platforms like iOS and Android required specialized programmers who could build and
maintain multiple codebases.
Over time, however, new technologies emerged that made it easier for companies to build and
maintain mobile applications using familiar syntax. One of these technologies is React Native, a
framework for building Android and iOS apps that only requires one codebase.
For this Achievement’s project, you’ll use React Native, Expo, and Google Firestore Database to build a
chat app that you can add to your portfolio and demonstrate your knowledge of JavaScript mobile
development.
## Features and Requirements
### User Stories
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my
friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange
the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any
time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.
## Key Features
- A page where users can enter their name and choose a background color for the chat screen
before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images
and location data.
- Data gets stored online and offline.
## Technical Requirements
- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map view.
- The chat interface and functionality must be created using the Gifted Chat library.
- The app’s codebase must contain comments.

## What technology did I use and why?
I chose to create the mobile application using React Native due to the following considerations:

- Develop and maintain the same codebase across different OS (iOS and Android)
- Increased performance compared to Hybrid Apps as UI is rendered natively
- Possibility to access device's APIs (camera, microphone, ...) (compared to PWA)
- Use existing skills in JavaScript and React, no need to learn another programming language
- Large and active community

Further, I'm using XCode as an iOS simulator and Android Studio as an Android emulator.

I use Expo as development environment to develop and test the app.

I use the React Navigation third party library to navigate between screens.

I use the React Native Gifted Chat library to create the UI of my chat app. The library has good GitHub statistics and is well documented. Further, it already provides predefined components for integral parts of the chat app:

- Message bubbles 
- A message input field
- A send button
- Options for displaying user names and avatars

I'm working with WebSocket as a real-time application technology as it fulfills the following requirements of my chat application:

- Transmitting in- and outgoing data immediately
- Two-way communication between clients and server
- Avoids data bloat compared to long polling

I use Cloud Firestore as data storage platform for this application. real-time data

---

## Development Process for the chat application
### Set up Expo as Development Environment
- Install Expo Command Line Interface
  - npm install expo-cli --global
- Create new Expo project in projects directory
  - expo init [project-name]
- Start expo by navigating to project folder & running
  - npm start
### Install React Navigation library to navigate between screens
- Navigate to project folder and run
  - npm install react-navigation
- Install necessary dependencies
  - npm install @react-navigation/native @react-navigation/stack
  - expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
### Set up Android Studio as Android Emulator
- Download Android Studio
- Make sure 'Android Virtual Device' is installed
- Add Android SDK Location to ~/.zshrc file
  - export ANDROID_SDK=/Users/myuser/Library/Android/sdk
  - export PATH=/Users/myuser/Library/Android/sdk/platform-tools:$PATH
- Create virtual device (via more actions > Virtual Device Manager) and click play to start
- Select 'Run app on Android' in Expo to run app on virtual device
- Press Command + Shift + R to start a screen recording.
### Integreat Gifted Chat library to create chat UI
- Install Gifted Chat
  - npm install react-native-gifted-chat
- Integrate Gifted Chat into application
  - import { GiftedChat } from 'react-native-gifted-chat';

### Set up Cloud Firestore as data storage platform
- Install Firestore via Firebase
  - npm install firebase
- Import Firestore in application (e.g, in Chat.js)
  - import { initializeApp } from "firebase/app";
  - import { getFirestore } from "firebase/firestore";
- Register App in Firebase settings

- Copy config code to application

- Initialize app

  - // Initialize Firebase
  - const app = initializeApp(firebaseConfig);
  - // Initialize Cloud Firestore and get a reference to the service
  - const db = getFirestore(app);
- Set up anonymous authentication in firebase console
### Set up Async Storage for offline functionalities
- Install package
  - expo install @react-native-community/async-storage
- Import AsyncStorage into app
  - import AsyncStorage from '@react-native-community/async-storage';
- Store and retrieve state from Async Storage
