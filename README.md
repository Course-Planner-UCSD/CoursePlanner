# CoursePlanner

To work on this project run npm install in both main and /client folders to install all dependencies

## Commands to run the project:

npm run server (runs server)

npm run client (runs front end)

npm run dev (runs both client and server)

## What needs to be done after coding:

- [ ] deploy to heroku @everyone

- [ ] talk to acm people about hosting website with user data @everyone

## Known Issues and things that need to be coded:
Look at issues tab

<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>
<br>


## Course Planner
This website is a tool for students to create and save long-term plans. It features an account system with encrypted passwords for security, and an interface for creating, modifying, and deleting four and five year plans. Each plan can be customized, with options to select start year, number of years, and whether to include summer courses. Users can add courses to the fall, winter, spring, and (optionally) summer quarters of each year. Along with the course code, users can enter the number of units in each course. The plan will display quarterly and overall unit totals based on this data.

## Motivation
A long term plan is an extremely helpful tool for college students, and many students develop more than one in order to explore possiblities or prepare for different circumstances. Our website helps students keep track of their plans, providing them with a centralized place to store and update all of their long term plans.

## Screenshots
![The user tried to create an account with an invalid password.](images/create_account_screenshot.png "Creating an account")
Creating an account. For security reasons, the password guidelines must be met before the user can create an account.

![The user is logging in](images/login_screenshot.png "Logging in")
Logging in.

![The user is viewing two plans in the dashboard.](images/dashboard_screenshot.png "Dashboard")
The dashboard. From here, the user can view a list of the saved plans, with options to edit or delete each.

![The user is receiving warning alerts because the plan has multiple quarters with too many or too few units.](images/edit_plan_screenshot.png "Editing a plan")
Viewing a plan. From here the, the user can edit the name, start year, and number of years of the plan, as well as toggle summer courses, edit course lists, and edit notes. Multiple alerts have appeared warning the user that the plan has quarters with too few or too many units.

![A year of courses](images/edit_plan_screenshot_year.png "Editing course lists")
The user can enter as many courses as they would like for each quarter. Each class has a course code and number of units. Quarterly unit totals display below each quarter.

![The user is viewing the notes for this plan.](images/edit_plan_screenshot.png "Notes")
The user can enter notes related to the plan.

## Tech/framework used

**Built with**
- [MongoDB](https://www.mongodb.com/) used to store account and plan data
- [Express](https://expressjs.com/) used for ?
- [React](https://reactjs.org/) used for the frontend
- [Node.js](https://nodejs.org/en/) used for ?
- [Material-UI](https://material-ui.com/) used for the frontend (form inputs, headers, alerts, etc)
- [material-table](https://material-table.com/#/) used for the frontend (tables in dashboard and plan view)

## Features
- Create, edit, and delete plans
- Set start year and number of years (4 or 5)
- Quarter system with fall, winter, spring, and summer
- Summer quarter can be toggled on and off
- Quarters can each have any number of courses
- Enter the units for each course to get quarterly and overall unit totals
- Alerts warn if a quarter has too many (over 20) or too few (under 12) units
- Plan name, start year, number of years can all be edited, as well as the courses in each quarter
- Editable notes associated with each plan

## Code Example
Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Installation
Provide step by step series of examples and explanations about how to get a development env running.

## Tests
Describe and show how to run the tests with code examples.

## How to use?
If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project.

## Contribute

Let people know how they can contribute into your project. A [contributing guideline](https://github.com/zulip/zulip-electron/blob/master/CONTRIBUTING.md) will be a big plus.

## Credits
Give proper credits. This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project. 

#### Anything else that seems useful

## License

MIT © [Course Planner](github.com/Course-Planner-UCSD)
