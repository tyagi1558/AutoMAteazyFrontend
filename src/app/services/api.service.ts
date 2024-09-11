import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://dev-cc.automateazy.com/api/v1';

  constructor(private http: HttpClient) {}

  /**
   * Login method to authenticate users.
   * Stores the token in localStorage upon successful authentication.
   */


   getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found in local storage.');
    }
  
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getAllLeads(params:any): Observable<any> {
    const headers = this.getAuthHeaders();  // Use the utility function to set headers
    const body = {
      "id": "",
      "name": params.searchByName,
      "priority": "",
      "lead_type": params.leadType,
      "isUntouched": 0,
      "source": "",
      "sdate": "",
      "edate": "",
      "uStartDate": "",
      "uEndDate": "",
      "activitySDate": "",
      "activityEndDate": "",
      "user_role": 1,
      "vc": 0,
      "page_no": params.pageNo,
      "limit": params.limit,
      "type": "",
      "leadStageCreator": "",
      "firstStageLeadAction": "",
      "secondStageLeadAction": "",
      "thirdStageLeadAction": "",
      "fourthStageLeadAction": "",
      "fifthStageLeadAction": "",
      "lastFirstStageLeadAction": "",
      "lastSecondStageLeadAction": "",
      "lastThirdStageLeadAction": "",
      "lastFouthStageLeadAction": "",
      "lastFifthStageLeadAction": "",
      "sub_stage": "",
      "allleadaction": "",
      "clgId": "",
      "sortKey": "lead_times_at",
      "sortOrder": "-1",
      "format": "search",
      "accessAllLeads": 1,
      "state": "",
      "city": "",
      "course": "",
      "stateName": "",
      "cityName": "",
      "courseName": "",
      "category": "",
      "noOfReEnquiry": "",
      "reEnquiryOperation": "",
      "noOfApplicationForm": "",
      "applicationFormOperation": "",
      "lead_score": "",
      "leadScoreOpreation": "",
      "lead_stage_count": "",
      "leadStageCountOpreation": "",
      "recentReEnquiredAtOperation": "",
      "lastReEnquiredAtOperation": "",
      "recentLeadStageAtOperation": "",
      "leadActivityAtOperation": "",
      "createdAtOperation": "",
      "updatedAtOperation": "",
      "leadAssignAtOperation": "",
      "reEnquiredClg": "",
      "lastReEnquiredClg": "",
      "reEnquiredClgSource": "",
      "reEnquiredsdate": "",
      "reEnquirededate": "",
      "reLastEnquiredsdate": "",
      "reLastEnquirededate": "",
      "utmSource": "",
      "utmCampaign": "",
      "utmMedium": "",
      "reEnquiredUtmSource": "",
      "reEnquiredUtmMedium": "",
      "reEnquiredUtmCampaign": "",
      "fw_sdate": "",
      "fw_edate": "",
      "n_id": "",
      "recentLeadStageStartDate": "",
      "recentLeadStageEndDate": "",
      "leadAssigneeStartDate": "",
      "leadAssigneeEndDate": "",
      "oldUserId": "",
      "reAssignedUserId": "",
      "activity_event": "",
      "publisher_tenant_id": "",
      "org_location_name": "",
      "sinceLeadOwnerChange": "",
      "createdAtAgeTimeGap": "",
      "ownerAssignmentAtAgeTimeGap": "",
      "stageCreatedAtAgeTimeGap": " ",
      "primary_source": "",
      "secondary_source": "",
      "tertiary_source": "",
      "last_source": ""
    };

    return this.http.post<any>(this.apiUrl+'/getLeads', body, { headers });
  }
  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/users/auth`, body).pipe(
      tap((response: any) => {
        if (response && response.success === false) {
          // Manually throw an error to be caught by catchError
          throw new Error(response.message);
        }
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Store token in localStorage
        }
      }),
      catchError(this.handleError)
    );
  }
  
  private handleError(error: any) {
    let errorMessage = '';
  
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side Error: ${error.error.message}`;
    } else if (error instanceof Error) {
      // Manually thrown error from the tap operator
      errorMessage = `Server Error: ${error.message}`;
    } else {
      // Server-side error (HTTP status codes, etc.)
      errorMessage = `Server Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  
    console.error(errorMessage); // Log the error message for debugging
    return throwError(errorMessage); // Return an observable with a user-facing error message
  }
  getPartnerColleges(): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/getPartnerColleges?allpartnerclgs=0`;
  
    return this.http.get<any>(url, { headers }).pipe(
      tap((response) => {
        if (!response.success) {
          // Throw an error if success is false
          throw new Error(response.message || 'Failed to fetch partner colleges.');
        }
        console.log('Partner Colleges fetched successfully:', response);
      }),
      catchError(this.handleError)
    );
  }
  
  /**
   * Fetch the list of all sources.
   */
  getAllSources(): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/getAllSources`;
  
    return this.http.get<any>(url, { headers }).pipe(
      tap(response => {
        console.log('Sources fetched successfully:', response);
      }),
      catchError(this.handleError)  // Consistent error handling for failed requests
    );
  }
  
  /**
   * Add a new lead.
   */
  addLead(leadData: any): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}/leadGenerate`;
  
    return this.http.post<any>(url, leadData, { headers }).pipe(
      tap((response) => {
        if (!response.success) {
          // Throw an error if success is false
          throw new Error(response.message || 'Failed to add lead.');
        }
        console.log('Lead added successfully:', response);
      }),
      catchError(this.handleError)
    );
  }
  
  
}
