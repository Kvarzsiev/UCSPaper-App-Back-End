import { Person } from 'entities/Person/Person';
import { Result } from 'entities/Result/Result';
import { PersonProject } from 'entities/PersonProject/PersonProject';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Collaborator } from 'entities/types';
import { deletePersonProject, fetchPersonProject, savePersonProject } from 'services/personProject';
import { fetchRawResult } from 'services/result';
import { CustomError } from 'utils/customError';
import { saveProject } from 'services/project';

@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  sponsor: string;

  @OneToMany(() => Result, (result) => result.project)
  results: Result[];

  @OneToMany(() => PersonProject, (personProject) => personProject.project)
  personProjects: PersonProject[];

  @Column({ default: null })
  startDate: Date;

  @Column({ default: null })
  finishDate: Date;

  @Column({ default: false })
  isFinished: Boolean;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  hasResult(resultId: number): Boolean {
    return this.results.some((result) => result.id === resultId);
  }

  personAlreadyMember(personId: number): Boolean {
    return this.personProjects.some((personProject) => personProject.id === personId);
  }

  async addPersonsToProject(persons: { id: number; role: string }[]): Promise<void> {
    for (const person of persons) {
      if (!this.personAlreadyMember(person.id)) {
        await this.addPersonToProject(person.id, person.role);
      }
    }

    await saveProject(this);
  }

  async addPersonToProject(personId: number, personRole: string): Promise<void> {
    try {
      const newPersonProject = new PersonProject();
      newPersonProject.project_id = this.id;
      newPersonProject.person_id = personId;

      if (personRole == Collaborator.MEMBER || personRole == Collaborator.COORDINATOR) {
        newPersonProject.role = personRole;
      } else {
        newPersonProject.role = Collaborator.MEMBER;
      }

      this.personProjects.push(await savePersonProject(newPersonProject));
    } catch (err) {
      throw new Error(`Provided result id could not be found`);
    }
  }

  async addResultToProject(resultId: number): Promise<void> {
    try {
      const newResult = await fetchRawResult(resultId);
      this.results.push(newResult);
      await saveProject(this);
    } catch (err) {
      throw new Error(`Provided result id could not be found`);
    }
  }

  async removePersonToProject(personId: number): Promise<void> {
    try {
      const personProject = await fetchPersonProject(personId, this.id);
      await deletePersonProject(personProject);
      this.personProjects = this.personProjects.filter((pp) => personProject.id != pp.id);
      await saveProject(this);
    } catch (err) {
      throw new Error(`Provided person not related to project`);
    }
  }
}
