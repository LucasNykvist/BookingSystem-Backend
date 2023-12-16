import { Repository } from 'typeorm';
import { Note } from '../entities/note.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateNoteDTOS } from '../DTOs/create-note.dto';
import { log } from 'console';

@Injectable()
export class NoteRepository {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}

  public create(note: CreateNoteDTOS): Promise<Note> {
    return this.noteRepository.save(note);
  }

  public async getAll(): Promise<Note[]> {
    return await this.noteRepository.find();
  }

  public async getById(id: string): Promise<any>{    
    try {
      const note = await this.noteRepository.findOneBy({id});
      if(!note){
        throw new NotFoundException(`Note with ID: ${id} was not found`)
      }
      return note
    } catch (error) {
      console.log(error);
    }

  }
}
