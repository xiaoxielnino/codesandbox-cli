type Module = {
  'name': string;
  'path': string;
  'sha': string;
  'size': number;
  'url': string;
  'html_url': string;
  'git_url': string;
  'download_url'?: string;
  'type': 'file' | 'dir';
  '_links': {
    'self': string;
    'git': string;
    'html': string;
  };
};

type NormalizedDirectory = Module & {
  files: Array<Module>;
  directories: Array<NormalizedDirectory>;
};

type DownloadedFile = Module & {
  code: string;
};

type NormalizedDownloadedDirectory = {
  files: Array<DownloadedFile>;
} & NormalizedDirectory;

type SandboxFile = {
  title: string;
  code: string;
  directoryShortid: string;
};

type SandboxDirectory = {
  shortid: string;
  title: string;
};

type Dependencies = { [key: string]: string };
