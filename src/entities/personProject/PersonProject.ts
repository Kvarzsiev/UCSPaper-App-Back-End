import { Person } from '../person/Person';
import { Project } from '../project/Project';
import { Collaborator } from './types';

import { Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, JoinColumn, ManyToOne } from 'typeorm';

@Entity('person_project')
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
    default: 'member' as Collaborator,
  })
  role: Collaborator;
}
