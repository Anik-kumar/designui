export interface ICommentForm {
  _id?: string;
  sender_id: string;
  receiver_id: string;
  design_id: string;
  comment: string;
}