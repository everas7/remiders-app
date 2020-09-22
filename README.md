# Overview

Reminders App is a web application that allows users to set reminders for specific dates with important information such as time and city. It also provide weather information to the user based on the date and city of each reminder.

# Features
- Add reminders
- Edit reminders
- Delete single/all reminders on a day
- Switch months
- Weather forecast up to 7 days ahead of current day
- Dark mode
- Unit test

# Anatomy

The project is composed by a client webapp built with ReactJs.

WebApp Structure
- app
  - api
  - common
  - layout
  - models
  - store
- features
  - reminders
  - nav

# Setting Up Project
## Environment Variables

To be able to have the weather forecast functionality an Open Weather account api key is needed. Please add this variable to a .env file.

```
REACT_APP_WEATHER_API_KEY=213asdnasd1f
```

# Installing Dependencies

```
npm install
```

# Running Project

```
npm start
```

# Running Tests

```
npm test
```


# Additional Notes
TODO
