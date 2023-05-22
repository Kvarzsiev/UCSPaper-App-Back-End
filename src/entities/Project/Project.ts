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

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  hasResult(resultId: number): Boolean {
    return this.results.some((result) => result.id === resultId);
  }
}
