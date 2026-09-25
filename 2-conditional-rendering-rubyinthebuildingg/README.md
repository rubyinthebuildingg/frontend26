[Suomenkielinen tehtävänanto (README.fi.md)](README.fi.md)

# Conditional rendering (3 points)
Use props and state to conditionally render components based on given boolean flags.

### 1. Create ProfileCard component
Create a React component called `ProfileCard`.

The component will receive the following props:
```
name: string
age: number
showDetails: boolean
```
The component:
Always display the `name`.
Conditionally display the `age` value only if `showDetails` is true.

### 2. Display ProfileCard component
`App` component renders two `ProfileCard` components:
- One with `showDetails` set to `true`.
- One with `showDetails` set to `false`.

**Example output:**

![Conditional render](./src/assets/conditional_render.png)
