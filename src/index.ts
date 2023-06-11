#!/usr/bin/env node
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { main } from "./ClavaLauncher.js";

const moduleName = "clava";
const prettyName = "Clava";

const config = await yargs(hideBin(process.argv))
  .scriptName(moduleName)
  .command({
    command: "$0 [script-file]",
    describe: `Execute a ${prettyName} script`,
    builder: (yargs) => {
      return yargs
        .positional("script-file", {
          describe: `Path to ${prettyName} script file`,
          type: "string",
        })
        .option("c", {
          alias: "config",
          describe: "Path to JSON config file",
          type: "string",
          config: true,
        })
        .option("w", {
          alias: "watch",
          describe: "Watch the following directory for changes",
          type: "array",
          default: [],
          defaultDescription: "none",
        });
    },
    handler: (argv) => {
      try {
        console.log(`Executing ${prettyName} script...`);
        void main(argv);
      } catch (error) {
        console.error(error);
      }
    },
  })
  .command({
    command: "init",
    describe: `Initialize a new ${prettyName} project`,
    handler: () => {
      // TODO: Implement
      console.log(`Initializing new ${prettyName} project...`);
    },
  })
  .help()
  .showHelpOnFail(true)
  .strict()
  .pkgConf(moduleName)
  .parse();
