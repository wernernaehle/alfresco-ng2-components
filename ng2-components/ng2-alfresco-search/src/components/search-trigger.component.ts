/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    Optional,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { SearchComponent } from './search.component';

export const AUTOCOMPLETE_OPTION_HEIGHT = 48;

export const AUTOCOMPLETE_PANEL_HEIGHT = 256;

export const SEARCH_AUTOCOMPLETE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AdfAutocompleteTriggerDirective),
    multi: true
};

@Directive({
    selector: `input[adfSearchAutocomplete], textarea[adfSearchAutocomplete]`,
    host: {
        'role': 'combobox',
        'autocomplete': 'off',
        'aria-autocomplete': 'list',
        '[attr.aria-activedescendant]': 'activeOption?.id',
        '[attr.aria-expanded]': 'panelOpen.toString()',
        '[attr.aria-owns]': 'autocomplete?.id',
        '(blur)': 'onTouched()',
        '(input)': 'handleInput($event)',
        '(keydown)': 'handleKeydown($event)'
    },
    providers: [SEARCH_AUTOCOMPLETE_VALUE_ACCESSOR]
})
export class AdfAutocompleteTriggerDirective implements ControlValueAccessor, OnDestroy {

    @Input('adfSearchAutocomplete')
    searchPanel: SearchComponent;

    @Output()
    enterKeyPressed: EventEmitter<KeyboardEvent> = new EventEmitter();

    @Output()
    shortWordError: EventEmitter<string> = new EventEmitter();

    @Output()
    panelClosed: EventEmitter<any> = new EventEmitter();

    @Output()
    panelOpened: EventEmitter<any> = new EventEmitter();

    private _panelOpen: boolean = false;
    private closingActionsSubscription: Subscription;
    private escapeEventStream = new Subject<void>();

    onChange: (value: any) => void = () => { };

    onTouched = () => { };

    constructor(private element: ElementRef,
                private ngZone: NgZone,
                private changeDetectorRef: ChangeDetectorRef,
                @Optional() @Inject(DOCUMENT) private document: any) { }

    ngOnDestroy() {
        this.escapeEventStream.unsubscribe();
        this.panelClosed.unsubscribe();
        this.panelOpened.unsubscribe();
    }

    get panelOpen(): boolean {
        return this._panelOpen && this.searchPanel.showPanel;
    }

    openPanel(): void {
        this.searchPanel.isOpen = this._panelOpen = true;
        this.closingActionsSubscription = this.subscribeToClosingActions();
        this.panelOpened.emit();
    }

    closePanel(): void {
        if (this._panelOpen) {
            this.closingActionsSubscription.unsubscribe();
            this._panelOpen = false;
            this.searchPanel.resetResults();
            this.searchPanel.hidePanel();
            this.changeDetectorRef.detectChanges();
        }
    }

    get panelClosingActions(): Observable<any> {
        return merge(
            this.escapeEventStream,
            this.outsideClickStream
        );
    }

    private get outsideClickStream(): Observable<any> {
        if (!this.document) {
            return Observable.of(null);
        }

        return merge(
            fromEvent(this.document, 'click'),
            fromEvent(this.document, 'touchend')
        ).filter((event: MouseEvent | TouchEvent) => {
            const clickTarget = event.target as HTMLElement;
            return this._panelOpen &&
                clickTarget !== this.element.nativeElement;
        });
    }

    writeValue(value: any): void {
        Promise.resolve(null).then(() => this.setTriggerValue(value));
    }

    registerOnChange(fn: (value: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => {}) {
        this.onTouched = fn;
    }

    handleKeydown(event: KeyboardEvent): void {
        const keyCode = event.keyCode;

        if (keyCode === ESCAPE && this.panelOpen) {
            this.escapeEventStream.next();
            event.stopPropagation();
        } else if (keyCode === ENTER) {
            this.enterKeyPressed.next(event);
            this.escapeEventStream.next();
            event.preventDefault();
        }else {
            let isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
            if ( isArrowKey ) {
                if ( !this.panelOpen ) {
                    this.openPanel();
                }
            }
        }
    }

    handleInput(event: KeyboardEvent): void {
        if (document.activeElement === event.target) {
            let inputValue: string = (event.target as HTMLInputElement).value;
            this.onChange(inputValue);
            if (inputValue.length >= 3) {
                this.searchPanel.keyPressedStream.next(inputValue);
                this.openPanel();
            } else {
                this.shortWordError.next();
                this.searchPanel.resetResults();
            }
        }
    }

    private isPanelOptionClicked(event: MouseEvent) {
        let isPanelOption: boolean = false;
        if ( event ) {
            let clickTarget = event.target as HTMLElement;
            isPanelOption = !this.isNoResultOption(event) &&
                            !!this.searchPanel.panel &&
                            !!this.searchPanel.panel.nativeElement.contains(clickTarget);
        }
        return isPanelOption;
    }

    private isNoResultOption(event: MouseEvent) {
        return this.searchPanel.results.list ? this.searchPanel.results.list.entries.length === 0 : true;
    }

    private subscribeToClosingActions(): Subscription {
        const firstStable = this.ngZone.onStable.asObservable();
        const optionChanges = this.searchPanel.keyPressedStream.asObservable();

        return merge(firstStable, optionChanges)
            .switchMap(() => {
                this.searchPanel.setVisibility();
                return this.panelClosingActions;
            })
            .first()
            .subscribe(event => this.setValueAndClose(event));
    }

    private setTriggerValue(value: any): void {
        const toDisplay = this.searchPanel && this.searchPanel.displayWith ?
            this.searchPanel.displayWith(value) : value;
        const inputValue = toDisplay != null ? toDisplay : '';
        this.element.nativeElement.value = inputValue;
    }

    private setValueAndClose(event: any | null): void {
        if (this.isPanelOptionClicked(event)) {
            this.setTriggerValue(event.target.textContent.trim());
            this.onChange(event.target.textContent.trim());
            this.element.nativeElement.focus();
        }
        this.closePanel();
        this.panelClosed.next(event);
    }
}
