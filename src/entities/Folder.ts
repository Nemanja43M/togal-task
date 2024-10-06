import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Document } from './Document';

@Entity()
export class Folder {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @OneToMany(() => Document, (document) => document.folder)
    documents!: Document[];

    constructor(name: string, documents: Document[]) {
        this.name = name;
        this.documents = documents;
    }
}
