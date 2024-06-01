import { Person } from '../person/Person';
import { Project } from '../project/Project';
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

@Entity('result')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
