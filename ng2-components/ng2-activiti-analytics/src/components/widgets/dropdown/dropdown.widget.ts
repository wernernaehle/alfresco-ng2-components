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

 /* tslint:disable:component-selector  */

/* tslint:disable::no-access-missing-member */
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WidgetComponent } from './../widget.component';

@Component({
    selector: 'dropdown-widget',
    templateUrl: './dropdown.widget.html',
    styleUrls: ['./dropdown.widget.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DropdownWidgetComponent extends WidgetComponent implements OnInit {

    @Input()
    field: any;

    @Input()
    public formGroup: FormGroup;

    @Input()
    public controllerName: string;

    @Output()
    fieldChanged: EventEmitter<any> = new EventEmitter<any>();

    @Input()
    showDefaultOption: boolean = true;

    @Input()
    required: boolean = false;

    @Input()
    defaultOptionText: string = 'Choose One';

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.required) {
            this.formGroup.get(this.controllerName).setValidators(Validators.compose(this.buildValidatorList()));
        }
    }

    validateDropDown(controller: FormControl) {
        return controller.value !== 'null' ? null : { controllerName: false };
    }

    buildValidatorList() {
        let validatorList = [];
        validatorList.push(Validators.required);
        if (this.showDefaultOption) {
            validatorList.push(this.validateDropDown);
        }
        return validatorList;
    }
}
