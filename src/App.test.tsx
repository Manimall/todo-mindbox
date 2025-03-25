import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('корректно рендерит заголовок', () => {
    render(<App />);
    expect(screen.getByText('ToDo Mindobx List')).toBeInTheDocument();
  });

  it('отображает секции для выполненных и невыполненных задач', () => {
    render(<App />);

    // Проверяем наличие заголовков через data-testid
    expect(screen.getByTestId('incomplete-tasks-section')).toBeInTheDocument();
    expect(screen.getByTestId('completed-tasks-section')).toBeInTheDocument();

    // Или ищем по ролям
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(2);
  });
});
