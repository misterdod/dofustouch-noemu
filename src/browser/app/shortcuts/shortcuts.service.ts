/// <reference path="../../../../node_modules/@types/keymaster/index.d.ts" />
import { Injectable } from '@angular/core';

//interface Window { key: Keymaster; }

@Injectable()
export class ShortCutsService {

    public bind(shortcut: string, window: Window, action: () => void): void {
        (<any>window).key('ctrl+a', () => {
            console.log('test a');
        });
    }

    public subscribe(event: string): void {

    }

}
