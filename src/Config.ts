export const GENRES = ['小説', 'ビジネス', '自己啓発', '科学', '歴史', 'その他'] as const;

export const SORT_OPTIONS = [
  { value: 'date-desc', label: '日付（新しい順）' },
  { value: 'date-asc', label: '日付（古い順）' },
  { value: 'title', label: 'タイトル' },
  { value: 'rating-desc', label: '評価（高い順）' },
  { value: 'rating-asc', label: '評価（低い順）' },
] as const;

export const LOCAL_STORAGE_KEY = 'readingLogBooks';

export const CHART_CONFIG = {
  type: 'bar' as const,
  backgroundColor: 'rgba(74, 109, 167, 0.7)',
  borderColor: 'rgba(74, 109, 167, 1)',
  borderWidth: 1,
};