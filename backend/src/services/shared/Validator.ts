import { ConceptEntry } from "../model/ConceptModel" 

export class MissingFieldError extends Error {
    constructor(missingField: string) {
        super(`Value for ${missingField} expected!`)
    }
}

export function validateAsConceptEntry(arg: ConceptEntry) {
    if (arg.displayName === undefined || arg.displayName.trim() === '') {
        throw new MissingFieldError('displayName');
    }
    if ((arg as ConceptEntry).id == undefined) {
        throw new MissingFieldError('id')
    }
}