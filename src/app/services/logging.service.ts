import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  
  private elasticsearchUrl = 'http://localhost:9200';

  constructor(private http: HttpClient) { }

  // Fetch logs from Elasticsearch
  getLogs(size: number = 100): Observable<any> {
    const query = {
      "query": { "match_all": {} },
      "size": size,
      "sort": [{ "timestamp": { "order": "desc" }}]
    };

    return this.http.post(`${this.elasticsearchUrl}/logs/_search`, query);
  }

  // Method to search in Elasticsearch index
  searchIndex(index: string, query: any): Observable<any> {
    const url = `${this.elasticsearchUrl}/${index}/_search`;
    return this.http.post(url, query);
  }

  // Method to get the status of Elasticsearch cluster
  getClusterHealth(): Observable<any> {
    const url = `${this.elasticsearchUrl}/_cluster/health`;
    return this.http.get(url);
  }
  // Optionally, add methods for filtered queries (e.g., by user or error type)

}
