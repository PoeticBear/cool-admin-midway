import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * 球员
 */
@Entity('soccer_player')
export class SoccerPlayerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 255, unique: true, comment: '球员全名' })
  name: string;

  @Column({ type: 'int', comment: '所属球队ID', default: 0 })
  soccer_team_id: number;

  @Column({ type: 'date', comment: '出生日期', default: '1990-01-01' })
  birthDate: Date;

  @Column({ type: 'varchar', length: 100, comment: '国籍' })
  nationality: string;

  @Column({ type: 'varchar', length: 50, comment: '场上位置' })
  position: string;

  @Column({ type: 'int', comment: '身高（单位：厘米）' })
  height: number;

  @Column({ type: 'int', comment: '体重（单位：千克）' })
  weight: number;

  @Column({ type: 'decimal', comment: '市场价值（单位：欧元）' })
  marketValue: number;
}
