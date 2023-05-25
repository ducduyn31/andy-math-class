import {
  createIncludeFilterHandler,
  createSelectFilterHandler,
  createTextFilterHandler,
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";

export class FilterBuilder<T> {
  private strategies: FilterStrategy<T>[];
  constructor() {
    this.strategies = [];
  }

  public addFilter(...strategies: FilterStrategy<T>[]) {
    this.strategies.push(...strategies);
  }

  public apply(elements: T[]): T[] {
    const handlers = this.strategies.map((strategy) => {
      if (strategy.type === FilterStrategyCategory.TEXT)
        return createTextFilterHandler(strategy);
      else if (strategy.type === FilterStrategyCategory.INCLUDE)
        return createIncludeFilterHandler(strategy);
      else if (strategy.type === FilterStrategyCategory.SELECT)
        return createSelectFilterHandler(strategy);
      return () => true;
    });

    let filteredElements = elements;
    handlers.forEach((handler) => {
      filteredElements = filteredElements.filter(handler);
    });
    return filteredElements;
  }
}
