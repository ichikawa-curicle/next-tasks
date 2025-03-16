import Todo from '../components/Todo';

export default function Dashboard() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
      <Todo />
    </div>
  )
}
