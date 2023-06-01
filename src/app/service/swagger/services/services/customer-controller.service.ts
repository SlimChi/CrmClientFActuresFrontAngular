/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpContext } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CustomerDto } from '../models/customer-dto';
import { InvoiceDto } from '../models/invoice-dto';

@Injectable({
  providedIn: 'root',
})
export class CustomerControllerService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation updateCustomer
   */
  static readonly UpdateCustomerPath = '/customers/{customerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateCustomer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCustomer$Response(params: {
    customerId: number;
    body: CustomerDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CustomerDto>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerControllerService.UpdateCustomerPath, 'put');
    if (params) {
      rb.path('customerId', params.customerId, {});
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomerDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateCustomer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateCustomer(params: {
    customerId: number;
    body: CustomerDto
  },
  context?: HttpContext

): Observable<CustomerDto> {

    return this.updateCustomer$Response(params,context).pipe(
      map((r: StrictHttpResponse<CustomerDto>) => r.body as CustomerDto)
    );
  }

  /**
   * Path part for operation deleteCustomer
   */
  static readonly DeleteCustomerPath = '/customers/{customerId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCustomer()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer$Response(params: {
    customerId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerControllerService.DeleteCustomerPath, 'delete');
    if (params) {
      rb.path('customerId', params.customerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCustomer$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCustomer(params: {
    customerId: number;
  },
  context?: HttpContext

): Observable<void> {

    return this.deleteCustomer$Response(params,context).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation getCustomers
   */
  static readonly GetCustomersPath = '/customers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCustomers()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomers$Response(params?: {
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<CustomerDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerControllerService.GetCustomersPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CustomerDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCustomers$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCustomers(params?: {
  },
  context?: HttpContext

): Observable<Array<CustomerDto>> {

    return this.getCustomers$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<CustomerDto>>) => r.body as Array<CustomerDto>)
    );
  }

  /**
   * Path part for operation createCustomer
   */
  static readonly CreateCustomerPath = '/customers';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createCustomer()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCustomer$Response(params: {
    body: CustomerDto
  },
  context?: HttpContext

): Observable<StrictHttpResponse<CustomerDto>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerControllerService.CreateCustomerPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CustomerDto>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createCustomer$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createCustomer(params: {
    body: CustomerDto
  },
  context?: HttpContext

): Observable<CustomerDto> {

    return this.createCustomer$Response(params,context).pipe(
      map((r: StrictHttpResponse<CustomerDto>) => r.body as CustomerDto)
    );
  }

  /**
   * Path part for operation getUserInvoices
   */
  static readonly GetUserInvoicesPath = '/customers/{customerId}/invoices';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getUserInvoices()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInvoices$Response(params: {
    customerId: number;
  },
  context?: HttpContext

): Observable<StrictHttpResponse<Array<InvoiceDto>>> {

    const rb = new RequestBuilder(this.rootUrl, CustomerControllerService.GetUserInvoicesPath, 'get');
    if (params) {
      rb.path('customerId', params.customerId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json',
      context: context
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<InvoiceDto>>;
      })
    );
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getUserInvoices$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getUserInvoices(params: {
    customerId: number;
  },
  context?: HttpContext

): Observable<Array<InvoiceDto>> {

    return this.getUserInvoices$Response(params,context).pipe(
      map((r: StrictHttpResponse<Array<InvoiceDto>>) => r.body as Array<InvoiceDto>)
    );
  }

}
