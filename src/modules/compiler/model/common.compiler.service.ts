import {Proxy} from "../../../../PureMVCMulticore/core/pureMVC/Proxy";
import {ICompiler} from "../compiler.interfaces";

export class CommonCompilerService extends Proxy implements ICompiler {
    /**
     * main entry point for compilation stuff
     */
    compile (...args: any[]): any {

    }

    protected isSet (variable: any, action: Function): void {
        if (variable) {
            action()
        }
    }
}
