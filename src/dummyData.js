export const Users = [
  {
    id: 1,
    profilePicture: require("./assets/img/avatars/team-1.jpg"),
    username: "Safak Kocaoglu",
    rate: 1,
  },
  {
    id: 2,
    profilePicture: require("./assets/img/avatars/team-2.jpg"),
    username: "Janell Shrum",
    rate: 2,
  },
  {
    id: 3,
    profilePicture: require("./assets/img/avatars/team-3.jpg"),
    username: "Alex Durden",
    rate: 1,
  },
  {
    id: 4,
    profilePicture: require("./assets/img/avatars/team-4.jpg"),
    username: "Dora Hawks",
    rate: 5,
  },
  {
    id: 5,
    profilePicture: require("./assets/img/avatars/team-1.jpg"),
    username: "Thomas Holden",
    rate: 5,
  },
  {
    id: 6,
    profilePicture: require("./assets/img/avatars/team-2.jpg"),
    username: "Shirley Beauchamp",
    rate: 2,
  },
  {
    id: 7,
    profilePicture: require("./assets/img/avatars/team-3.jpg"),
    username: "Travis Bennett",
    rate: 5,
  },
  {
    id: 8,
    profilePicture: require("./assets/img/avatars/team-4.jpg"),
    username: "Kristen Thomas",
    rate: 1,
  },
  {
    id: 9,
    profilePicture: require("./assets/img/avatars/team-1.jpg"),
    username: "Gary Duty",
    rate: 3,
  },
  {
    id: 10,
    profilePicture: require("./assets/img/avatars/team-2.jpg"),
    username: "Safak Kocaoglu",
    rate: 4,
  },
];

export const CourcesDB = [
  {
    id: 1,
    CourcesName: "HTML",
    photo: require("./assets/img/Courses/html.png"),
    teacher: require("./assets/img/avatars/team-1.jpg"),
    CourcesTeacher: "ALi Esmaiel",
  },
  {
    id: 2,
    CourcesName: "CSS",
    photo: require("./assets/img/Courses/css.png"),
    teacher: require("./assets/img/avatars/team-2.jpg"),
    CourcesTeacher: "ALi Esmaiel",
  },
  {
    id: 3,
    CourcesName: "PHP",
    photo: require("./assets/img/Courses/php.png"),
    teacher: require("./assets/img/avatars/team-3.jpg"),
    CourcesTeacher: "ALi Esmaiel",
  },
  {
    id: 4,
    CourcesName: "my PHP",
    photo: require("./assets/img/Courses/php.png"),
    teacher: require("./assets/img/avatars/team-4.jpg"),
    CourcesTeacher: "ALi Esmaiel",
  },
  {
    id: 5,
    CourcesName: "laravel",
    photo: require("./assets/img/Courses/html.png"),
    teacher: require("./assets/img/avatars/team-1.jpg"),
    CourcesTeacher: "ALi Esmaiel",
  },
];
export const Questions = [
  {
    id: 1,
    QuestionText: "What does HTML stand for ?",
    answerQuestion: [
      { id: 1, answerText: "Hyper Text Markup Language", isTrue: true },
      {
        id: 2,
        answerText: "Hyperlinks and Text Markup Language",
        isTrue: false,
      },
      { id: 3, answerText: "Home Tool Markup Language", isTrue: false },
    ],
  },
  {
    id: 2,
    QuestionText: "Who is making the Web standards ?",
    answerQuestion: [
      { id: 1, answerText: "Google", isTrue: false },
      { id: 2, answerText: "Microsoft", isTrue: false },
      { id: 3, answerText: "Mozilla", isTrue: false },
      { id: 4, answerText: "The World Wide Web Consortium", isTrue: true },
    ],
  },
  {
    id: 3,
    QuestionText: "Choose the correct HTML element for the largest heading ?",
    answerQuestion: [
      { id: 1, answerText: "<heading>", isTrue: false },
      { id: 2, answerText: "<head>", isTrue: false },
      { id: 3, answerText: "<h6>", isTrue: false },
      { id: 4, answerText: " <h1>", isTrue: true },
    ],
  },
  {
    id: 4,
    QuestionText:
      "What is the correct HTML element for inserting a line break ?",
    answerQuestion: [
      { id: 1, answerText: "<Br>", isTrue: true },
      { id: 2, answerText: "<break>", isTrue: false },
      { id: 3, answerText: "<lb>", isTrue: false },
    ],
  },
  {
    id: 5,
    QuestionText: "What is the correct HTML for adding a background color ?",
    answerQuestion: [
      { id: 1, answerText: '<body bg="yellow">', isTrue: false },
      {
        id: 2,
        answerText: '<body style="background-color:yellow;">',
        isTrue: true,
      },
      { id: 3, answerText: "<background>yellow</background>", isTrue: false },
    ],
  },
  {
    id: 6,
    QuestionText: "Choose the correct HTML element to define important text ?",
    answerQuestion: [
      { id: 1, answerText: "<strong>", isTrue: true },
      { id: 2, answerText: "<b>", isTrue: false },
      { id: 3, answerText: "<important>", isTrue: false },
      { id: 4, answerText: "<i>", isTrue: false },
    ],
  },
  {
    id: 7,
    QuestionText: "Choose the correct HTML element to define emphasized text ?",
    answerQuestion: [
      { id: 1, answerText: "<em>", isTrue: true },
      { id: 2, answerText: '<italic">', isTrue: false },
      { id: 3, answerText: "<i>", isTrue: false },
    ],
  },
  {
    id: 8,
    QuestionText: "How can you open a link in a new tab/browser window ?",
    answerQuestion: [
      { id: 1, answerText: '<a href="url" new>', isTrue: false },
      { id: 2, answerText: '<a href="url" target="_blank">', isTrue: true },
      { id: 3, answerText: '<a href="url" target="new">', isTrue: false },
    ],
  },
  {
    id: 9,
    QuestionText: "Which of these elements are all <table> elements ?",
    answerQuestion: [
      { id: 1, answerText: "<table><tr><td>", isTrue: true },
      { id: 2, answerText: "<table><head><tfoot>", isTrue: false },
      { id: 3, answerText: "<thead><body><tr>", isTrue: false },
      { id: 4, answerText: "<table><tr><tt>", isTrue: false },
    ],
  },
  {
    id: 10,
    QuestionText: "What is the correct HTML for making a checkbox ?",
    answerQuestion: [
      { id: 1, answerText: "<checkbox>", isTrue: false },
      { id: 2, answerText: '<input type="check">', isTrue: false },
      { id: 3, answerText: "<check>", isTrue: false },
      { id: 4, answerText: '<input type="checkbox">', isTrue: true },
    ],
  },
];
