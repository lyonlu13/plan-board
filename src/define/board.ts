import makeId from "utils/makeId";

export class Board {
  id: string = makeId();
  name: string = "New Board";
  objList: string[] = [];
  constructor(id: string, name: string, objList: string[]) {
    this.id = id;
    this.name = name;
    this.objList = objList;
  }
}
