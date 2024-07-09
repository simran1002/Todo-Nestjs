import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(todo: Todo): Promise<Todo> {
    return this.todoRepository.save(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoRepository.findOne({ where: { id } });
  }

  async update(id: number, todo: Partial<Todo>): Promise<void> {
    await this.todoRepository.update(id, todo);
  }

  async remove(id: number): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
