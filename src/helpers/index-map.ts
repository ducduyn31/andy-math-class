import { isArrayTypeOfRecord } from "@/helpers/array";

export class IndexMap<T> extends Map<T, number> {
  private indexMap: Map<number, T>;
  constructor(array: T[], field?: string) {
    super();
    this.indexMap = new Map<number, T>();
    array.forEach((item, index) => {
      this.set(item, index);
    });

    if (field) {
      this.sortByField(field);
    }
  }

  sortByField(field: string) {
    const elements = Array.from(this.keys());
    if (!isArrayTypeOfRecord(elements)) return;
    elements.sort((a, b) => {
      return (a as any)[field] - (b as any)[field];
    });
    elements.forEach((element, index) => {
      this.set(element, index);
    });
  }

  override set(key: T, value: number): this {
    this.indexMap.set(value, key);
    return super.set(key, value);
  }

  override clear() {
    this.indexMap.clear();
    super.clear();
  }

  override delete(key: T): boolean {
    this.indexMap.delete(this.get(key) as number);
    return super.delete(key);
  }

  getByIndex(index: number): T | undefined {
    return this.indexMap.get(index);
  }
}
