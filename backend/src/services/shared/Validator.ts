import { ConceptEntry } from "../model/ConceptModel" 

export class MissingFieldError extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} expected!`)
    }
}

export function validateAsConceptEntry(arg: any){
    if ((arg as ConceptEntry).displayName == undefined) {
        throw new MissingFieldError('name')
    }
    // if ((arg as ConceptEntry).description == undefined) {
    //     throw new MissingFieldError('description')
    // }
    // if ((arg as ConceptEntry).parentIds == undefined) {
    //     throw new MissingFieldError('parent')
    // }
    // if ((arg as ConceptEntry).childIds == undefined) {
    //     throw new MissingFieldError('child')
    // }
    // if ((arg as ConceptEntry).alternateNames == undefined) {
    //     throw new MissingFieldError('alternate names')
    // }
    if ((arg as ConceptEntry).id == undefined) {
        throw new MissingFieldError('id')
    }
}