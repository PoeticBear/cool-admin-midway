import { BaseEntity } from '@cool-midway/core';
import { Column, Index, Entity } from 'typeorm';

/**
 * 赛季
 */
@Entity('soccer_season')
export class SoccerSeasonEntity extends BaseEntity {
  @Column({ comment: '联赛名称', length: 100 })
  league: string;

  @Index()
  @Column({ comment: '赛季名称', length: 100 })
  season: string;

  @Column({ comment: '赛季年份', length: 20 })
  season_id: string;

  @Column({ comment: '联赛赛季主页', length: 100 })
  url: string;
}
