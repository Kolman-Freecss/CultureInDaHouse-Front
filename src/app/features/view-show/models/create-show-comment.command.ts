export class ShowComment {
   comment: string;
   rating: number;
}

export class CreateShowCommentCommand {
   constructor(comment: ShowComment) {
      this.showComment = comment;
   }

   showComment: ShowComment;
}
