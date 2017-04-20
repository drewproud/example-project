# ASAPP Example Project

Created using react [react hot boilerplate](https://github.com/gaearon/react-hot-boilerplate)

## Installation
### Intall the following
- nvm (or just use the correct version of node specified in `.nvmrc`)
- yarn (or npm)

```bash
nvm use
yarn
```
## Development
To start:    
```bash
npm start
```
To test:    
```
npm t -s
```

## Architectural Decisions    
My overarching goal during this project was to maximize simplicity, readability, and testability. Many of the architectural decisions I made were specific to the requirements of this particular project - if the goal was scalability or speed of development, I may have made different decisions. I'll talk a little bit about some of the more interesting decisions below.


#### State management
I decided against implementing a full redux state management system to to simplicity of the requirements. Instead, I chose to use component-level state where appropriate and managed the chat state through a contained higher order component. I then applied the HOC to the 'container' component which then wired the store to the rest of the app.

This approach had the benefits of being:    
1. Simple
2. Self-contained and easy to swap out
3. Very testable

The drawbacks would include it requiring some refactoring if we wanted to scale the app and add async server calls.

#### Styling    
I decided to use the [styled-components](https://github.com/styled-components/styled-components) library for styling mostly because I wanted to try it out. CSS managment is still an area of active development in the front-end dev community due to the many issues that exist with CSS.

I'm personally not a huge fan of BEM-style naming convention nor global styles as I don't think they fit well with the component-centric paradigm used with React. CSS modules has provent to be a relatively good solution, but still isn't perfect.

Overall, I'm happy with my choice here as it turned out to be a very pleasant experience to work with, though it's still unclear how well it would scale.

#### Folder structure
Simple is best here. I colocated my specs next to the componets they exercise since they are tightly coupled and should be maintained in tandem. Otherwise, I chose to split the HOCs into a separate `services/` folder to emphasize the separation of display and state management concerns.

## Possible current improvements
1. Add a styled-components theme to dry out the CSS
2. Add one or two happy path end-to-end tests for better coverage using Nightwatch or similar
3. Test on browsers other than chrome

## Possible future improvements
1. Diverge interfaces for customer service reps and users based on use case and needs
2. Implement server
3. Add standard UI library for faster UI iteration
