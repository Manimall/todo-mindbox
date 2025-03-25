import { Input, Button, FormControl, Flex, Box } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useForm } from 'react-hook-form';

interface AddTaskProps {
  onAdd: (text: string) => void;
}

interface TaskFormData {
  taskText: string;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormData>();

  const onSubmit = (data: TaskFormData) => {
    onAdd(data.taskText);
    reset();
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      bg="white"
      p={4}
      borderRadius="lg"
      boxShadow="md"
      mb={6}
    >
      <FormControl isInvalid={!!errors.taskText}>
        <Flex gap={3}>
          <Input
            flex="1 0 auto"
            placeholder="Добавить новую задачу..."
            size="lg"
            focusBorderColor="blue.500"
            {...register('taskText', {
              required: 'Поле обязательно для заполнения',
              minLength: { value: 3, message: 'Минимум 3 символа' }
            })}
          />
          <Button
            type="submit"
            colorScheme="blue"
            leftIcon={<AddIcon />}
            size="lg"
            px={6}
            flexShrink={0}
          >
            Добавить
          </Button>
        </Flex>
        {errors.taskText && (
          <Box color="red.500" mt={2} fontSize="sm">
            {errors.taskText.message}
          </Box>
        )}
      </FormControl>
    </Box>
  );
};
