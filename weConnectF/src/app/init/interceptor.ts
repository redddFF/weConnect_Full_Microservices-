import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp0iFC5Ijmx22AullJ99/Lk+Q34dmTWnqqDTmg3pcTEuvCeN6HV7kJ7Y1Tjh0j8qzFSoptmesfZ+2W2VvARLNSyCOIB+JhWwmAVsuuvM04EyMwAlxursaJRW88Z2EFa/29GyQfKkBPMDD4RYerLQmNrrl9sI+x4nexGoJQbp+T1j7tZZG2LTBGr/rVSwGdW0kV2oM4r3ZA+GuSd7G7qyMXZwY/yKpi3wZ0H0jAPHDBYRLRgY0Fx31pE3EzfVdp87MRaEXoaVKpaKYGR5XYTKjNWvJNRIRYbfF7nneO2Am/IP+kNgjMMLzxJpCP1OWiOUius7AFo2+e0B0Y+if+N0AUQIDAQAB`
          }
        });
      
        return next.handle(request);
      }

  }
