import { Box, Heading, Divider, Flex } from '@chakra-ui/react';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks';
import './App.css';

function App() {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      margin="0 auto"
    >
      <Box
        maxW="600px"
        w="100%"
        mt={8}
        mb={12}
      >
        <Heading
          as="h1"
          size="xl"
          color="blue.600"
          textAlign="center"
          mb={38}
        >
          ToDo Mindobx List
        </Heading>

        <AddTask onAdd={addTask} />

        <Box
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          mb={4}
          data-testid="incomplete-tasks-section"
        >
          <TaskList
            tasks={incompleteTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            title="Невыполненные задачи"
            emptyText="Нет невыполненных задач"
          />
        </Box>

        <Divider borderColor="gray.300" my={4} />

        <Box
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          data-testid="completed-tasks-section"
        >
          <TaskList
            tasks={completedTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            title="Выполненные задачи"
            emptyText="Нет выполненных задач"
          />
        </Box>
      </Box>
    </Flex>
  );
}

export default App;
