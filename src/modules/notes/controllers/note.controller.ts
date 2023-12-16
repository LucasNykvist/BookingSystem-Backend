import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { NoteService } from '../services/note.service';
import { CreateNoteDTOS } from '../DTOs/create-note.dto';
import { Response, Request } from 'express';

@Controller('/api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post('/create')
  public async createNote(@Body() note: CreateNoteDTOS, @Res() res: Response) {
    await this.noteService.createNote(note);
    res.status(HttpStatus.CREATED).send('A note has been created.');
  }

  @Get()
  public async getAll(@Res() res: Response) {
    const notes = await this.noteService.getAllNotes();
    res.status(HttpStatus.OK).send(notes);
  }

  @Get("/:id")
  public async getById(@Res() res: Response, @Param("id") id : string) {
    const noteById = await this.noteService.getNoteById(id);
    res.send(noteById).status(HttpStatus.OK)
  }
}
