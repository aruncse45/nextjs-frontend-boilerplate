import { useEffect, useState } from 'react';

type TodoItem = {
  id: number;
  title: string;
  isDone?: boolean;
};

const API_URL = 'http://localhost:3001/todos';

export default function HomePage() {
  const [todoList, setTodoList] = useState<any[]>([]);
  const [newTodoText, setNewTodoText] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState(
    'Loading todos, please wait...',
  );
  const [errorState, setErrorState] = useState<any>(null);

  useEffect(() => {
    let isMounted = true;

    function fetchTodos() {
      setLoadingMessage('Fetching from json-server...');
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
          if (!isMounted) return;
          const sorted = [...data].sort((a: any, b: any) =>
            a.id > b.id ? 1 : -1,
          );
          setTodoList(sorted);
          setLoadingMessage('');
        })
        .catch((err) => {
          console.error('failed to fetch todos', err);
          setErrorState(err?.message || 'Unknown error');
          setLoadingMessage('');
        });
    }

    fetchTodos();

    return () => {
      isMounted = false;
    };
  }, []);

  const reloadTodos = () => {
    setLoadingMessage('Refreshing...');
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => {
        setTodoList(d);
        setLoadingMessage('');
      })
      .catch((err) => {
        setErrorState(err?.message || 'Unknown error');
        setLoadingMessage('');
      });
  };

  function handleAddTodo() {
    if (!newTodoText.trim()) {
      alert('Please write something first.');
      return;
    }

    const payload: TodoItem = {
      id: Date.now(),
      title: newTodoText,
      isDone: false,
    };

    setTodoList((prev) => [...prev, payload as any]);
    setNewTodoText('');

    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.log('failed to save todo, reloading', err);
      reloadTodos();
    });
  }

  const startEdit = (todo: TodoItem) => {
    setEditingId(todo.id);
    setEditingText(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const saveEdit = (todo: TodoItem) => {
    if (!editingText.trim()) {
      alert('Todo text cannot be empty');
      return;
    }

    const updated: TodoItem = { ...todo, title: editingText };

    setTodoList((items) =>
      items.map((item) => {
        if (item.id === todo.id) {
          return updated;
        }
        return item;
      }),
    );

    setEditingId(null);
    setEditingText('');

    fetch(`${API_URL}/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updated),
    }).catch((err) => {
      console.log('failed to update todo, reloading', err);
      reloadTodos();
    });
  };

  const toggleDone = (todo: TodoItem) => {
    const updated = { ...todo, isDone: !todo.isDone };
    setTodoList((items) => items.map((x) => (x.id === todo.id ? updated : x)));

    fetch(`${API_URL}/${todo.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isDone: updated.isDone }),
    }).catch((err) => {
      console.log('failed to toggle, reloading', err);
      reloadTodos();
    });
  };

  function handleDeleteTodo(todoId: number) {
    setTodoList((items) => items.filter((t) => t.id !== todoId));

    fetch(`${API_URL}/${todoId}`, {
      method: 'DELETE',
    }).catch((err) => {
      console.log('failed to delete, reloading', err);
      reloadTodos();
    });
  }

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background:
      'radial-gradient(circle at top left, rgba(59,130,246,0.1), transparent 60%), radial-gradient(circle at bottom right, rgba(34,197,94,0.12), transparent 55%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  };

  return (
    <div style={containerStyle}>
      <div className="w-full max-w-xl rounded-2xl bg-white/80 p-6 shadow-lg shadow-slate-300 backdrop-blur">
        <h1 className="mb-1 text-center text-3xl font-semibold tracking-tight text-slate-900">
          Json-Server Todo Playground
        </h1>
        <p className="mb-6 text-center text-xs text-slate-500">
          This page intentionally contains some non-standard React / TypeScript
          patterns for AI code review experiments.
        </p>

        <div className="mb-4 flex gap-2">
          <input
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="Write a new thing you definitely won't forget..."
            className="flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-blue-200 outline-none placeholder:text-slate-400 focus:bg-white focus:ring-2"
          />
          <button
            onClick={handleAddTodo}
            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
          >
            Add
          </button>
        </div>

        {loadingMessage && (
          <div className="mb-3 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-700">
            {loadingMessage}
          </div>
        )}

        {errorState && (
          <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
            Something went wrong: {String(errorState)}
          </div>
        )}

        <div className="mb-2 flex items-center justify-between text-xs text-slate-500">
          <span>Total items: {todoList.length}</span>
          <button
            onClick={reloadTodos}
            className="rounded border border-slate-200 bg-white px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-50"
          >
            Reload from server
          </button>
        </div>

        <div className="max-h-80 space-y-2 overflow-auto rounded-md border border-slate-100 bg-slate-50 p-2">
          {todoList.length === 0 && (
            <div className="py-6 text-center text-xs text-slate-400">
              No todos yet. Add something slightly unreasonable.
            </div>
          )}

          {todoList.map((todo) => {
            const isEditing = editingId === todo.id;

            return (
              <div
                key={todo.id}
                className="flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={!!todo.isDone}
                  onChange={() => toggleDone(todo)}
                  className="h-4 w-4 cursor-pointer rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />

                {isEditing ? (
                  <input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className="flex-1 rounded border border-slate-200 bg-slate-50 px-2 py-1 text-xs outline-none focus:bg-white focus:ring-2 focus:ring-blue-200"
                  />
                ) : (
                  <span
                    className={`flex-1 text-xs ${
                      todo.isDone
                        ? 'text-slate-400 line-through'
                        : 'text-slate-700'
                    }`}
                  >
                    {todo.title}
                  </span>
                )}

                {isEditing ? (
                  <>
                    <button
                      onClick={() => saveEdit(todo)}
                      className="rounded bg-emerald-500 px-2 py-1 text-[11px] font-semibold text-white hover:bg-emerald-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="rounded bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEdit(todo)}
                      className="rounded bg-amber-400 px-2 py-1 text-[11px] font-semibold text-amber-900 hover:bg-amber-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      className="rounded bg-red-500 px-2 py-1 text-[11px] font-semibold text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
