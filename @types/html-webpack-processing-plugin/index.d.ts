declare module 'html-webpack-processing-plugin' {
  import type { Compiler, Plugin } from 'webpack';

  class HtmlWebpackProcessingPlugin extends Plugin {
    public constructor();
    public apply(compiler: Compiler): void;
  }

  export = HtmlWebpackProcessingPlugin;
}
