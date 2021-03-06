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

import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { AlfrescoAuthenticationService, AlfrescoSettingsService, LogService } from 'ng2-alfresco-core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class DiagramsService {

    constructor(private authService: AlfrescoAuthenticationService,
                private http: Http,
                private settingsService: AlfrescoSettingsService,
                private logService: LogService) {
    }

    getProcessDefinitionModel(processDefinitionId: string): Observable<any> {
        let url = `${this.settingsService.bpmHost}/activiti-app/app/rest/process-definitions/${processDefinitionId}/model-json`;
        let options = this.getRequestOptions();
        return this.http
            .get(url, options)
            .map((res: any) => {
                let body = res.json();
                return body;
            }).catch(err => this.handleError(err));
    }

    getRunningProcessDefinitionModel(processInstanceId: string): Observable<any> {
        let url = `${this.settingsService.bpmHost}/activiti-app/app/rest/process-instances/${processInstanceId}/model-json`;
        let options = this.getRequestOptions();
        return this.http
            .get(url, options)
            .map((res: any) => {
                let body = res.json();
                return body;
            }).catch(err => this.handleError(err));
    }

    public getHeaders(): Headers {
        return new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.authService.getTicketBpm()
        });
    }

    public getRequestOptions(param?: any): RequestOptions {
        let headers = this.getHeaders();
        return new RequestOptions({headers: headers, withCredentials: true, search: param});
    }

    private handleError(error: Response) {
        this.logService.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
