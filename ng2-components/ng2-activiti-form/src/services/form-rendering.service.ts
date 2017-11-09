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

import { Injectable, Type } from '@angular/core';
import { DynamicComponentMapper, DynamicComponentResolveFunction, DynamicComponentResolver } from 'ng2-alfresco-core';

import {
    AmountWidgetComponent,
    AttachWidgetComponent,
    CheckboxWidgetComponent,
    ContainerWidgetComponent,
    DateWidgetComponent,
    DisplayTextWidgetComponentComponent,
    DocumentWidgetComponent,
    DropdownWidgetComponent,
    DynamicTableWidgetComponent,
    FormFieldModel,
    FunctionalGroupWidgetComponent,
    HyperlinkWidgetComponent,
    MultilineTextWidgetComponentComponent,
    NumberWidgetComponent,
    PeopleWidgetComponent,
    RadioButtonsWidgetComponent,
    TextWidgetComponent,
    TypeaheadWidgetComponent,
    UnknownWidgetComponent,
    UploadWidgetComponent
} from './../components/widgets/index';

@Injectable()
export class FormRenderingService extends DynamicComponentMapper {

    protected defaultValue: Type<{}> = UnknownWidgetComponent;
    protected types: { [key: string]: DynamicComponentResolveFunction } = {
        'text': DynamicComponentResolver.fromType(TextWidgetComponent),
        'string': DynamicComponentResolver.fromType(TextWidgetComponent),
        'integer': DynamicComponentResolver.fromType(NumberWidgetComponent),
        'multi-line-text': DynamicComponentResolver.fromType(MultilineTextWidgetComponentComponent),
        'boolean': DynamicComponentResolver.fromType(CheckboxWidgetComponent),
        'dropdown': DynamicComponentResolver.fromType(DropdownWidgetComponent),
        'date': DynamicComponentResolver.fromType(DateWidgetComponent),
        'amount': DynamicComponentResolver.fromType(AmountWidgetComponent),
        'radio-buttons': DynamicComponentResolver.fromType(RadioButtonsWidgetComponent),
        'hyperlink': DynamicComponentResolver.fromType(HyperlinkWidgetComponent),
        'readonly-text': DynamicComponentResolver.fromType(DisplayTextWidgetComponentComponent),
        'typeahead': DynamicComponentResolver.fromType(TypeaheadWidgetComponent),
        'people': DynamicComponentResolver.fromType(PeopleWidgetComponent),
        'functional-group': DynamicComponentResolver.fromType(FunctionalGroupWidgetComponent),
        'dynamic-table': DynamicComponentResolver.fromType(DynamicTableWidgetComponent),
        'container': DynamicComponentResolver.fromType(ContainerWidgetComponent),
        'group': DynamicComponentResolver.fromType(ContainerWidgetComponent),
        'document': DynamicComponentResolver.fromType(DocumentWidgetComponent)
    };

    constructor() {
        super();

        this.types['upload'] = (field: FormFieldModel): Type<{}> => {
            if (field) {
                let params = field.params;
                if (params && params.link) {
                    return AttachWidgetComponent;
                }
                return UploadWidgetComponent;
            }
            return UnknownWidgetComponent;
        };
    }
}
