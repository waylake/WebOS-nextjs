interface Window {
  showSaveFilePicker?: (
    options?: SaveFilePickerOptions,
  ) => Promise<FileSystemFileHandle>;
}

interface SaveFilePickerOptions {
  types?: FilePickerAcceptType[];
  excludeAcceptAllOption?: boolean;
  suggestedName?: string;
}

interface FilePickerAcceptType {
  description?: string;
  accept?: Record<string, string[]>;
}

interface FileSystemFileHandle {
  createWritable: () => Promise<FileSystemWritableFileStream>;
  getFile: () => Promise<File>;
}

interface FileSystemWritableFileStream {
  write: (data: File | string | BufferSource) => Promise<void>;
  close: () => Promise<void>;
}
