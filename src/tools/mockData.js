const courses = [
  {
    id: 1,
    title: 'Securing React Apps with Auth0',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-auth0-authentication-security',
    category: 'JavaScript',
  },
  {
    id: 2,
    title: 'React: The Big Picture',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-big-picture',
    category: 'JavaScript',
  },
  {
    id: 3,
    title: 'Creating Reusable React Components',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-creating-reusable-components',
    category: 'JavaScript',
  },
  {
    id: 4,
    title: 'Building a JavaScript Development Environment',
    authorId: 1,
    url: 'http://pluralsight.com/course/javascript-development-environment',
    category: 'JavaScript',
  },
  {
    id: 5,
    title: 'Building Applications with React and Redux',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-redux-react-router-es6',
    category: 'JavaScript',
  },
  {
    id: 6,
    title: 'Building Applications in React and Flux',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-flux-building-applications',
    category: 'JavaScript',
  },
  {
    id: 7,
    title: 'Clean Code: Writing Code for Humans',
    authorId: 1,
    url: 'http://pluralsight.com/course/',
    category: 'Software Practices',
  },
  {
    id: 8,
    title: 'Architecting Applications for the Real World',
    authorId: 1,
    url: 'http://pluralsight.com/course/writing-clean-code-humans',
    category: 'Software Architecture',
  },
  {
    id: 9,
    title: 'Becoming an Outlier: Reprogramming the Developer Mind',
    authorId: 1,
    url: 'http://pluralsight.com/course/career-reboot-for-developer-mind',
    category: 'Career',
  },
  {
    id: 10,
    title: 'Web Component Fundamentals',
    authorId: 1,
    url: 'http://pluralsight.com/course/web-components-shadow-dom',
    category: 'HTML5',
  },
];

const authors = [
  { id: 1, externalId: 1, name: 'Cory House' },
  { id: 2, externalId: 2, name: 'Scott Allen' },
  { id: 3, externalId: 3, name: 'Dan Wahlin' },
];

const newCourse = {
  title: '',
  url: '',
  category: '',
  authorId: null,
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors,
};
