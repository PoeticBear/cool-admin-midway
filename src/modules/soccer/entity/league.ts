import { BaseEntity } from '@cool-midway/core';
import { Column, Index, Entity } from 'typeorm';

/**
 * 赛季
 */
@Entity('soccer_league')
export class SoccerLeagueEntity extends BaseEntity {
  @Column({ comment: '联赛名称', length: 100 })
  league: string;

  @Index()
  @Column({ comment: '国家或地区', length: 100 })
  country: string;

  @Column({ comment: '联赛级别', length: 20 })
  tier: string;

  @Column({ comment: '联赛中文名称', length: 100 })
  league_cn: string;
}
