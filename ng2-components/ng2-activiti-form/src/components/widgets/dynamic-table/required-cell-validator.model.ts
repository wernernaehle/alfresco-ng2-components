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

import { DynamicTableColumn } from './dynamic-table-column.model';
import { CellValidator } from './cell-validator.model';
import { DynamicTableRow } from './dynamic-table-row.model';
import { DynamicRowValidationSummary } from './dynamic-row-validation-summary.model';

export class RequiredCellValidator implements CellValidator {

    private supportedTypes: string[] = [
        'String',
        'Number',
        'Amount',
        'Date',
        'Dropdown'
    ];

    isSupported(column: DynamicTableColumn): boolean {
        return column && column.required && this.supportedTypes.indexOf(column.type) > -1;
    }

    validate(row: DynamicTableRow, column: DynamicTableColumn, summary?: DynamicRowValidationSummary): boolean {
        if (this.isSupported(column)) {
            let value = row.value[column.id];
            if (column.required) {
                if (value === null || value === undefined || value === '') {
                    if (summary) {
                        summary.isValid = false;
                        summary.text = `Field '${column.name}' is required.`;
                    }
                    return false;
                }
            }
        }

        return true;
    }
}
