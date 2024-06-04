import { PersonProject } from '../personProject/PersonProject';
import { Result } from '../result/Result';
import { Collaborator } from '../personProject/types';
import { deletePersonProject, fetchPersonProject, savePersonProject } from '../../services/personProject';
import { saveProject } from '../../services/project';
import { deleteResult, fetchRawResult } from '../../services/result';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Area } from '../area/Area';

@Entity('project')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  sponsor: string;

  @OneToMany(() => Result, (result) => result.project, { onDelete: 'CASCADE' })
  results: Result[];

  @OneToMany(() => PersonProject, (personProject) => personProject.project, { onDelete: 'CASCADE' })
  personProjects: PersonProject[];

  @Column({ default: null })
  startDate: Date;

  @Column({ default: null })
  finishDate: Date;

  @Column({ default: false })
  isFinished: boolean;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Area, (area) => area.projects)
  areas: Area[];

  hasResult(resultId: string): boolean {
    return this.results.some((result) => result.id === resultId);
  }

  personAlreadyMember(personId: string): boolean {
    return this.personProjects.some((personProject) => personProject.personId === personId);
  }

  async editMembers(persons: { id: string; role: string }[]): Promise<void> {
    for (const person of persons) {
      if (!this.personAlreadyMember(person.id)) {
        console.log('Is already member');
        await this.addMember(person.id, person.role);
      } else {
        await this.editExistingMember(person.id, person.role);
      }
    }

    await saveProject(this);
  }

  async addMember(personId: string, personRole: string): Promise<void> {
    const newPersonProject = new PersonProject();
    newPersonProject.projectId = this.id;
    newPersonProject.personId = personId;

    if (isStringInEnum(personRole, Collaborator)) {
      newPersonProject.role = personRole as Collaborator;
    } else {
      newPersonProject.role = Collaborator.MEMBER;
    }

    this.personProjects.push(await savePersonProject(newPersonProject));
  }

  async addResultToProject(resultId: string): Promise<void> {
    const newResult = await fetchRawResult(resultId);
    if (!newResult) {
      throw new Error('Could not find result');
    } else {
      this.results.push(newResult);
      await saveProject(this);
    }
  }

  async removePersonToProject(personId: string): Promise<void> {
    try {
      const personProject = await fetchPersonProject(personId, this.id);
      await deletePersonProject(personProject);
      this.personProjects = this.personProjects.filter(
        (pp) => `${personProject.personId}${personProject.projectId}` != `${pp.personId}${pp.projectId}`,
      );
      await saveProject(this);
    } catch (err) {
      throw new Error(`Provided person not related to project`);
    }
  }

  async editExistingMember(personId: string, role: string) {
    const personProject = this.personProjects.find((p) => p.personId == personId);

    if (!isStringInEnum(role, Collaborator)) {
      throw new Error('Could not edit member');
    } else {
      personProject.role = role as Collaborator;
      await savePersonProject(personProject);
    }
  }

  async removeResultFromProject(resultId: string) {
    try {
      await deleteResult(resultId);
      this.results = this.results.filter((r) => r.id != resultId);
      await saveProject(this);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

function isStringInEnum(value: string, enumObj: any): boolean {
  return Object.values(enumObj).includes(value);
}
