import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "../entities/note.entity";

export class NoteRepository {
    constructor(@InjectRepository(Note)){}
}
