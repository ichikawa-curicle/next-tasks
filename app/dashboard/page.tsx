export default function Dashboard() {
  return (
    <div>
      <h1 className="text-4xl my-6">Dashboard</h1>
      <h2 className="text-2xl my-6">My Tasks</h2>
      <ul className="list-disc px-6">
        <li>Task1</li>
        <li>Task2</li>
        <li>Task3</li>
      </ul>
      <h2 className="text-2xl my-6">My Lists</h2>
      <ul className="list-disc px-6">
        <li>List1</li>
        <li>List2</li>
        <li>List3</li>
      </ul>
    </div>
  )
}
