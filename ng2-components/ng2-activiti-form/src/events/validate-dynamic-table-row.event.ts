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

import { DynamicTableRow } from '../components/widgets/dynamic-table/dynamic-table-row.model';
import { DynamicRowValidationSummary } from '../components/widgets/dynamic-table/dynamic-row-validation-summary.model';

import { FormFieldModel, FormModel } from './../components/widgets/core/index';
import { FormFieldEvent } from './form-field.event';

export class ValidateDynamicTableRowEvent extends FormFieldEvent {

    isValid = true;

    constructor(form: FormModel,
                field: FormFieldModel,
                public row: DynamicTableRow,
                public summary: DynamicRowValidationSummary) {
        super(form, field);
    }

}
