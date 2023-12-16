import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDTOS } from '../DTOs/create-note.dto';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  public getAll(): Promise<Note[]> {
    return this.noteRepository.find();
  }

  public create(note: CreateNoteDTOS) {
    return this.noteRepository.create(note);
  }
}
