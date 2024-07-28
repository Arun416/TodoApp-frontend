import { Guid } from "guid-typescript";

export class Todo {
    
    constructor(
        public title: string,
        public isComplete: boolean
    ){}
}