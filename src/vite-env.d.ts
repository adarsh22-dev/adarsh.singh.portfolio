/// <reference types="vite/client" />

declare module "gsap/SplitText" {
  export class SplitText {
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    constructor(target: any, vars?: object);
    revert(): void;
  }
}

declare module "gsap/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars: object): ScrollSmoother;
    static get(): ScrollSmoother | undefined;
    static refresh(safe?: boolean): void;
    scrollTop(y?: number): number;
    scrollTo(target: any, smooth?: boolean, position?: string): void;
    paused(value?: boolean): boolean | this;
    kill(): void;
  }
}
