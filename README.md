# chat-app
React Native Mobile Chat App
### Objective
To build a chat app for mobile devices using React Native. The app will
provide users with a chat interface and options to share images and their
location.
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
