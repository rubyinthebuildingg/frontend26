[Suomenkielinen tehtävänanto (README.fi.md)](README.fi.md)

# Hello World (1 point)

### 1. Create a component
You will create a simple React component that displays a greeting message. This assignment will help you practice how to create components, use JSX, and pass props.

Inside your React project, create a new file named `Greeting.tsx`. In this file, define a new React component called `Greeting`.

This component should return the following HTML:
```
<h3>Hello World!</h3>
```
#### Use the Greeting Component in App.tsx
Open your App.tsx file and import the `Greeting` component.

Use the `Greeting` component inside the `return` statement of the `App` component so that Hello World! message is displayed on the webpage.

### 2. Use props

Pass Props to the `Greeting` Component and update the `Greeting` component to accept a prop called `name` (string).

Instead of displaying "Hello World!", use the prop to display: "Hello {name}!"

For example, if you pass Alex, the componen display Hello Alex!.


> [!IMPORTANT]
> All Github classroom assignments in this course includes a GitHub workflow that automatically checks your code using a linter. To receive full points, the workflow must pass without errors.
> Before submitting your assignment, you can run the linter locally on your computer using the following command:
> ```
> npm run lint
> ```
