Hi ๐,

We're excited in your interest in Unite. We have a small coding challenge for you to work on. It should give you an insight into some frontend technologies we're using at Unite. During the course of the subsequent workshop we can both get a better idea of how well we'd be able to work with each other.

Our frontend stack consists of React with TypeScript and various backends using REST and GraphQL APIs.

You might have heard of http://todomvc.com/. It's a neat, but outdated project, which contains a reference implementation of a simple to-do app written in various JavaScript frameworks, libraries and dialects. In this fork we only include the typescript-react implementation in order to keep the challenge simple. The implementation is not production-ready, and your goal will be to get it there and to add new features.

# What we care about

- ๐ What you deliver should be a production ready application
- ๐งน Whatever you write, make sure it's clean and maintainable
- ๐ Ensure the app looks good with the new features you add
- ๐ Show us how you work, by writing proper Git commits

## Feedback to our Coding Challenge

We care very much about our recruitment process in general and about the case study in particular. This is the reason why we kindly ask you to provide us with some feedback after you have solved the case study. We automated ๐ค the process of sending out the case-study, but we can assure you that a human ๐ง๐ฉ ๏ธwill read your answers and of course review your code.

### โฑ๏ธ How many hours did you spend on completing the task?

- 1 workday understanding the code and writing the features
- 1 workday styling, layout, responsive behaviour
- 1 workday polishing, reviewing, tests, cleanup

### ๐คท Are you happy with your solution/submission?

I am happy for the following reasons:

- I have not worked with a class based app in ages so I accepted this as a nice challenge
- I hope I proposed an elegant way to use the requested features
- I have added some smart checks to prevent duplicate badge sumbission, to allow adding badges from title input as well as badge inputs so the results should always be clean
- I added eslint, fixed all eslint errors, fixed all deprecated methods, fixed small code errors eslint threw up
- I hope I proposed an attractive design and layout
- I made sure that layout and functionality adapt well to small screens
- I have not managed to break it (yet) :)

### ๐? What would you improve if you had more time to work on the task?

- I would probably have converted to functional components with hooks but decided to dive into requirements and features to make sure I met the deadline
- seperate and fragment app.tsx and todoItem.tsx to make it somewhat cleaner and less convoluted
- suggest badges from a list of commonly used keywords
- colour code badges based on content
- add more checks such as preventing concatenated "@" for example
- add some usability and accessibility features (double click onm title isn't great but was part of the requirements)
- an app is never done :)

### ๐ค What are the difficulties/problems you faced while doing the task?

- some difficulties with the ts.config, parsing errors
- some "any" types left in from the original

### ๐ฌ Any free form feedback you would like to share with us?

As I didn't add any new components, only features and extensions, I concentrated on end to end testing and wrote a couple of extensive tests to check all the new features and functionalities.

So far the interview and challenge have been a pleasure, thank you!

# Task 1

Start the app by using `yarn && yarn start` and check it out at `http://localhost:4000`.

Ask yourself:

- What's bad?
- What would you do differently?
- Are you missing anything in the tooling department?

Apply your suggestions/improvements to the existing code and feel free to refactor as much as you like.

# Task 2

We would like to be able to add labels to each to-do item.

- When entering a new item we want to add one or more labels by adding words like @work or @important to an item.
  - These labels should not be part of the item title itself, but instead show up right-aligned as badges.
  - On double-click we want to be able to edit the to-do title and labels.
  - Example:
    - "Buy groceriesย?@shopping @household"
      - To-do: "Buy groceries"
      - Tags: "shopping", "household"
- The labels should be individually deletable when not in edit mode.

# Task 3

You'll get bonus points if you write React component tests for your newly added features ๐

# How to submit your solution

- Develop on a branch and create a merge request once you are done.
- Send an email to your contact from the Unite HR team, and we will have a look at your submission.

Have fun with the challenge,

Team Unite
