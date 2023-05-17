import { Person } from 'entities/Person/Person';
import { Project } from 'entities/Project/Project';

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

  @ManyToOne(() => Project, (project) => project.personProjects)
  @JoinColumn({
    name: "project_id"
  })
  project!: Project;

  @ManyToOne(() => Person, (person) => person.personProjects)
  @JoinColumn({
    name: "person_id"
  })
  person!: Person

  @Column()
  isCoordinator: Boolean;

}