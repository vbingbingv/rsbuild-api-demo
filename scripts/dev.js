#!/usr/bin/env node

import { createRsbuild, loadConfig, loadEnv } from '@rsbuild/core'
import { merge } from 'lodash-es'
import path from 'node:path'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.join(__dirname, "..");

async function main() {
  const rsbuild = await createRsbuild({
    async rsbuildConfig() {
      const { content } = await loadConfig({
        path: "./rsbuild.config.js"
      });
      const vars = await loadEnv();
      return merge({}, content, {
        source: {
          define: vars
        }
      });
    },
    cwd: clientDir
  });
  await rsbuild.startDevServer({
    getPortSilently: true,
    port: 7898
  });
}

main()