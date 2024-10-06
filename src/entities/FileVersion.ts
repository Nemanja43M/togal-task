import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Document } from './Document';

@Entity()
export class FileVersion {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    filePath: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;

    @ManyToOne(() => Document, (document) => document.fileVersions)
    document!: Document;

    constructor(filePath: string, document: Document) {
        this.filePath = filePath;
        this.document = document;
    }
}
