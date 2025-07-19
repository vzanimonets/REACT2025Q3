export const CSS_CLASSES = {
  TABLE_CELL: 'truncate pl-4 text-left',
  TABLE_HEADER_CELL: 'whitespace-nowrap truncate pl-4 text-left',
  RESULTS_CONTAINER:
    'w-full h-80 overflow-y-auto flex items-start justify-center',
  ERROR_CONTAINER: 'w-full h-80 flex items-center justify-center',
} as const;

export const STORAGE_KEYS = {
  SEARCH_TERM: 'searchTerm',
  HIGHLIGHT: 'highlight',
} as const;

export const ERROR_MESSAGES = {
  UNKNOWN_ERROR: 'Unknown error',
  ROOT_NOT_FOUND: 'Root element not found.',
  TEST_ERROR: 'Test error from ErrorButton',
} as const;
