import { Callback } from './Callback';

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
import { EventEmitter } from 'events';

type KeyCode = string | number;

export default class Api extends EventEmitter {
  send(...args: any[]) {
    throw new Error("send is not implemented");
  }

  keyDown(keyCode: KeyCode, callback: Callback<string>) {
    this.send(`key down ${keyCode}`, callback);
    return this;
  }

  keyUp(keyCode: KeyCode, callback: Callback<string>) {
    this.send(`key up ${keyCode}`, callback);
    return this;
  }

  touchDown(x: number, y: number, callback: Callback<string>) {
    this.send(`touch down ${x} ${y}`, callback);
    return this;
  }

  touchUp(x: number, y: number, callback: Callback<string>) {
    this.send(`touch up ${x} ${y}`, callback);
    return this;
  }

  touchMove(x: number, y: number, callback: Callback<string>) {
    this.send(`touch move ${x} ${y}`, callback);
    return this;
  }

  trackball(dx: number, dy: number, callback: Callback<string>) {
    this.send(`trackball ${dx} ${dy}`, callback);
    return this;
  }

  flipOpen(callback: Callback<string>) {
    this.send("flip open", callback);
    return this;
  }

  flipClose(callback: Callback<string>) {
    this.send("flip close", callback);
    return this;
  }

  wake(callback: Callback<string>) {
    this.send("wake", callback);
    return this;
  }

  tap(x: number, y: number, callback: Callback<string>) {
    this.send(`tap ${x} ${y}`, callback);
    return this;
  }

  press(keyCode: KeyCode, callback: Callback<string>) {
    this.send(`press ${keyCode}`, callback);
    return this;
  }

  type(str: string, callback: Callback<string>) {
    // Escape double quotes.
    str = str.replace(/"/g, '\\"');
    if (str.indexOf(' ') === -1) {
      this.send(`type ${str}`, callback);
    } else {
      this.send(`type \"${str}\"`, callback);
    }
    return this;
  }

  list(callback: Callback<string>) {
    this.send("listvar", (err: Error, vars) => {
      if (err) {
        return callback(err);
      } else {
        return callback(null, vars.split(/\s+/g));
      }
    });
    return this;
  }

  get(name, callback: Callback<string>) {
    this.send(`getvar ${name}`, callback);
    return this;
  }

  quit(callback: Callback<string>) {
    this.send("quit", callback);
    return this;
  }

  done(callback: Callback<string>) {
    this.send("done", callback);
    return this;
  }

  sleep(ms, callback: Callback<string>) {
    this.send(`sleep ${ms}`, callback);
    return this;
  }

  getAmCurrentAction(callback: Callback<string>) {
    this.get('am.current.action', callback);
    return this;
  }

  getAmCurrentCategories(callback: Callback<string>) {
    this.get('am.current.categories', callback);
    return this;
  }

  getAmCurrentCompClass(callback: Callback<string>) {
    this.get('am.current.comp.class', callback);
    return this;
  }

  getAmCurrentCompPackage(callback: Callback<string>) {
    this.get('am.current.comp.package', callback);
    return this;
  }

  getAmCurrentData(callback: Callback<string>) {
    this.get('am.current.data', callback);
    return this;
  }

  getAmCurrentPackage(callback: Callback<string>) {
    this.get('am.current.package', callback);
    return this;
  }

  getBuildBoard(callback: Callback<string>) {
    this.get('build.board', callback);
    return this;
  }

  getBuildBrand(callback: Callback<string>) {
    this.get('build.brand', callback);
    return this;
  }

  getBuildCpuAbi(callback: Callback<string>) {
    this.get('build.cpu_abi', callback);
    return this;
  }

  getBuildDevice(callback: Callback<string>) {
    this.get('build.device', callback);
    return this;
  }

  getBuildDisplay(callback: Callback<string>) {
    this.get('build.display', callback);
    return this;
  }

  getBuildFingerprint(callback: Callback<string>) {
    this.get('build.fingerprint', callback);
    return this;
  }

  getBuildHost(callback: Callback<string>) {
    this.get('build.host', callback);
    return this;
  }

  getBuildId(callback: Callback<string>) {
    this.get('build.id', callback);
    return this;
  }

  getBuildManufacturer(callback: Callback<string>) {
    this.get('build.manufacturer', callback);
    return this;
  }

  getBuildModel(callback: Callback<string>) {
    this.get('build.model', callback);
    return this;
  }

  getBuildProduct(callback: Callback<string>) {
    this.get('build.product', callback);
    return this;
  }

  getBuildTags(callback: Callback<string>) {
    this.get('build.tags', callback);
    return this;
  }

  getBuildType(callback: Callback<string>) {
    this.get('build.type', callback);
    return this;
  }

  getBuildUser(callback: Callback<string>) {
    this.get('build.user', callback);
    return this;
  }

  getBuildVersionCodename(callback: Callback<string>) {
    this.get('build.version.codename', callback);
    return this;
  }

  getBuildVersionIncremental(callback: Callback<string>) {
    this.get('build.version.incremental', callback);
    return this;
  }

  getBuildVersionRelease(callback: Callback<string>) {
    this.get('build.version.release', callback);
    return this;
  }

  getBuildVersionSdk(callback: Callback<string>) {
    this.get('build.version.sdk', callback);
    return this;
  }

  getClockMillis(callback: Callback<string>) {
    this.get('clock.millis', callback);
    return this;
  }

  getClockRealtime(callback: Callback<string>) {
    this.get('clock.realtime', callback);
    return this;
  }

  getClockUptime(callback: Callback<string>) {
    this.get('clock.uptime', callback);
    return this;
  }

  getDisplayDensity(callback: Callback<string>) {
    this.get('display.density', callback);
    return this;
  }

  getDisplayHeight(callback: Callback<string>) {
    this.get('display.height', callback);
    return this;
  }

  getDisplayWidth(callback: Callback<string>) {
    this.get('display.width', callback);
    return this;
  }
}

