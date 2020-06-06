import {Schema} from './schema';
import {
  apply,
  chain,
  MergeStrategy,
  mergeWith,
  move,
  Rule,
  SchematicContext, template,
  Tree,
  url
} from '@angular-devkit/schematics';
import {join, Path} from '@angular-devkit/core';
import { getWorkspace } from "@schematics/angular/utility/config";
import {addPackageJsonDependency, NodeDependency, NodeDependencyType} from '@schematics/angular/utility/dependencies';
import {NodePackageInstallTask} from '@angular-devkit/schematics/tasks';

function deleteFile(host: Tree, path: string) {
  if (host.exists(path)) {
    host.delete(path);
  }
}

function overwriteFiles(path: Path) {
  return (host: Tree) => {
    ["app.component.ts","app.component.html"].forEach(filename => {
      deleteFile(host, join(path, filename));
    });
    return host;
  };
}

function addPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const dependencies: NodeDependency[] = [
      { type: NodeDependencyType.Default, version: '^1.9.0', name: '@auth0/auth0-spa-js' },
    ];

    dependencies.forEach(dependency => {
      addPackageJsonDependency(host, dependency);
      context.logger.log('info', `✅️ Added "${dependency.name}" into ${dependency.type}`);
    });

    return host;
  };
}

function installPackageJsonDependencies(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `🔍 Installing packages...`);

    return host;
  };
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function auth0AuthenticationSchematic(options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspace = getWorkspace(tree);
    if (!options.project) {
      options.project = Object.keys(workspace.projects)[0];
    }
    const project = workspace.projects[options.project];
    const sourcePath = join(project.root as Path, "src");
    const appPath = join(sourcePath as Path, "app");

    const rule = chain([
      addPackageJsonDependencies(),
      installPackageJsonDependencies(),
      overwriteFiles(appPath),
      mergeWith(apply(url("./files"), [template({...options}), move(appPath)]), MergeStrategy.Overwrite)
    ]);

    return rule(tree, _context);
  };
}
