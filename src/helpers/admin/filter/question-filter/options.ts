import { Chapter } from "@/models";
import {
  SelectOption,
  SelectOptions,
} from "@/components/admin/components/content-filter/shared/select-filter-field";

export const mapChaptersToOptions = (chapters: Chapter[]): SelectOption[] => {
  const chapterOptions = chapters.map((chapter) => ({
    value: chapter.id,
    label: chapter.name,
  }));
  return [SelectOptions.ANY_DEFAULT, SelectOptions.DISABLED, ...chapterOptions];
};
