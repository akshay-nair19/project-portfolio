import TaskManager from '../components/task-manager';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-[#0a0e1a] py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Task Manager</h1>
          <p className="text-gray-400 text-lg">
            Organize your tasks and stay productive
          </p>
        </div>
        <TaskManager />
      </div>
    </div>
  );
}
