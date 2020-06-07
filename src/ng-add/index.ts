import { chain, Rule, schematic, SchematicContext, Tree, } from '@angular-devkit/schematics';
import {Schema} from '../auth0-authentication-schematic/schema';

export default function (options: Schema): Rule {
  return (host: Tree, context: SchematicContext) => {
    return chain([
      schematic('auth0-authentication-schematic', options)
    ])(host, context);
  };
}
