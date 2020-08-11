const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const esbuild = require("esbuild");

async function build() {
  const time = Date.now();
  await esbuild.build({
    define: {
      "process.env.NODE_ENV": '"development"',
    },
    bundle: true,
    loader: {
      ".svg": "file",
    },
    outdir: "build",
    entryPoints: ["src/index.tsx"],
    platform: "browser",
  });
  console.log(`${Date.now() - time}ms`);
}

function serve() {
  build();
  browserSync.init({
    server: {
      baseDir: "build",
    },
    watchOptions: {
      cwd: "build",
    },
    files: "*",
    watch: false,
    single: true,
    ghostMode: false,
    online: false,
    minify: false,
    localOnly: true,
    ui: false,
  });
  gulp.watch("build/*").on("change", browserSync.reload);
  gulp.watch("src/**").on("change", build);
}

exports.default = serve;
