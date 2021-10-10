import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsNotEmpty, IsNumber} from 'class-validator';
import {BaseEntity} from './base-entity';
import {VIDEO_SOURCE} from '@internal/shared/model/video.model';

@Entity('video')
export class VideoEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	@IsNumber() @IsNotEmpty()
	public id!: number;

	@Column()
	public url!: string;

	@Column()
	public author!: string;

	@Column()
	public source!: VIDEO_SOURCE
}
