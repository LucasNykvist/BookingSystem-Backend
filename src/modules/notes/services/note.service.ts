import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../repositories/note.repository';
import { CreateNoteDTOS } from '../DTOs/create-note.dto';

@Injectable()
export class NoteService {
  constructor(private readonly noteRepository: NoteRepository) {}

  public async createNote(note: CreateNoteDTOS): Promise<any> {
    this.noteRepository.create(note);
  }

  public async getAllNotes() {
    return await this.noteRepository.getAll();
  }

  public async getNoteById(id: string){    
    return await this.noteRepository.getById(id)
  }
}
