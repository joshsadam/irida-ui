interface _Item {
  id: number;
  createdDate: string;
  modifiedDate: string;
}

export interface Project extends _Item {
  name: string;
  projectDescription: string;
  organism: string;
}
