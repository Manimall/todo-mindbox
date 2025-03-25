import { Checkbox, Flex, IconButton, Text } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Task } from '../types';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const MotionFlex = motion(Flex);

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => (
  <MotionFlex
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0 }}
    layout
    align="center"
    p={3}
    bg="white"
    borderRadius="md"
    boxShadow="sm"
    _hover={{
      boxShadow: 'md',
    }}
    mb={2}
  >
   <Checkbox
    isChecked={task.completed}
    onChange={() => onToggle(task.id)}
    mr={3}
    colorScheme="green"
    iconColor="white"
    sx={{
      'span.chakra-checkbox__control': {
        width: '20px',
        height: '20px',
        border: '2px solid',
        borderColor: 'gray.400',
        bg: task.completed ? 'green.500' : 'white',
        _checked: {
          bg: 'green.500',
          borderColor: 'green.500',
          transform: 'scale(1.05)',
          '& svg': {
            strokeWidth: '3px',
            color: 'green',
          }
        },
      },
      'span.chakra-checkbox__label': {
        fontSize: 'lg',
      },
    }}
  />

    <Text
      flex={1}
      fontSize="lg"
      as={task.completed ? 's' : 'span'}
      color={task.completed ? 'gray.500' : 'gray.800'}
    >
      {task.text}
    </Text>
    <IconButton
      aria-label="Удалить задачу"
      icon={<DeleteIcon />}
      onClick={() => onDelete(task.id)}
      size="sm"
      variant="ghost"
      colorScheme="red"
      _hover={{ color: 'red.500' }}
    />
  </MotionFlex>
);
