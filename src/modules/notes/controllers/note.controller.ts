import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
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
    console.log(note);

    await this.noteService.createNote(note);

    res.status(HttpStatus.CREATED).send('A note has been created.');
  }

  @Get()
  public async getAll(@Res() res: Response) {
    res.status(HttpStatus.OK).send('Hello');
  }
}
