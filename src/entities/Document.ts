import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import { Folder } from './Folder';
import { FileVersion } from './FileVersion';

@Entity()
export class Document {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @ManyToOne(() => Folder, (folder) => folder.documents)
    folder!: Folder;

    @OneToMany(() => FileVersion, (fileVersion) => fileVersion.document)
    fileVersions!: FileVersion[];

    constructor(
        title: string,
        description: string,
        folder: Folder,
        fileVersions?: FileVersion[]
    ) {
        this.title = title;
        this.description = description;
        this.folder = folder;
        if (fileVersions) {
            this.fileVersions = fileVersions;
        }
    }
}
