import { renderHook, act } from '@testing-library/react';
import { useTasks } from './useTasks';

describe('useTasks', () => {
  it('должен начинаться с пустого списка задач', () => {
    const { result } = renderHook(() => useTasks());
    expect(result.current.tasks).toEqual([]);
  });

  describe('Добавление задач', () => {
    it('добавляет новую задачу с корректными данными', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('New Task');
      });

      expect(result.current.tasks.length).toBe(1);
      expect(result.current.tasks[0].text).toBe('New Task');
      expect(result.current.tasks[0].completed).toBe(false);
      expect(result.current.tasks[0].id).toMatch(/^task-\d+$/);
    });

    it('не добавляет пустую задачу', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('   ');
      });

      expect(result.current.tasks).toEqual([]);
    });
  });

  it('генерирует уникальные ID для задач', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });

    act(() => {
      result.current.addTask('Task 2');
    });

    expect(result.current.tasks[0].id).not.toBe(result.current.tasks[1].id);
  });

  it('не мутирует исходный массив задач при добавлении задач', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });

    const initialTasks = result.current.tasks;

    act(() => {
      result.current.toggleTask(result.current.tasks[0].id);
    });

    expect(result.current.tasks).not.toBe(initialTasks);
    expect(initialTasks[0].completed).toBe(false);
  });

  it('корректно увеличивает idCounter при добавлении задач', () => {
    const { result } = renderHook(() => useTasks());

    act(() => {
      result.current.addTask('Task 1');
    });
    expect(result.current.tasks[0].id).toBe('task-1');

    act(() => {
      result.current.addTask('Task 2');
    });
    expect(result.current.tasks[1].id).toBe('task-2');
  });

  describe('Изменение статуса', () => {
    it('переключает статус задачи', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('Task to toggle');
      });

      const taskId = result.current.tasks[0].id;
      const initialStatus = result.current.tasks[0].completed;

      act(() => {
        result.current.toggleTask(taskId);
      });

      expect(result.current.tasks[0].completed).toBe(!initialStatus);
    });

    it('не изменяет задачи при переключении несуществующего ID', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('Task 1');
      });

      const initialTasks = [...result.current.tasks];

      act(() => {
        result.current.toggleTask('non-existent-id');
      });

      expect(result.current.tasks).toEqual(initialTasks);
    });
  });

  describe('Удаление задач', () => {
    it('удаляет задачу по ID', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('Task 1');
      });

      act(() => {
        result.current.addTask('Task 2');
      });

      const taskIdToDelete = result.current.tasks[1].id;

      act(() => {
        result.current.deleteTask(taskIdToDelete);
      });

      expect(result.current.tasks.length).toBe(1);
    });

    it('не изменяет список при удалении несуществующей задачи', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('Task 1');
      });

      const initialTasks = [...result.current.tasks];

      act(() => {
        result.current.deleteTask('non-existent-id');
      });

      expect(result.current.tasks).toEqual(initialTasks);
    });

    it('сохраняет порядок задач при удалении', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('Task 1');
      });

      act(() => {
        result.current.addTask('Task 2');
      });

      act(() => {
        result.current.addTask('Task 3');
      });


      const initialOrder = result.current.tasks.map(t => t.text);

      act(() => {
        result.current.deleteTask(result.current.tasks[1].id);
      });

      const remainingOrder = result.current.tasks.map(t => t.text);
      expect(remainingOrder).toEqual([initialOrder[0], initialOrder[2]]);
    });
  });

  describe('Комплексные сценарии', () => {
    it('добавление → изменение → удаление', () => {
      const { result } = renderHook(() => useTasks());

      act(() => {
        result.current.addTask('Task 1');
      });

      act(() => {
        result.current.addTask('Task 2');
      });

      const task1Id = result.current.tasks[0].id;
      const task2Id = result.current.tasks[1].id;

      act(() => {
        result.current.toggleTask(task1Id);
      });

      act(() => {
        result.current.deleteTask(task2Id);
      });

      expect(result.current.tasks.length).toBe(1);
      expect(result.current.tasks[0].id).toBe(task1Id);
      expect(result.current.tasks[0].completed).toBe(true);
    });

    it('корректно работает при большом количестве задач', async () => {
      const { result } = renderHook(() => useTasks());
      const count = 100;

      for (let i = 0; i < count; i++) {
        await act(async () => {
          result.current.addTask(`Task ${i}`);
        });
      }

      expect(result.current.tasks.length).toBe(count);
      expect(result.current.tasks[count-1].id).toBe(`task-${count}`);
    });
  });
});
