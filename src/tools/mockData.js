const courses = [
  {
    title: 'Securing React Apps with Auth0',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-auth0-authentication-security',
    category: 'JavaScript',
  },
  {
    title: 'React: The Big Picture',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-big-picture',
    category: 'JavaScript',
  },
  {
    title: 'Creating Reusable React Components',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-creating-reusable-components',
    category: 'JavaScript',
  },
  {
    title: 'Building a JavaScript Development Environment',
    authorId: 1,
    url: 'http://pluralsight.com/course/javascript-development-environment',
    category: 'JavaScript',
  },
  {
    title: 'Building Applications with React and Redux',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-redux-react-router-es6',
    category: 'JavaScript',
  },
  {
    title: 'Building Applications in React and Flux',
    authorId: 1,
    url: 'http://pluralsight.com/course/react-flux-building-applications',
    category: 'JavaScript',
  },
  {
    title: 'Clean Code: Writing Code for Humans',
    authorId: 1,
    url: 'http://pluralsight.com/course/',
    category: 'Software Practices',
  },
  {
    title: 'Architecting Applications for the Real World',
    authorId: 1,
    url: 'http://pluralsight.com/course/writing-clean-code-humans',
    category: 'Software Architecture',
  },
  {
    title: 'Becoming an Outlier: Reprogramming the Developer Mind',
    authorId: 1,
    url: 'http://pluralsight.com/course/career-reboot-for-developer-mind',
    category: 'Career',
  },
  {
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
