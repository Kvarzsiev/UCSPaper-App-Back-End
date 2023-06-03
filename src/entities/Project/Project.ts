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
import { savePersonProject } from 'services/personProject';

@Entity('Project')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
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

  async addPersonProject(personId: number, personRole: string): Promise<void> {
    const newPersonProject = new PersonProject();
    newPersonProject.project_id = this.id;
    newPersonProject.person_id = personId;

    if (personRole == Collaborator.MEMBER || personRole == Collaborator.COORDINATOR) {
      newPersonProject.role = personRole;
    } else {
      newPersonProject.role = Collaborator.MEMBER;
    }

    this.personProjects.push(await savePersonProject(newPersonProject));
  }
}
