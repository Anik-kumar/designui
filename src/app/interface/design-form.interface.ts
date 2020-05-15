export interface DesignFormInterface {
  _id?: string;
  title: string;
  type: string;
  tags: string[];
  description?: string;
  file: File,
  publicUrl?: string;
}