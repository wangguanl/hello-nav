function getModules(context: Record<string, AppItem[]>): CateItem[] {
  const titleSort = [
    'AI/Agent',
    'community',
    'Blog',
    'FRAMEWORK',
    'UI FRAMEWORK',
    'LIBRARY',
    'PLUGIN',
    'RUNTIME/SERVER',
    'JS SERVER FRAMEWORK',
    'BUILD',
    'HTML/CSS',
    'WEBSITE',
    'DESIGN website',
    'MINI PROGRAM',
    'STATIC SITE',
    'OTHER',
    'LOWCODE',
    'browser',
    'web3d',
    'utils',
  ];
  interface titleName {
    [propName: string]: string;
  }
  const titleRename: titleName = {
    community: '社区',
    blog: '博客',
    utils: '工具',
  };
  const arr: CateItem[] = [];
  Object.keys(context).forEach((path: string) => {
    const title = path.replace(/^\.\/modules\//, '').replace(/_/, '/').replace(/\.ts$/, '');
    arr[
      titleSort
        .map(i => i.toLocaleUpperCase())
        .indexOf(title.toLocaleUpperCase())
    ] = {
      title: titleRename[title] || title,
      children: context[path],
    };
  });
  return arr;
}

const modules = import.meta.glob('./modules/*.ts', { eager: true });

const context: Record<string, AppItem[]> = {};
for (const path in modules) {
  context[path] = (modules[path] as any).default;
}

let libraryTree: CateItem[] = getModules(context);

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

export default libraryTree;
