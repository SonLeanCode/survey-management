import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Survey } from '../../survey/entities/survey.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Response {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { default: [] })
  answers: any[];

  @ManyToOne(() => Survey, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'surveyId' })
  survey: Survey;

  @Column()
  surveyId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}
