import { Person } from 'entities/person/Person';
import { Project } from 'entities/project/Project';
import { Collaborator } from 'entities/types';

import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('PersonProject')
export class PersonProject {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  person_id: number;

  @PrimaryColumn()
  project_id: number;

  @ManyToOne(() => Project, (project) => project.personProjects, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'project_id',
  })
  project!: Project;

  @ManyToOne(() => Person, (person) => person.personProjects)
  @JoinColumn({
    name: 'person_id',
  })
  person!: Person;

  @Column({
    type: 'enum',
    enum: Collaborator,
    default: Collaborator.MEMBER,
  })
  role: Collaborator;
}
