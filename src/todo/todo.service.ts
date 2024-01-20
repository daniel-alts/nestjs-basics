import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './entities/todo.entity';

enum TodoStatus {
  Pending = 'pending',
  Completed = 'completed',
}

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo.name) private readonly todoModel: Model<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto) {
    const newTodo = {
      description: createTodoDto.description,
      status: TodoStatus.Pending,
    };

    const todo = new this.todoModel(newTodo);
    todo.save();

    return {
      message: 'Todo created successfully',
      data: todo,
      statusCode: 201,
    };
  }

  async findAll() {
    const todos = await this.todoModel.find();

    return {
      message: 'Todos retrieved successfully',
      data: todos,
      statusCode: 200,
    };
  }

  async findOne(id: string) {
    const todo = await this.todoModel.findById(id);

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    return {
      message: 'Todo retrieved successfully',
      data: todo,
      statusCode: 200,
    };
  }

  async complete(id: string) {
    await this.todoModel.updateOne(
      { _id: id },
      { status: TodoStatus.Completed },
    );

    return {
      message: 'Todo updated successfully',
      statusCode: 200,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
