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
  
  public create(note: CreateNoteDTOS): Promise<any> {
    return this.noteRepository.save(note);
  }

  public getAll(): Promise<Note[]> {
    const notes = this.noteRepository.find();
    console.log("repo:", notes);
    return notes
  }

}
