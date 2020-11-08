# JANUS - ReadMe

Janus is an open-source news aggregator and fact-checker licensed under GPL-3.0 License. Currently under limited active development.

1. [Why ?](##why-?)
2. [The Tech](##the-tech---server-side.)



## Why ?

I am a news junkie, always have been, I spend way more time than I am willing to admit reading the news online on a daily basis. 

**What if there was a place that could give me all top headlines by topic with a short meaningful summary?** 

I would save so much time! 

**But what about fake news?** I want to know if something is true or not, especially if I am just reading a short summary. In case it is false, however,  I do want to know why, and who made that call, so that I can keep my eyes out in case I spot it in the wild.

![https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjYzOTIxfQ](https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjYzOTIxfQ)

## Janus is born.

To answer my own personal quest for a tool that gave me exactly what I needed, to challenge myself technically, and create a good product that could showcase my capabilities for future job-hunting. At the time Janus was conceived I was (am currently) attending a Coding Bootcamp in Tokyo, at Code Chrysalis. After 5 weeks of study, on a solo assignment to develop a full-stack app in **48h,** Janus was born and its first MVP was deployed to firebase.

![https://i.imgur.com/EdlEWfy.jpg](https://i.imgur.com/EdlEWfy.jpg)

## The Tech - Server Side.

Janus architecture is pretty straightforward. A series of **firebase functions** (currently on HTTP call, rather than Cron Job, to reduce bandwidth usage) call **gNewsApi** to fetch the 15 top headlines on a variety of topics. After, each title is sent to the **Google FactCheckAPI** if something comes up, it is attached to our news object (currently only the first result of the FactCheck API is stored) and stored into our Firestore DB. There is no static server, only cloud functions.

## The Tech - Client Side.

The client is built using **React** (might consider switching to Vue sometime soon). User creation and authentication is handled by Firebase.
