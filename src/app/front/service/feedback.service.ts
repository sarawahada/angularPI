import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Feedback } from 'app/front/class/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private baseUrl ='http://localhost:8083/feedback';
  constructor(private http: HttpClient) { }
  addFeedBack(feedback:Feedback): Observable<any> {
      return this.http.post(`${this.baseUrl}/add`, feedback);
    }
    getAllFeedBack():Observable<Feedback[]> {
      return this.http.get<Feedback[]>(`${this.baseUrl}/all`);
    }
    deleteFeedback(id: number): Observable<void>{
      const url = `${this.baseUrl}/delete/${id}`;
      return this.http.delete<void>(url);
    }
    updateFeedback(feedback: Feedback) {
      return this.http.put(`${this.baseUrl}/update`, feedback);
    }
    generateFeedbackSummaryPdf(id_event: number): Observable<Blob> {
      const url = `${this.baseUrl}/events/${id_event}/feedback-summary-pdf`;
      const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'application/pdf' });
      return this.http.get(url, { headers, responseType: 'blob' }).pipe(
        map((response: Blob) => response)
      );
    }
    getSortedFeedbackByStars(): Observable<any> {
      return this.http.get<Feedback[]>(`${this.baseUrl}/sorted-by-stars`);
    }
}
