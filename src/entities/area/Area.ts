import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Project } from '../project/Project';

@Entity('area')
export class Area {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  cnpqCode: string;

  @Column({ unique: true })
  name: string;

  @Column()
  hierarchy: string;

  @ManyToMany(() => Project, (project) => project.areas)
  @JoinTable()
  projects: Project[];

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}
