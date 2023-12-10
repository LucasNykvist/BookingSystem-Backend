import { Repository } from "typeorm";
import { Note } from "../entities/note.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class NoteRepository {
    constructor(@InjectRepository(Note) private noteRepository: Repository<Note>){}

      getAll(): Promise<Note[]>{
        return this.noteRepository.find()
     }
}
