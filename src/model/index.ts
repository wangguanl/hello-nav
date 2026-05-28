const PATH_REG = /\.\/modules\/([a-zA-Z_]+?)\.ts$/;

function getModules(context: Record<string, AppItem[]>): CateItem[] {
  const titleSort: Array<string> = [];
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
    const title = path.replace(PATH_REG, (_, $1) => $1.replace('_', '/'));
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

const modules = import.meta.glob('./modules/*.ts', {
  eager: true,
  import: 'default',
});

const context: Record<string, AppItem[]> = modules as Record<string, AppItem[]>;

const libraryTree: CateItem[] = getModules(context);

if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}

export default libraryTree;
