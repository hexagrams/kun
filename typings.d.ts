declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare interface Window {
  SYSTEM_CONFIG: {
    productList: any;
    routerConfig: {
      menuLeftOption: any;
    };
    [propName: string]: any;
  };
  sysAjax: any;
  sysPush: any;
}
