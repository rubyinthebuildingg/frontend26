import type { TodoTableProps, Todo } from "./types"

export default function TodoTable(props: TodoTableProps) {
  return (
    <div>
      <table id="todotable">
        <thead>
          <tr>
            <th>Description</th>
            <th>Date</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {props.todos.map((todo: Todo, index: number) => (
            <tr key={index}>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
              <td>{todo.priority}</td>
            </tr>
          ))}
        </tbody>  
      </table>    
    </div>
  )
}