import { Person } from '../person/Person';
import { Project } from '../project/Project';
import { Collaborator } from './types';

import { Entity, PrimaryColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('person_project')
export class PersonProject {
  @PrimaryColumn('uuid')
  personId: string;

  @PrimaryColumn('uuid')
  projectId: string;

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

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
