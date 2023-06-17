import { Project } from 'entities/Project/Project';
import { Person } from 'entities/Person/Person';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';

@Entity('Result')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  description: string;

  @ManyToOne(() => Project, (project) => project.results, { onDelete: 'CASCADE' })
  project: Project;

  @ManyToMany(() => Person, (person) => person.results, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  persons: Person[];

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
