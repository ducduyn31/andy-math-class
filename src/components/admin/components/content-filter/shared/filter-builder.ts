import {
  createIncludeFilterHandler,
  createSelectFilterHandler,
  createTextFilterHandler,
  FilterStrategy,
  FilterStrategyCategory,
} from "@/components/admin/components/content-filter/shared/strategies";
import { Mappers } from "@/helpers/mappers";

export class FilterBuilder<T> {
  private readonly strategies: FilterStrategy<T>[];

  constructor(serializedStrategies?: string | null) {
    if (serializedStrategies != null) {
      this.strategies = JSON.parse(serializedStrategies);
    } else {
      this.strategies = [];
    }
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

  public getMatchValueByMapper<T>(mapper: Mappers): T {
    const matchIndex = this.strategies.findIndex(
      (value) => value.params.mapper === mapper
    );
    return this.strategies[matchIndex]?.params?.match as T;
  }

  public serialize(): string {
    return JSON.stringify(this.strategies);
  }
}
