import { BaseEntity } from '@cool-midway/core';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

/**
 * 球队
 */
@Entity('soccer_team')
export class SoccerTeamEntity extends BaseEntity {
  @Column({ type: 'varchar', comment: '联赛ID' })
  leagueId: string;

  @Column({ type: 'varchar', length: 100, comment: '球队名称' })
  name: string;

  @Column({ type: 'varchar', length: 100, comment: '球队中文名称' })
  nameCn: string;

  @Column({ type: 'varchar', length: 10, comment: '球队缩写' })
  abbreviation: string;

  @Column({ type: 'varchar', comment: '成立年份' })
  foundedYear: string;

  @Column({ type: 'varchar', length: 100, comment: '主场球场' })
  homeStadium: string;
}
