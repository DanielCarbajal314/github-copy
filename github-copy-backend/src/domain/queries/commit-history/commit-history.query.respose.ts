export class CommitHistoryQueryResponse {
    constructor(
        public readonly id: string,
        public readonly message: string,
        public readonly author: string,
        public readonly avatarSrc: string,
        public readonly date: Date
    ) {}
}