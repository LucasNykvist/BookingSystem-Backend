import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar', length: 50 })
  author: string;

  @CreateDateColumn()
  createdDate: Date;
}
