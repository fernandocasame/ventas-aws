declare module "dom-to-image-more" {
  interface DomToImageOptions {
    width?: number;
    height?: number;
    style?: Partial<CSSStyleDeclaration>;
    filter?: (node: HTMLElement) => boolean;
    bgcolor?: string;
    quality?: number;
    cacheBust?: boolean;
  }

  const domtoimage: {
    toPng(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toJpeg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
    toBlob(node: HTMLElement, options?: DomToImageOptions): Promise<Blob>;
    toSvg(node: HTMLElement, options?: DomToImageOptions): Promise<string>;
  };

  export default domtoimage;
}
