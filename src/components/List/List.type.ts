export type TypeList = {
  valueTask: IList[];
  setValueTask: (value: IList[]) => void;
};

export interface IList {
  id: string;
  title: string;
  completed: boolean;
  isEditing: boolean
}
