import { VStack, Heading, Text } from '@chakra-ui/react';
import { TaskItem } from './TaskItem';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  title: string;
  emptyText: string;
}

export const TaskList = ({ tasks, onToggle, onDelete, title, emptyText }: TaskListProps) => (
  <VStack align="stretch" spacing={3}>
    <Heading size="md" color="gray.700" pb={2}>
      {title} ({tasks.length})
    </Heading>

    {tasks.length > 0 ? (
      tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))
    ) : (
      <Text color="gray.500" textAlign="center" py={4}>
        {emptyText}
      </Text>
    )}
  </VStack>
);
