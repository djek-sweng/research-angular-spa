import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitialisationService {
  constructor(private readonly httpClient: HttpClient) {}

  public initDatabase$(): Observable<null> {
    return this.httpClient.post<null>(
      'https://localhost:7065/api/init/database',
      null
    );
  }
}
