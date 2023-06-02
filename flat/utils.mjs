import { createRequire } from 'module'
import * as os from 'os'
import * as path from 'path'
import findUp from 'find-up'
import semver from 'semver'

export { PATTERN_ALL } from '@cyansalt/eslint-config/flat/pattern.mjs'

const require = createRequire(import.meta.url)

function searchConfigFile(searchFrom) {
  const configFile = findUp.sync([
    'eslint.config.js',
    // Non-standard
    'eslint.config.cjs',
    'eslint.config.mjs',
  ], { cwd: searchFrom })
  if (configFile) {
    return configFile
  }
  const homePath = os.homedir()
  if (searchFrom === homePath) {
    return configFile
  }
  const parentPath = path.dirname(searchFrom)
  if (parentPath === searchFrom) {
    return configFile
  }
  return searchConfigFile(parentPath)
}

export function getNearestPackageJson() {
  const nearestConfigFile = searchConfigFile(process.cwd())
  if (!nearestConfigFile) return undefined
  return findUp.sync('package.json', { cwd: nearestConfigFile })
}

let cachedDeps

function getAllDependencies() {
  if (cachedDeps) {
    return cachedDeps
  }
  const nearestPackageJson = getNearestPackageJson()
  if (!nearestPackageJson) {
    cachedDeps = []
    return cachedDeps
  }
  try {
    const pkg = require(nearestPackageJson)
    let deps = []
    if (pkg.dependencies) {
      deps = deps.concat(Object.keys(pkg.dependencies).map(name => ({ name, version: pkg.dependencies[name] })))
    }
    if (pkg.devDependencies) {
      deps = deps.concat(Object.keys(pkg.devDependencies).map(name => ({ name, version: pkg.devDependencies[name] })))
    }
    cachedDeps = deps
    return cachedDeps
  } catch (err) {
    cachedDeps = []
    return cachedDeps
  }
}

export function getInstalledPackageVersion(moduleId) {
  const dependencies = getAllDependencies()
  const dependency = dependencies.find(dep => dep.name === moduleId)
  if (!dependency) {
    return null
  }
  let packageJson
  try {
    packageJson = require(`${moduleId}/package.json`)
  } catch (err) {
    return semver.minVersion(dependency.version).version
  }
  return packageJson.version
}

export function hasInstalledPackage(moduleId, version) {
  const installedVersion = getInstalledPackageVersion(moduleId)
  if (!installedVersion) {
    return false
  }
  if (version) {
    return semver.satisfies(installedVersion, version)
  }
  return true
}
